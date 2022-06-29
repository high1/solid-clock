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
        <circle class="stroke-neutral-900 fill-none" r="99" />
        {Array.from({ length: 60 }, (_, index) => ({
          index,
          isHour: index % 5 === 0,
        })).map(({ index, isHour }) => (
          <Hand
            transform={() => `rotate(${(360 * index) / 60})`}
            class={isHour ? 'stroke-neutral-800' : 'stroke-neutral-400'}
            length={isHour ? 7 : 3}
            width={isHour ? 2 : 1}
            stationary
          />
        ))}
      </g>
      <g class="translate-100px">
        <Hand
          transform={subsecond}
          class="stroke-neutral-200 change-transform"
          length={83}
          width={5}
        />
        <Hand transform={hour} class="stroke-neutral-800" length={50} width={4} />
        <Hand transform={minute} class="stroke-neutral-800" length={70} width={3} />
        <Hand transform={second} class="stroke-red-500" length={77} width={2} />
      </g>
    </svg>
  );