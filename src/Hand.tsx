import { mergeProps, splitProps } from 'solid-js';
import type { Component, JSX } from 'solid-js';

type HandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
} & JSX.LineSVGAttributes<SVGLineElement>;

export const Hand: Component<HandProps> = (props) => {
  const mergedProps = mergeProps({ length: 0, limit: 94, class: '' }, props);
  const [local, rest] = splitProps(mergedProps, [
    'class',
    'length',
    'limit',
    'stationary',
  ]);

  return (
    <line
      // eslint-disable-next-line solid/reactivity
      {...(local.stationary && { y1: local.length - local.limit })}
      y2={-(local.stationary ? local.limit : local.length)}
      {...rest}
      class={`stroke-cap-round ${local.class}`}
    />
  );
};
