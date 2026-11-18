import type { JSX } from '@solidjs/web';

import { merge, omit } from 'solid-js';

export interface ClockLineProps extends Omit<
  JSX.LineSVGAttributes<SVGLineElement>,
  'stroke-linecap' | 'y1' | 'y2'
> {
  graduation?: true;
  length: number;
  limit?: number;
}

export const ClockLine = (props: ClockLineProps) => {
  const merged = merge({ length: 0, limit: 94 }, props);
  const rest = omit(merged, 'length', 'limit', 'graduation');

  return (
    <line
      {...rest}
      stroke-linecap="round"
      y1={merged.graduation && merged.length - merged.limit}
      y2={-(merged.graduation ? merged.limit : merged.length)}
    />
  );
};
