import { createSignal, Index, onCleanup, createEffect } from 'solid-js';
import type { Accessor, JSX } from 'solid-js';

const Lines = ({ numberOfLines, lineClass, lineLength, lineWidth} : { numberOfLines: number, lineClass: string, lineLength: number, lineWidth: number }) => (
  <Index each={Array.from({ length: numberOfLines }, (_, index) => index)}>
    {(index) => <Hand rotate={() => lineRotate(index(), numberOfLines)} handClass={lineClass} handLength={lineLength} handWidth={lineWidth} fixed />}
  </Index>
);

const Hand = ({ rotate, handClass, handLength, handWidth, fixed }: { rotate: Accessor<string>, handClass: string, handLength: number, handWidth: number, fixed?: boolean }) =>
  <line
    class={handClass}
    x1={100}
    y1={fixed ? 195 - handLength : 100}
    x2={100 - (fixed ? 0 : handLength)}
    y2={fixed ? 195: 100}
    stroke="currentColor"
    stroke-width={handWidth}
    stroke-linecap="round"
    transform={rotate()}
  />;

const miliseconds = (date: Date) => ((date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds()) * 1000 + date.getMilliseconds();
const subsecond = (date: Date) => ((miliseconds(date) / 1000)) * 360;
const second = (date: Date) => ((miliseconds(date) / 1000) % 60) * 360 / 60;
const minute = (date: Date) => ((miliseconds(date) / 1000 / 60) % 60) * 360 / 60;
const hour = (date: Date) => ((miliseconds(date) / 1000 / 60 / 60) % 12) * 360 / 12;
const rotate = (number: number) => `rotate(${Math.round((number + 90) * 10) / 10} 100 100)`;
const lineRotate = (index: number, length: number) => `rotate(${(360 * index) / length} 100 100)`;

const ClockFace = ({ date }): JSX.Element => (
  <svg viewBox="0 0 200 200" width="82">
    {/* static */}
    <circle class="text-neutral-900" cx="100" cy="100" r="98" fill="none" stroke="currentColor" />
    <Lines numberOfLines={60} lineClass="text-cyan-500" lineLength={5} lineWidth={1} />
    <Lines numberOfLines={12} lineClass="text-emerald-500" lineLength={15} lineWidth={2} />
    {/* dynamic */}
    <Hand rotate={() => rotate(subsecond(date()))} handClass="text-neutral-300" handLength={90} handWidth={8} />
    <Hand rotate={() => rotate(hour(date()))} handClass="text-neutral-700" handLength={50} handWidth={4} />
    <Hand rotate={() => rotate(minute(date()))} handClass="text-neutral-500" handLength={70} handWidth={3} />
    <Hand rotate={() => rotate(second(date()))} handClass="text-red-500" handLength={90} handWidth={2} />
  </svg>
);

export const Clock = (): JSX.Element => {
  const [date, setDate] = createSignal<Date>(new Date);
  createEffect(() => {
    const interval = setInterval(() => setDate(new Date), 40);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="flex flex-wrap items-center justify-center h-full">
      <Index each={Array.from({ length: 207 })}>
        {() => <ClockFace date={date} />}
      </Index>
    </div>
  )
};

