import { ClockLine as Graduation } from '@/ClockLine';
import { rotate, seconds } from '@/common';

// For not used because Graduations are static - minor optimization
export const Graduations = () =>
  [...Array(seconds).keys()]
    .map<[boolean, number]>((index) => [index % 5 === 0, index])
    .map(([isHour, index]) => (
      <Graduation
        class={
          isHour
            ? 'stroke-zinc-600 stroke-2 dark:stroke-zinc-200'
            : 'stroke-zinc-200 dark:stroke-zinc-600'
        }
        graduation
        length={isHour ? 6 : 2.5}
        transform={rotate(index / seconds, 0)}
      />
    ));
