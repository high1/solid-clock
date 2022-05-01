import type { Accessor, Component } from 'solid-js';

type HandProps = { rotate: Accessor<string>, handClass: string, handLength: number, handWidth: number, fixed?: boolean };

export const Hand: Component<HandProps> = ({ rotate, handClass, handLength, handWidth, fixed }) => (
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
  />
);
