import type { Accessor, Component, JSX } from 'solid-js';

type HandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
  transform: Accessor<string>;
  width: number;
} & Omit<JSX.LineSVGAttributes<SVGLineElement>, 'transform'>;

export const Hand: Component<HandProps> = ({
  length,
  limit = 94,
  stationary,
  transform,
  width,
  ...rest
}) => (
  <line
    {...(stationary && { y1: length - limit })}
    y2={-(stationary ? limit : length)}
    stroke="currentColor"
    stroke-width={width}
    stroke-linecap="round"
    transform={transform()}
    {...rest}
  />
);
