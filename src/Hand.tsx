import { unwrap } from 'utils/createScheduler';
import type { Component, JSX } from 'solid-js';
import type { MaybeAccessor } from 'utils/createScheduler';

type HandProps = {
  rotate: MaybeAccessor<string>;
  length: number;
  width: number;
  fixed?: boolean;
  limit?: number;
} & JSX.SvgSVGAttributes<SVGLineElement>;

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
