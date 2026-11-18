import { createEffect, createMemo, createSignal, untrack } from 'solid-js';

import { hourFraction, minuteFraction } from '#src/common';
import { type createTime, now, zonedParts } from '#src/time';

export const ANIMATION_DURATION = 500;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Animates hour/minute fractions toward their targets when the zone changes.
 * Both hands rotate in the direction of the zone change: forward when the new
 * zone is ahead, backward otherwise. The animation is derived from the shared
 * rAF clock (`now()`); there is no separate animation loop. Returns the
 * displayed fractions.
 */
export function createClockAnimation(
  time: ReturnType<typeof createTime>,
  duration = ANIMATION_DURATION,
) {
  const [hourDelta, setHourDelta] = createSignal(0);
  const [minuteDelta, setMinuteDelta] = createSignal(0);
  const [animationStart, setAnimationStart] = createSignal<number>();
  let previousZone: string | undefined;

  createEffect(
    () => time.zone(), // tracked — re-runs when the zone changes
    (zone) => {
      if (
        prefersReducedMotion() ||
        previousZone === undefined ||
        previousZone === zone
      ) {
        previousZone = zone;
        return;
      }

      const nowValue = untrack(() => now());
      const oldParts = zonedParts(nowValue, previousZone);
      const newParts = zonedParts(nowValue, zone);
      const forward = newParts.offset >= oldParts.offset;

      setHourDelta(
        directionalDelta(
          hourFraction(oldParts.wallSeconds),
          hourFraction(newParts.wallSeconds),
          forward,
        ),
      );
      setMinuteDelta(
        directionalDelta(
          minuteFraction(oldParts.wallSeconds),
          minuteFraction(newParts.wallSeconds),
          forward,
        ),
      );
      setAnimationStart(nowValue);
      previousZone = zone;
    },
  );

  // When no animation is running, don't read now() at all.
  const progress = createMemo(() => {
    const start = animationStart();

    return start === undefined ? 1 : Math.min((now() - start) / duration, 1);
  });
  const eased = createMemo(() => {
    const easedProgress = progress();

    return easedProgress < 1 ? 1 - (1 - easedProgress) ** 3 : easedProgress; // easeOutCubic
  });

  // Pin animationStart to undefined once the animation completes so we
  // stop reading now() and stop re-deriving per frame.
  createEffect(
    () => animationStart() !== undefined && progress() === 1,
    (done) => {
      if (done) setAnimationStart(undefined);
    },
  );

  return {
    get hour() {
      const ease = eased();

      return ease === 1
        ? time.hour
        : (time.hour - hourDelta() * (1 - ease) + 1) % 1;
    },
    get minute() {
      const ease = eased();

      return ease === 1
        ? time.minute
        : (time.minute - minuteDelta() * (1 - ease) + 1) % 1;
    },
    get second() {
      return time.second;
    },
    get subsecond() {
      return time.subsecond;
    },
  };
}

/** Decimal precision for animation deltas — float noise below this is zero. */
const DECIMAL_PRECISION = 4;

/**
 * Signed angular delta in a chosen direction (full turn = 1).
 * Forward may exceed half a turn (e.g. +8h → +0.66 turn of the hour hand);
 * backward is the equivalent negative.
 */
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
