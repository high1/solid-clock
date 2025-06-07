import { ClockHands } from 'ClockHands';
import { getTestId } from 'utilities';
import { Graduations } from 'Graduations';

export const ClockFace = () => (
  <div
    class="grid h-screen place-content-center dark:bg-zinc-800"
    data-testid={getTestId('clock-face')}
  >
    <svg viewBox="0 0 200 200" class="h-[95vmin]">
      <image class="size-1/6 translate-5/12" href="logo.svg" />
      <g class="translate-1/2">
        <circle class="fill-none stroke-zinc-600 dark:stroke-zinc-200" r="98" />
        <Graduations />
      </g>
      <g class="translate-1/2">
        <ClockHands />
      </g>
    </svg>
  </div>
);
