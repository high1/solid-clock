import { createSignal, JSX, onCleanup } from 'solid-js';
import { Hand } from 'Hand';
import { Lines } from 'Lines';
import { createAnimationLoop } from 'utils/createAnimationLoop';
import type { Accessor} from 'solid-js';

const getSecondsSinceMidnight = (): number => (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;
const subsecond = (time: number) =>  time % 1;
const second = (time: number) => time % 60 / 60;
const minute = (time: number) => time / 60 % 60 / 60;
const hour = (time: number) => time / 60 / 60 % 12 / 12;
const rotate = (rotate: number, fixed: number = 1) => `rotate(${(rotate * 360).toFixed(fixed)} 100 100)`;

type ClockFaceProps = {
  hour: Accessor<string>;
  minute: Accessor<string>;
  second: Accessor<string>;
  subsecond: Accessor<string>;
}

export const ClockFace = ({ hour, minute, second, subsecond }: ClockFaceProps): JSX.Element => (
  <svg viewBox="0 0 200 200" width="600">
    {/* static */}
    <circle class="text-neutral-900" cx="100" cy="100" r="99" fill="none" stroke="currentColor"/>
    <Lines numberOfLines={60} class='text-neutral-400' length={2} width={1} />
    <Lines numberOfLines={12} class='text-neutral-800' length={5} width={2} />
    {/* dynamic */}
    <Hand rotate={subsecond} class="text-neutral-200" length={85} width={5} />
    <Hand rotate={hour} class="text-neutral-800" length={50} width={4} />
    <Hand rotate={minute} class="text-neutral-800" length={70} width={3} />
    <Hand rotate={second} class="text-red-500" length={80} width={2} />
    {/* <Hand rotate={() => rotate(0)} class="text-red-500" length={80} width={2} /> */}
  </svg>
);

export const Clock = (): JSX.Element => {
  const [time, setTime] = createSignal<number>(getSecondsSinceMidnight());
  const dispose = createAnimationLoop(() => setTime(getSecondsSinceMidnight()));
  onCleanup(dispose);

  return (
    <div class="flex flex-wrap items-center justify-center h-full">
      {Array.from({ length: 1 }).map(() => (
        <ClockFace
          hour={() => rotate(hour(time()))}
          minute={() => rotate(minute(time()))}
          second={() => rotate(second(time()))}
          subsecond={() => rotate(subsecond(time()))}
        />
      ))}
    </div>
  )
};

