// ported from voby https://github.com/vobyjs/voby/blob/master/src/hooks/use_scheduler.ts
import { Accessor } from 'solid-js';

type FN<Arguments extends unknown[], Return extends unknown = void> = (...args: Arguments) => Return;
export type MaybeAccessor<T = unknown> = Accessor<T> | T;
const isFunction = (value: unknown): value is () => unknown => typeof value === 'function';
export const unwrap = <T = unknown>(maybeValue: MaybeAccessor<T>): T => (isFunction(maybeValue) ? maybeValue() : maybeValue);

export const createScheduler = <T, U>({
  loop,
  callback,
  cancel,
  schedule,
}: {
  loop?: MaybeAccessor<boolean>;
  callback: MaybeAccessor<FN<[U]>>;
  cancel: FN<[T]>;
  schedule: (callback: FN<[U]>) => T;
}): (() => void) => {
  let tickId: T;
  const work = (): void => {
    if (unwrap(loop)) tick();
    unwrap(callback);
  };

  const tick = (): void => {
    tickId = schedule(work);
  };

  const dispose = (): void => {
    cancel(tickId);
  };

  tick();
  return dispose;
};
