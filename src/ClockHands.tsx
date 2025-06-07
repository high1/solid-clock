import { createSignal, onCleanup } from 'solid-js';
import { ClockLine as ClockHand } from 'ClockLine';
import { base, rotate } from 'common';
import { getTestId } from 'utilities';

export const ClockHands = () => {
  const getSecondsSinceMidnight = (): number =>
    (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;
  const [time, setTime] = createSignal(getSecondsSinceMidnight());

  const subsecond = () => rotate(time() % 1, 0);
  const second = () => rotate((time() % base) / base);
  const minute = () => rotate(((time() / base) % base) / base);
  const hour = () => rotate(((time() / base ** 2) % 12) / 12);

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
