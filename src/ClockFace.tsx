import { createSignal, onCleanup, onMount } from 'solid-js';

import { ClockHands } from '#src/ClockHands';
import { clockFaceId } from '#src/common';
import { Graduations } from '#src/Graduations';
import { ThemeToggle } from '#src/ThemeToggle';
import { getTimeZone, getTimeZones, startClock } from '#src/time';
import { TimezonePicker } from '#src/TimezonePicker';
import { getTestId } from '#src/utilities';

export const ClockFace = () => {
  const owner = Symbol();

  onMount(() => {
    onCleanup(startClock(owner));
  });

  const [currentZone, setCurrentZone] = createSignal(getTimeZone());
  const zones = getTimeZones();

  return (
    <div
      class="flex flex-col items-center gap-2 px-2 pbs-2 block-dvh dark:bg-zinc-800"
      data-testid={getTestId(clockFaceId)}
    >
      <TimezonePicker
        class="inline-full max-inline-80"
        id="clock-timezone"
        onchange={setCurrentZone}
        value={currentZone()}
        zones={zones}
      />
      <ThemeToggle />
      <svg
        aria-labelledby="clock-title"
        class="grow block-full inline-full"
        role="img"
        viewBox="0 0 200 200"
      >
        <title id="clock-title">Clock</title>
        <image class="translate-5/12 block-1/6 inline-1/6" href="logo.svg" />
        <g class="translate-1/2">
          <circle
            class="fill-none stroke-zinc-600 dark:stroke-zinc-200"
            r="98"
          />
          <Graduations />
        </g>
        <g class="translate-1/2">
          <ClockHands zone={currentZone()} />
        </g>
      </svg>
    </div>
  );
};
