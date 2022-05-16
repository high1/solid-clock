import { createSignal, onCleanup } from 'solid-js';
import { Hand } from 'Hand';
import { createAnimationLoop } from 'utils/createAnimationLoop';
import type { Accessor, Component } from 'solid-js';

const getSecondsSinceMidnight = (): number => (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

type ClockFaceProps = {
  hour: Accessor<string>;
  minute: Accessor<string>;
  second: Accessor<string>;
  subsecond: Accessor<string>;
};

export const ClockFace: Component<ClockFaceProps> = ({ hour, minute, second, subsecond }) => (
  <svg viewBox="0 0 200 200" class="h-[95vmin]">
    {/* static */}
    <g transform="translate(100, 100)">
      <circle class="text-neutral-900 stroke-current fill-none" r="99" />
      {Array.from({ length: 60 }, (_, index) => [index, index % 5]).map(([index, isNotDivisibleByFive]) => (
        <Hand
          rotate={`rotate(${(360 * index) / 60})`}
          class={isNotDivisibleByFive ? 'text-neutral-400' : 'text-neutral-800'}
          length={isNotDivisibleByFive ? 3 : 7}
          width={isNotDivisibleByFive ? 1 : 2}
          fixed
        />
      ))}
    </g>
    {/* dynamic */}
    <g transform="translate(100, 100)">
      <Hand rotate={subsecond} class="text-neutral-200 change-transform" length={83} width={5} />
      <Hand rotate={hour} class="text-neutral-800" length={50} width={4} />
      <Hand rotate={minute} class="text-neutral-800" length={70} width={3} />
      <Hand rotate={second} class="text-red-500" length={77} width={2} />
    </g>
  </svg>
);

export const Clock: Component = () => {
  const [time, setTime] = createSignal(getSecondsSinceMidnight());
  const dispose = createAnimationLoop(() => setTime(getSecondsSinceMidnight()));
  onCleanup(dispose);

  const rotate = (rotate: number, fixed: number = 1) => `rotate(${(rotate * 360).toFixed(fixed)})`;
  const subsecond = () => rotate(time() % 1, 0);
  const second = () => rotate((time() % 60) / 60);
  const minute = () => rotate(((time() / 60) % 60) / 60);
  const hour = () => rotate(((time() / 60 / 60) % 12) / 12);

  return (
    <div class="flex flex-wrap items-center justify-center h-full">
      <ClockFace hour={hour} minute={minute} second={second} subsecond={subsecond} />
    </div>
  );
};
