import type { Accessor, Component } from 'solid-js';

type HandProps = {
  rotate: Accessor<string>;
  class: string;
  length: number;
  width: number;
  fixed?: boolean;
  limit?: number;
};

export const Hand: Component<HandProps> = ({ rotate, length, width, fixed, limit = 94, ...rest }) => (
  <line
    {...(fixed && { y1: length - limit })}
    y2={-(fixed ? limit : length)}
    stroke="currentColor"
    stroke-width={width}
    stroke-linecap="round"
    transform={rotate()}
    {...rest}
  />
);
