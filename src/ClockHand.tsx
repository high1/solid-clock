import { mergeProps, splitProps, type JSX } from 'solid-js';

type HandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
} & JSX.LineSVGAttributes<SVGLineElement>;

export const Hand = (props: HandProps) => {
  const props_ = mergeProps({ length: 0, limit: 94, class: '' }, props);
  const [local, rest] = splitProps(props_, [
    'class',
    'length',
    'limit',
    'stationary',
  ]);

  return (
    <line
      class={`stroke-cap-round ${local.class}`}
      y1={local.stationary ? local.length - local.limit : undefined}
      y2={-(local.stationary ? local.limit : local.length)}
      {...rest}
    />
  );
};
