import { mergeProps, splitProps } from 'solid-js';
import type { Component, JSX } from 'solid-js';

type HandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
} & JSX.LineSVGAttributes<SVGLineElement>;

export const Hand: Component<HandProps> = (props) => {
  const [local, rest] = splitProps(
    mergeProps({ length: 0, limit: 94 }, props),
    ['class', 'length', 'limit', 'stationary']
  );
  return (
    <line
      {...(local.stationary && { y1: local.length - local.limit })}
      y2={-(local.stationary ? local.limit : local.length)}
      {...rest}
      class={`stroke-cap-round ${local.class}`}
    />
  );
};
