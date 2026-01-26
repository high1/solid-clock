import { createMemo, createSignal, onCleanup } from 'solid-js';

import { ClockLine as ClockHand } from '@/ClockLine';
import { rotate, seconds } from '@/common';

const hours = seconds / 5;
const getSecondsSinceMidnight = () =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

const [time, setTime] = createSignal(getSecondsSinceMidnight());

let frame = requestAnimationFrame(function loop() {
  setTime(getSecondsSinceMidnight());
  frame = requestAnimationFrame(loop);
});

export const ClockHands = () => {
  const hour = createMemo(() =>
    rotate(((time() / seconds ** 2) % hours) / hours),
  );
  const minute = createMemo(() =>
    rotate(((time() / seconds) % seconds) / seconds),
  );
  const second = createMemo(() => rotate((time() % seconds) / seconds));
  const subsecond = createMemo(() => rotate(time() % 1, 0));

  onCleanup(() => {
    cancelAnimationFrame(frame);
  });

  return (
    <>
      <ClockHand
        class="stroke-zinc-200 stroke-3 dark:stroke-zinc-600"
        length={82}
        transform={subsecond()}
      />
      <ClockHand
        class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
        length={46}
        transform={hour()}
      />
      <ClockHand
        class="stroke-zinc-400 stroke-3"
        length={64}
        transform={minute()}
      />
      <ClockHand
        class="stroke-solid-light stroke-2 dark:stroke-solid"
        length={76}
        transform={second()}
      />
    </>
  );
};
