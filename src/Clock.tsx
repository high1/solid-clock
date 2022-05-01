import { createSignal, Index, onCleanup, createEffect } from 'solid-js';
import type { JSX } from 'solid-js';

const lines = (numberOfLines: number, lineClass: string, lineLength: number, lineWidth: number) => (
  <Index each={Array.from({ length: numberOfLines }, (_, index) => index)}>
    {(index) => hand(lineRotate(index(), numberOfLines), lineClass, lineLength, lineWidth, true)} 
  </Index>
);

const hand = (rotate: string, handClass: string, handLength: number, handWidth: number, fixed?: boolean) =>
  <line
    class={handClass}
    x1={100}
    y1={fixed ? 195 - handLength : 100}
    x2={100 - (fixed ? 0 : handLength)}
    y2={fixed ? 195: 100}
    stroke="currentColor"
    stroke-width={handWidth}
    stroke-linecap="round"
    transform={rotate}
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
    {lines(60, 'text-cyan-500', 5, 1 )}
    {lines(12, 'text-emerald-500', 15, 2)}
    {/* dynamic */}
    {hand(rotate(subsecond(date())), 'text-neutral-300', 90, 8)}
    {hand(rotate(hour(date())), 'text-neutral-700', 50, 4)}
    {hand(rotate(minute(date())), 'text-neutral-500', 70, 3)}
    {hand(rotate(second(date())), 'text-red-500', 90, 2)}
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
      <Index each={Array.from({ length: 276 })}>
        {() => <ClockFace date={date} />}
      </Index>
    </div>
  )
};

