import { type JSX, mergeProps, splitProps } from 'solid-js';

interface ClockLineProps extends JSX.LineSVGAttributes<SVGLineElement> {
  graduation?: true;
  length: number;
  limit?: number;
}

export const ClockLine = (props: ClockLineProps) => {
  const props_ = mergeProps({ length: 0, limit: 94 }, props);
  const [local, rest] = splitProps(props_, ['length', 'limit', 'graduation']);

  return (
    <line
      stroke-linecap="round"
      y1={local.graduation && local.length - local.limit}
      y2={-(local.graduation ? local.limit : local.length)}
      {...rest}
    />
  );
};
