import { createSignal, For, onCleanup } from 'solid-js';
import { ClockHand } from 'ClockHand';

const length = 60;

export const ClockFace = () => {
  const getSecondsSinceMidnight = (): number =>
    (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;
  const [time, setTime] = createSignal(getSecondsSinceMidnight());

  const rotate = (rotate: number, fractionDigits = 1) =>
    `rotate(${(rotate * 360).toFixed(fractionDigits)})`;
  const subsecond = () => rotate(time() % 1, 0);
  const second = () => rotate((time() % 60) / 60);
  const minute = () => rotate(((time() / 60) % 60) / 60);
  const hour = () => rotate(((time() / 60 / 60) % 12) / 12);

  let frame = requestAnimationFrame(function loop() {
    setTime(getSecondsSinceMidnight());
    frame = requestAnimationFrame(loop);
  });

  onCleanup(() => cancelAnimationFrame(frame));

  return (
    <div class="grid h-screen place-content-center @dark:bg-neutral-700">
      <svg viewBox="0 0 200 200" class="h-95vmin">
        <g class="translate-1/2">
          <circle
            class="fill-none stroke-neutral-600 @dark:stroke-neutral-200"
            r="98"
          />
          <For each={Array.from({ length }, (_, index) => index % 5 === 0)}>
            {(isHour, index) => (
              <ClockHand
                transform={rotate(index() / length, 0)}
                class={
                  isHour
                    ? 'stroke-neutral-600 stroke-2 @dark:stroke-neutral-200'
                    : 'stroke-neutral-200 @dark:stroke-neutral-600'
                }
                length={isHour ? 6 : 2.5}
                stationary
              />
            )}
          </For>
        </g>
        <g class="translate-1/2">
          <ClockHand
            transform={subsecond()}
            class="stroke-neutral-200 stroke-4 @dark:stroke-neutral-600"
            length={82}
          />
          <ClockHand
            transform={hour()}
            class="stroke-neutral-600 stroke-4 @dark:stroke-neutral-200"
            length={46}
          />
          <ClockHand
            transform={minute()}
            class="stroke-neutral-400 stroke-3"
            length={64}
          />
          <ClockHand
            transform={second()}
            class="stroke-#518ac8 stroke-2"
            length={76}
          />
        </g>
      </svg>
    </div>
  );
};
