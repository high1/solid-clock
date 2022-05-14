// ported to solid from voby https://github.com/vobyjs/voby/blob/master/src/hooks/use_animation_loop.ts
import { createScheduler } from 'utils/createScheduler';

export const createAnimationLoop = (callback: FrameRequestCallback) =>
  createScheduler({
    callback,
    loop: true,
    cancel: cancelAnimationFrame,
    schedule: requestAnimationFrame,
  });
