import type { Accessor, Component, JSX } from 'solid-js';

type HandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
  transform: Accessor<string>;
} & Omit<JSX.LineSVGAttributes<SVGLineElement>, 'transform'>;

export const Hand: Component<HandProps> = ({
  length,
  limit = 94,
  stationary,
  transform,
  ...rest
}) =>  (
  <line
    {...(stationary && { y1: length - limit })}
    y2={-(stationary ? limit : length)}
    transform={transform()}
    {...rest}
    class={`stroke-cap-round ${rest.class}`}
  />
);
