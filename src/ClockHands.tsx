import { onCleanup } from 'solid-js';

import { ClockLine as ClockHand } from '@/ClockLine';
import { time } from '@/time';
import { getTestId } from '@/utilities';

export const ClockHands = () => {
  let frame = requestAnimationFrame(function loop() {
    time.update();
    frame = requestAnimationFrame(loop);
  });

  onCleanup(() => {
    cancelAnimationFrame(frame);
  });

  return (
    <>
      <ClockHand
        class="stroke-zinc-200 stroke-3 dark:stroke-zinc-600"
        data-testid={getTestId('subsecond')}
        length={82}
        transform={time.milisecond}
      />
      <ClockHand
        class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
        length={46}
        transform={time.hour}
      />
      <ClockHand
        class="stroke-zinc-400 stroke-3"
        length={64}
        transform={time.minute}
      />
      <ClockHand
        class="stroke-solid-light stroke-2 dark:stroke-solid"
        length={76}
        transform={time.second}
      />
    </>
  );
};
