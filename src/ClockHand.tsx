import { mergeProps, splitProps, type JSX } from 'solid-js';

type ClockHandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
} & JSX.LineSVGAttributes<SVGLineElement>;

export const ClockHand = (props: ClockHandProps) => {
  const props_ = mergeProps({ length: 0, limit: 94, class: '' }, props);
  const [local, rest] = splitProps(props_, ['length', 'limit', 'stationary']);

  return (
    <line
      y1={local.stationary ? local.length - local.limit : undefined}
      y2={-(local.stationary ? local.limit : local.length)}
      stroke-linecap="round"
      {...rest}
    />
  );
};
