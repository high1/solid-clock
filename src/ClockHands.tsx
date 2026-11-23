import { createMemo } from 'solid-js';

import { createClockAnimation } from '#src/clock-animation';
import { ClockLine as ClockHand } from '#src/ClockLine';
import { clockHourId, clockMinuteId, clockSecondId, rotate } from '#src/common';
import { createTime } from '#src/time';
import { getTestId } from '#src/utilities';

export const ClockHands = (props: { zone: string }) => {
  const time = createClockAnimation(
    createTime(() => props.zone),
  );

  const subsecond = createMemo(() => rotate(time.subsecond, 0));
  const hour = createMemo(() => rotate(time.hour, 1));
  const minute = createMemo(() => rotate(time.minute, 1));
  const second = createMemo(() => rotate(time.second, 1));

  return (
    <>
      <ClockHand
        class="stroke-zinc-200 stroke-3 dark:stroke-zinc-600"
        data-testid={getTestId('clock-subsecond')}
        length={82}
        transform={subsecond()}
      />
      <ClockHand
        class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
        data-testid={getTestId(clockHourId)}
        length={46}
        transform={hour()}
      />
      <ClockHand
        class="stroke-zinc-400 stroke-3"
        data-testid={getTestId(clockMinuteId)}
        length={64}
        transform={minute()}
      />
      <ClockHand
        class="stroke-solid-light stroke-2 dark:stroke-solid"
        data-testid={getTestId(clockSecondId)}
        length={76}
        transform={second()}
      />
    </>
  );
};
