import { ClockHands } from '#src/ClockHands';
import { clockFaceId } from '#src/common';
import { Graduations } from '#src/Graduations';
import { getTestId } from '#src/utilities';

export const ClockFace = () => (
  <div
    class="grid place-content-center block-screen dark:bg-zinc-800"
    data-testid={getTestId(clockFaceId)}
  >
    <svg
      aria-labelledby="clock-title"
      class="block-[95vmin]"
      role="img"
      viewBox="0 0 200 200"
    >
      <title id="clock-title">Clock</title>
      <image class="translate-5/12 block-1/6 inline-1/6" href="logo.svg" />
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
