import { createEffect, createMemo, createSignal, untrack } from 'solid-js';

import { hourFraction, minuteFraction } from '#src/common';
import { type createTime, now, zonedParts } from '#src/time';

export const ANIMATION_DURATION = 500;

const prefersReducedMotion = () =>
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createClockAnimation(
  time: ReturnType<typeof createTime>,
  duration = ANIMATION_DURATION,
) {
  const [animationStart, setAnimationStart] = createSignal<number>();
  let hourDelta = 0;
  let minuteDelta = 0;
  let previousZone: string | undefined;

  createEffect(
    () => time.zone, // tracked — re-runs when the zone changes
    (zone) => {
      if (
        prefersReducedMotion()
        || previousZone === undefined
        || previousZone === zone
      ) {
        previousZone = zone;
        return;
      }

      const nowValue = untrack(() => now());
      const previousParts = zonedParts(nowValue, previousZone);
      const newParts = zonedParts(nowValue, zone);
      const forward = newParts.offset >= previousParts.offset;

      hourDelta = directionalDelta(
        hourFraction(previousParts.wallSeconds),
        hourFraction(newParts.wallSeconds),
        forward,
      );
      minuteDelta = directionalDelta(
        minuteFraction(previousParts.wallSeconds),
        minuteFraction(newParts.wallSeconds),
        forward,
      );
      setAnimationStart(nowValue);
      previousZone = zone;
    },
  );

  const progress = createMemo(() => {
    const start = animationStart();

    return start === undefined ? 1 : Math.min((now() - start) / duration, 1);
  });

  const eased = createMemo(() => {
    const easedProgress = progress();

    return easedProgress < 1 ? 1 - (1 - easedProgress) ** 3 : easedProgress; // easeOutCubic
  });

  // Clear the start once done so progress stops tracking now() every frame.
  createEffect(
    () => animationStart() !== undefined && progress() === 1,
    (done) => {
      if (done) setAnimationStart(undefined);
    },
  );

  const easedFraction = (part: number, delta: number) =>
    (part - delta * (1 - eased()) + 1) % 1;

  return {
    get hour() {
      return eased() === 1
        ? time.hour
        : easedFraction(time.hour, hourDelta);
    },
    get minute() {
      return eased() === 1
        ? time.minute
        : easedFraction(time.minute, minuteDelta);
    },
    get second() {
      return time.second;
    },
    get subsecond() {
      return time.subsecond;
    },
  };
}

const DECIMAL_PRECISION = 4;

/** Signed turn toward the new time in the chosen direction. */
export function directionalDelta(
  from: number,
  to: number,
  forward: boolean,
): number {
  const raw = Number((to - from).toFixed(DECIMAL_PRECISION));

  return raw
    ? forward
      ? raw < 0
        ? raw + 1
        : raw
      : raw >= 0
        ? raw - 1
        : raw
    : 0;
}
