import { createSignal, onCleanup } from 'solid-js';
import { ClockLine as ClockHand } from 'ClockLine';
import { hours, rotate, seconds } from 'common';
import { getTestId } from 'utilities';

const getSecondsSinceMidnight = (): number =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

export const ClockHands = () => {
  const [time, setTime] = createSignal(getSecondsSinceMidnight());

  const subsecond = () => rotate(time() % 1, 0);
  const second = () => rotate((time() % seconds) / seconds);
  const minute = () => rotate(((time() / seconds) % seconds) / seconds);
  const hour = () => rotate(((time() / seconds ** 2) % hours) / hours);

  let frame = requestAnimationFrame(function loop() {
    setTime(getSecondsSinceMidnight());
    frame = requestAnimationFrame(loop);
  });

  onCleanup(() => {
    cancelAnimationFrame(frame);
  });

  return (
    <>
      <ClockHand
        transform={subsecond()}
        class="stroke-zinc-200 stroke-3 dark:stroke-zinc-600"
        length={82}
        data-testid={getTestId('subsecond')}
      />
      <ClockHand
        transform={hour()}
        class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
        length={46}
      />
      <ClockHand
        transform={minute()}
        class="stroke-zinc-400 stroke-3"
        length={64}
      />
      <ClockHand
        transform={second()}
        class="stroke-solid-light dark:stroke-solid stroke-2"
        length={76}
      />
    </>
  );
};
