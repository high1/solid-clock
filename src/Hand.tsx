import type { Accessor, Component, JSX } from 'solid-js';

type HandProps = {
  transform: Accessor<string>;
  length: number;
  width: number;
  fixed?: boolean;
  limit?: number;
} & Omit<JSX.SvgSVGAttributes<SVGLineElement>, 'transform'>;

export const Hand: Component<HandProps> = ({
  transform,
  length,
  width,
  fixed,
  limit = 94,
  ...rest
}) => (
  <line
    {...(fixed && { y1: length - limit })}
    y2={-(fixed ? limit : length)}
    stroke="currentColor"
    stroke-width={width}
    stroke-linecap="round"
    transform={transform()}
    {...rest}
  />
);
