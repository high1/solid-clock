import { For } from 'solid-js';
import { ClockLine as Graduation } from 'ClockLine';
import { base, rotate } from 'common';

export const Graduations = () => (
  <>
    <For each={Array.from({ length: base }, (_, index) => index % 5 === 0)}>
      {(isHour, index) => (
        <Graduation
          transform={rotate(index() / base, 0)}
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
