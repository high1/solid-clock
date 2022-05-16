import { unwrap } from 'utils/createScheduler';
import type { Component } from 'solid-js';
import type { MaybeAccessor } from 'utils/createScheduler';

type HandProps = {
  rotate: MaybeAccessor<string>;
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
    transform={unwrap(rotate)}
    {...rest}
  />
);
