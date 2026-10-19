import { createSignal, onCleanup, onMount } from 'solid-js';

import { ClockLine as ClockHand } from '#src/ClockLine';
import {
  getSecondsSinceMidnight,
  hourTransform,
  minuteTransform,
  secondTransform,
  subsecondTransform,
} from '#src/time';

export const ClockHands = () => {
  const [clock, setClock] = createSignal(getSecondsSinceMidnight());

  onMount(() => {
    let frame = requestAnimationFrame(function loop() {
      setClock(getSecondsSinceMidnight());
      frame = requestAnimationFrame(loop);
    });
    onCleanup(() => {
      cancelAnimationFrame(frame);
    });
  });

  return (
    <>
      <ClockHand
        class="stroke-zinc-200 stroke-3 dark:stroke-zinc-200"
        length={82}
        transform={subsecondTransform(clock())}
      />
      <ClockHand
        class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
        length={46}
        transform={hourTransform(clock())}
      />
      <ClockHand
        class="stroke-zinc-400 stroke-3"
        length={64}
        transform={minuteTransform(clock())}
      />
      <ClockHand
        class="stroke-solid-light stroke-2 dark:stroke-solid"
        length={76}
        transform={secondTransform(clock())}
      />
    </>
  );
};
