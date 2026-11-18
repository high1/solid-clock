import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onSettled,
  Show,
  untrack,
} from 'solid-js';

import { getTimezoneGroups, zoneLabel } from '#src/timezone-options';
import { cn } from '#src/utilities';

interface Props {
  class?: string;
  id: string;
  onchange: (zone: string) => void;
  value: string;
  /** Unique IANA timezone identifiers. */
  zones: readonly string[];
}

export const TimezonePicker = (props: Props) => {
  const [open, setOpen] = createSignal(false);
  const [query, setQuery] = createSignal('');
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [placement, setPlacement] = createSignal<'above' | 'below'>('below');
  const [popup, setPopup] = createSignal<HTMLElement>();
  let openWidth = 0;

  // Solid fires the ref callbacks before the node is inserted into the document,
  // so measure and focus after insertion instead of in the ref itself.
  createEffect(
    () => popup(),
    (element) => {
      if (element) {
        placePopup(element);
        element.querySelector('input')?.focus({ preventScroll: true });
        scrollToActive(true);
      }
    },
  );

  let root: HTMLDivElement | undefined;
  let trigger: HTMLButtonElement;
  let listBox: HTMLDivElement;

  const listboxId = () => `${props.id}-listbox`;

  const groups = createMemo(() => getTimezoneGroups(props.zones, query()));

  const options = createMemo(() =>
    groups().flatMap(group => group.items.map(item => item.zone)));

  const activeOptionId = createMemo(() =>
    options()[activeIndex()] === undefined
      ? undefined
      : optionId(activeIndex()));

  function choose(zone: string) {
    props.onchange(zone);
    closePicker(true);
  }

  function closePicker(restoreFocus = false) {
    setOpen(false);

    if (restoreFocus) trigger.focus();
  }

  function getActiveOption() {
    const index = untrack(() => activeIndex());
    return (
      listBox.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?? undefined
    );
  }

  function handleDocumentPointerDown(event: PointerEvent) {
    if (
      open()
      && event.target instanceof Node
      && root
      && !root.contains(event.target)
    )
      closePicker();
  }

  function handleSearchInput(
    event: InputEvent & { currentTarget: HTMLInputElement },
  ) {
    setQuery(event.currentTarget.value);
    setActiveIndex(0);

    listBox.scrollTop = 0;
  }

  function handleSearchKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        moveTo(activeIndex() + (event.key === 'ArrowDown' ? 1 : -1));
        break;

      case 'End':
        event.preventDefault();
        moveTo(options().length - 1);
        break;

      case 'Enter': {
        // IMEs use Enter to confirm composition; don't commit a selection then.
        // Safari can fire compositionend before the Enter keydown, by which
        // point isComposing is already false; verify on a real IME before
        // relying on it.
        if (event.isComposing) break;

        event.preventDefault();

        const zone = options()[activeIndex()];

        if (zone !== undefined) choose(zone);

        break;
      }

      case 'Escape':
        event.preventDefault();
        closePicker(true);
        break;

      case 'Home':
        event.preventDefault();
        moveTo(0);
        break;

      case 'Tab':
        closePicker(true);
        break;
    }
  }

  function handleTriggerClick() {
    if (open()) closePicker();
    else openPicker();
  }

  function handleTriggerKeydown(event: KeyboardEvent) {
    if (!open() && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      openPicker();
    }
  }

  function moveTo(index: number) {
    // Upper bound first, so an empty list leaves the index at 0.
    setActiveIndex(Math.max(Math.min(index, options().length - 1), 0));

    scrollToActive();
  }

  function openPicker() {
    setQuery('');
    setActiveIndex(Math.max(options().indexOf(props.value), 0));
    openWidth = window.innerWidth;
    setOpen(true);
  }

  function optionId(index: number): string {
    return `${listboxId()}-option-${index}`;
  }

  function placePopup(node: HTMLElement) {
    const { bottom, top } = trigger.getBoundingClientRect();
    const { marginBottom, marginTop } = getComputedStyle(node);

    const roomAbove = top;
    const roomBelow = window.innerHeight - bottom;

    // Popup height plus its gap to the trigger. The margin sits on the top or
    // the bottom depending on the previous placement, so add both.
    const needed
      = node.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom);

    setPlacement(
      roomBelow < needed && roomAbove > roomBelow ? 'above' : 'below',
    );
  }

  function registerListbox(node: HTMLDivElement) {
    listBox = node;
  }

  function scrollToActive(center = false) {
    const option = getActiveOption();

    if (!option) return;

    // Option edges relative to the visible area of the list.
    const top
      = option.getBoundingClientRect().top - listBox.getBoundingClientRect().top;
    const bottom = top + option.offsetHeight - listBox.clientHeight;

    // Only the list scrolls. Center on open, otherwise move as little as needed.
    listBox.scrollTop += center
      ? top - (listBox.clientHeight - option.offsetHeight) / 2
      : Math.min(top, 0) + Math.max(bottom, 0);
  }

  onSettled(() => {
    const handleResize = () => {
      if (window.innerWidth !== openWidth) closePicker();
    };

    document.addEventListener('pointerdown', handleDocumentPointerDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div
      class={cn('relative', props.class)}
      onFocusOut={(event) => {
        const next = event.relatedTarget;

        if (next instanceof Node && root && !root.contains(next)) closePicker();
      }}
      ref={(el) => {
        root = el;
      }}
    >
      <button
        aria-controls={open() ? listboxId() : undefined}
        aria-expanded={open() ? 'true' : 'false'}
        aria-haspopup="listbox"
        class="flex cursor-pointer items-center justify-between gap-3 rounded-sm border border-zinc-300 px-3 py-2 text-start text-zinc-900 inline-full min-inline-0 dark:border-zinc-600 dark:text-zinc-100"
        id={props.id}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeydown}
        ref={(el) => {
          trigger = el;
        }}
        type="button"
      >
        <span class="truncate">{zoneLabel(props.value)}</span>
        <span aria-hidden="true">{open() ? '▴' : '▾'}</span>
      </button>

      <Show when={open()}>
        {/* When above, the order is reversed so the input stays next to the trigger
            while the list grows and shrinks (DOM order is unchanged). */}
        <div
          class={`absolute z-50 flex rounded-sm border border-zinc-300 bg-white text-zinc-900 shadow-lg inline-full dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 ${
            placement() === 'above'
              ? 'inset-be-full mbe-1 flex-col-reverse'
              : 'inset-bs-full mbs-1 flex-col'
          }`}
          ref={setPopup}
        >
          <input
            aria-activedescendant={activeOptionId()}
            aria-autocomplete="list"
            aria-controls={listboxId()}
            aria-expanded="true"
            aria-label="Search timezones"
            class={`border-zinc-200 px-3 py-2 outline-none inline-full placeholder:text-zinc-400 dark:border-zinc-600 ${
              placement() === 'above' ? 'border-bs' : 'border-be'
            }`}
            onInput={handleSearchInput}
            onKeyDown={handleSearchKeydown}
            placeholder="Search timezones…"
            role="combobox"
            type="text"
            value={/* v8 ignore start */ query() /* v8 ignore stop */}
          />

          <div
            aria-label="Timezones"
            class="overflow-y-auto overscroll-contain p-1 max-block-80"
            id={listboxId()}
            ref={(el) => {
              registerListbox(el);
            }}
            role="listbox"
          >
            <For each={groups()}>
              {group => (
                <div aria-label={group.region} role="group">
                  <div class="px-3 py-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {group.region}
                  </div>

                  <For each={group.items}>
                    {item => (
                      <button
                        aria-selected={
                          item.zone === props.value ? 'true' : 'false'
                        }
                        class={`flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-start text-sm inline-full ${
                          item.index === activeIndex()
                            ? 'bg-zinc-200 ring-2 ring-zinc-900/40 ring-inset dark:bg-zinc-700 dark:ring-zinc-100/40'
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-700'
                        }`}
                        data-index={item.index}
                        id={optionId(item.index)}
                        onClick={() => {
                          choose(item.zone);
                        }}
                        onPointerDown={(event) => {
                          event.preventDefault();
                        }}
                        role="option"
                        tabindex="-1"
                        type="button"
                      >
                        <span>{zoneLabel(item.zone)}</span>

                        <Show when={item.zone === props.value}>
                          <span aria-hidden="true">✓</span>
                        </Show>
                      </button>
                    )}
                  </For>
                </div>
              )}
            </For>
            <Show when={groups().length === 0}>
              <p class="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                No matching timezones
              </p>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
};
