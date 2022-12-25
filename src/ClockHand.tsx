import { mergeProps, splitProps, type JSX } from 'solid-js';

type ClockHandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
} & JSX.LineSVGAttributes<SVGLineElement>;

export const ClockHand = (props: ClockHandProps) => {
  const props_ = mergeProps({ length: 0, limit: 94 }, props);
  const [local, rest] = splitProps(props_, ['length', 'limit', 'stationary']);

  return (
    <line
      {...(local.stationary && { y1: local.length - local.limit })}
      y2={-(local.stationary ? local.limit : local.length)}
      stroke-linecap="round"
      {...rest}
    />
  );
};
