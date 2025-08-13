import { For } from 'solid-js';
import { ClockLine as Graduation } from 'ClockLine';
import { rotate, seconds } from 'common';

export const Graduations = () => (
  <>
    <For each={Array.from({ length: seconds }, (_, index) => index % 5 === 0)}>
      {(isHour, index) => (
        <Graduation
          transform={rotate(index() / seconds, 0)}
          class={
            isHour
              ? 'stroke-zinc-600 stroke-2 dark:stroke-zinc-200'
              : 'stroke-zinc-200 dark:stroke-zinc-600'
          }
          length={isHour ? 6 : 2.5}
          graduation
        />
      )}
    </For>
  </>
);
