import { Hand } from 'Hand';
import type { Accessor, Component } from 'solid-js';

type ClockFaceProps = {
  hour: Accessor<string>;
  minute: Accessor<string>;
  second: Accessor<string>;
  subsecond: Accessor<string>;
};

export const ClockFace: Component<ClockFaceProps> = ({
  hour,
  minute,
  second,
  subsecond,
}) => (
  <svg viewBox="0 0 200 200" class="h-95vmin">
    <g class="translate-100px">
      <circle
        class="stroke-neutral-900 @dark:stroke-neutral-100 fill-none"
        r="99"
      />
      {Array.from({ length: 60 }, (_, index) => ({
        isHour: index % 5 === 0,
      })).map(({ isHour }, index, { length }) => (
        <Hand
          transform={() => `rotate(${(360 * index) / length})`}
          class={
            isHour
              ? 'stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-2'
              : 'stroke-neutral-400 @dark:stroke-neutral-600'
          }
          length={isHour ? 7 : 3}
          stationary
        />
      ))}
    </g>
    <g class="translate-100px">
      <Hand
        transform={subsecond}
        class="stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5 change-transform"
        length={83}
      />
      <Hand
        transform={hour}
        class="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4"
        length={50}
      />
      <Hand
        transform={minute}
        class="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3"
        length={70}
      />
      <Hand
        transform={second}
        class="stroke-red-500 stroke-width-2"
        length={77}
      />
    </g>
  </svg>
);
