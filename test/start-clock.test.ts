import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { now, setNow, startClock } from '#src/time';

describe('startClock', () => {
  const cleanups = new Set<() => void>();

  const start = () => {
    const owner = Symbol();
    const stop = startClock(owner);
    cleanups.add(stop);
    return () => {
      cleanups.delete(stop);
      stop();
    };
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, 'requestAnimationFrame');
  });

  afterEach(() => {
    cleanups.forEach((stop) => {
      stop();
    });
    cleanups.clear();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('schedules one rAF loop for the first subscriber', () => {
    const stop = start();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      1,
    );

    const before = now();
    vi.advanceTimersToNextFrame();
    expect(now()).not.toBe(before);

    stop();
  });

  test('reuses the same loop for additional subscribers', () => {
    const stopFirst = start();
    const stopSecond = start();
    const stopThird = start();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      1,
    );

    stopFirst();
    stopSecond();
    stopThird();
  });

  test('stops updating the instant after unmount', () => {
    const stop = start();

    vi.advanceTimersToNextFrame();
    const afterRun = now();
    expect(afterRun).toBeGreaterThan(0);

    stop();
    vi.advanceTimersToNextFrame();

    expect(now()).toBe(afterRun);
  });

  test('keeps the loop running while any subscriber remains', () => {
    const stopFirst = start();
    const stopSecond = start();
    const stopThird = start();

    vi.advanceTimersToNextFrame();
    const before = now();
    expect(before).toBeGreaterThan(0);

    stopFirst();
    stopSecond();

    vi.advanceTimersToNextFrame();
    expect(now()).not.toBe(before);

    stopThird();
  });

  test('restarts the loop when a new subscriber mounts after unmount', () => {
    const stop = start();
    stop();

    start()();
    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      2,
    );
  });

  test('calling stop more than once does not prevent a later clock from starting', () => {
    const stop = start();
    stop();
    stop();

    const stopNext = start();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      2,
    );

    stopNext();
  });

  test('calling startClock twice with the same owner is idempotent', () => {
    const owner = Symbol();
    const stopFirst = startClock(owner);
    const stopSecond = startClock(owner);

    // Same owner → same cleanup, no duplicate subscriber.
    expect(stopFirst).toBe(stopSecond);
    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      1,
    );

    stopFirst();
    stopSecond();

    // After cleanup, a fresh call with the same owner restarts the loop.
    const stopNext = startClock(owner);
    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      2,
    );

    stopNext();
  });

  test('setNow updates the shared instance', () => {
    const before = now();
    setNow(before + 1_000);

    expect(now()).toBe(before + 1_000);
  });
});
