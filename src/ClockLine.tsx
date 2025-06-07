import { mergeProps, splitProps, type JSX } from 'solid-js';

type ClockLineProps = JSX.LineSVGAttributes<SVGLineElement> & {
  length: number;
  limit?: number;
  graduation?: boolean;
};

export const ClockLine = (props: ClockLineProps) => {
  const props_ = mergeProps({ length: 0, limit: 94 }, props);
  const [local, rest] = splitProps(props_, ['length', 'limit', 'graduation']);

  return (
    <line
      {...(local.graduation && { y1: local.length - local.limit })}
      y2={-(local.graduation ? local.limit : local.length)}
      stroke-linecap="round"
      {...rest}
    />
  );
};
