import { flush } from 'solid-js';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { render } from '#src/testing/render';
import { TimezonePicker } from '#src/TimezonePicker';

const zones = [
  'Africa/Abidjan',
  'America/New_York',
  'Asia/Tokyo',
  'Europe/Berlin',
  'UTC',
];

const hasListbox = () => document.querySelector('[role="listbox"]') !== null;
const hasText = (text: string) => document.body.textContent.includes(text);

const renderPicker = (
  id: string,
  onchange: (zone: string) => void,
  value = 'UTC',
  zones_ = zones,
) =>
  render(() => (
    <TimezonePicker id={id} onchange={onchange} value={value} zones={zones_} />
  ));

describe('<TimezonePicker />', () => {
  let onchange: ReturnType<typeof vi.fn<(zone: string) => void>>;

  beforeEach(() => {
    onchange = vi.fn<(zone: string) => void>();
  });

  test('opens the popup on trigger click and focuses the search input', async () => {
    const screen = renderPicker('tz', onchange);

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox');
    expect(input.element()).toHaveFocus();
    expect(hasListbox()).toBe(true);
    screen.unmount();
  });

  test('closes on Escape and restores focus to the trigger', async () => {
    const screen = renderPicker('tz', onchange);

    const trigger = screen.getByRole('button').element();
    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();
    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
    );
    flush();

    expect(hasListbox()).toBe(false);
    expect(document.activeElement).toBe(trigger);
    screen.unmount();
  });

  test('closes on outside pointerdown without stealing focus', async () => {
    const screen = renderPicker('tz', onchange);

    await screen.getByRole('button').click();

    const outside = document.createElement('button');
    outside.textContent = 'outside';
    document.body.appendChild(outside);
    outside.focus();

    outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    flush();

    expect(hasListbox()).toBe(false);
    expect(document.activeElement).toBe(outside);

    outside.remove();
    screen.unmount();
  });

  test('closes on Tab', async () => {
    const screen = renderPicker('tz', onchange);

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();
    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }),
    );
    flush();

    expect(hasListbox()).toBe(false);
    screen.unmount();
  });

  test('ArrowDown and ArrowUp move the highlight and clamp within bounds', async () => {
    const screen = renderPicker('tz', onchange);

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();

    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
    );
    flush();
    expect(input.getAttribute('aria-activedescendant')).toBe(
      'tz-listbox-option-4',
    );

    for (let i = 0; i < 4; i++) {
      input.dispatchEvent(
        new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp' }),
      );
      flush();
    }
    expect(input.getAttribute('aria-activedescendant')).toBe(
      'tz-listbox-option-0',
    );

    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp' }),
    );
    flush();
    expect(input.getAttribute('aria-activedescendant')).toBe(
      'tz-listbox-option-0',
    );
    screen.unmount();
  });

  test('Home and End move the active index to the first and last options', async () => {
    const screen = renderPicker('tz-home-end', onchange);

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();

    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Home' }),
    );
    flush();
    expect(input.getAttribute('aria-activedescendant')).toBe(
      'tz-home-end-listbox-option-0',
    );

    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'End' }),
    );
    flush();
    expect(input.getAttribute('aria-activedescendant')).toBe(
      'tz-home-end-listbox-option-4',
    );
    screen.unmount();
  });

  test('Enter selects the highlighted option and restores focus', async () => {
    const screen = renderPicker('tz', onchange);

    const trigger = screen.getByRole('button').element();
    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();
    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }),
    );
    flush();

    expect(onchange).toHaveBeenCalledWith('UTC');
    expect(hasListbox()).toBe(false);
    expect(document.activeElement).toBe(trigger);
    screen.unmount();
  });

  test('Enter during IME composition does not commit', async () => {
    const screen = renderPicker('tz-ime', onchange);

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();
    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        bubbles: true,
        isComposing: true,
        key: 'Enter',
      }),
    );
    flush();

    expect(onchange).not.toHaveBeenCalled();
    expect(hasListbox()).toBe(true);
    screen.unmount();
  });

  test('clicking an option selects it', async () => {
    const screen = renderPicker('tz', onchange);

    await screen.getByRole('button').click();

    await screen.getByText('Tokyo').click();

    expect(onchange).toHaveBeenCalledWith('Asia/Tokyo');
    screen.unmount();
  });

  test('search filters the available zones', async () => {
    const screen = renderPicker('tz', onchange);

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();

    if (input instanceof HTMLInputElement) input.value = 'tok';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    flush();

    expect(hasText('Tokyo')).toBe(true);
    expect(hasText('Berlin')).toBe(false);
    screen.unmount();
  });

  test('shows the empty state when nothing matches', async () => {
    const screen = renderPicker('tz', onchange);

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();

    if (input instanceof HTMLInputElement) input.value = 'zzzzz';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    flush();

    expect(hasText('No matching timezones')).toBe(true);
    screen.unmount();
  });

  test('opens above when there is not enough room below', async () => {
    const screen = renderPicker('tz', onchange);

    const trigger = screen.getByRole('button').element();
    const vh = window.innerHeight;
    const rectSpy = vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      bottom: vh - 5,
      height: 10,
      left: 0,
      right: 100,
      toJSON: () => ({}),
      top: vh - 15,
      width: 100,
      x: 0,
      y: vh - 15,
    });

    await screen.getByRole('button').click();

    const popup = document.querySelector('[role="listbox"]')?.parentElement;
    expect(popup?.className).toContain('inset-be-full');

    rectSpy.mockRestore();
    screen.unmount();
  });

  test('opens with no options when zones is empty', async () => {
    const screen = renderPicker('tz', onchange, 'UTC', []);

    await screen.getByRole('button').click();

    expect(hasText('No matching timezones')).toBe(true);
    screen.unmount();
  });
});

describe('<TimezonePicker /> additional branches', () => {
  let onchange: ReturnType<typeof vi.fn<(zone: string) => void>>;

  beforeEach(() => {
    onchange = vi.fn<(zone: string) => void>();
  });

  test('opens on ArrowDown when the trigger is focused', () => {
    const screen = renderPicker('tz2', onchange);

    const trigger = screen.getByRole('button').element();
    trigger.focus();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
    );
    flush();

    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    screen.unmount();
  });

  test('opens on ArrowUp when the trigger is focused', () => {
    const screen = renderPicker('tz3', onchange);

    const trigger = screen.getByRole('button').element();
    trigger.focus();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp' }),
    );
    flush();

    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    screen.unmount();
  });

  test('toggles closed when the trigger is clicked while open', async () => {
    const screen = renderPicker('tz4', onchange);

    await screen.getByRole('button').click();
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();

    await screen.getByRole('button').click();
    expect(document.querySelector('[role="listbox"]')).toBeNull();
    screen.unmount();
  });

  test('move does nothing when there are no options', async () => {
    const screen = renderPicker('tz5', onchange);

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();

    if (input instanceof HTMLInputElement) input.value = 'zzzzz';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    flush();

    const before = input.getAttribute('aria-activedescendant');
    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
    );
    flush();

    expect(input.getAttribute('aria-activedescendant')).toBe(before);
    screen.unmount();
  });

  test('Enter does nothing when there are no options', async () => {
    const screen = renderPicker('tz6', onchange);

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();

    if (input instanceof HTMLInputElement) input.value = 'zzzzz';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    flush();

    input.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }),
    );
    flush();

    expect(onchange).not.toHaveBeenCalled();
    screen.unmount();
  });

  test('closes the popup on window resize', async () => {
    const screen = renderPicker('tz7', onchange);

    await screen.getByRole('button').click();
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();

    // A resize that leaves the viewport width unchanged, such as the mobile
    // keyboard opening, keeps the popup open.
    window.dispatchEvent(new Event('resize'));
    flush();
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();

    // A resize that changes the viewport width closes the popup.
    const width = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: width + 100,
      writable: true,
    });
    window.dispatchEvent(new Event('resize'));
    flush();
    expect(document.querySelector('[role="listbox"]')).toBeNull();

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: width,
      writable: true,
    });
    screen.unmount();
  });

  test('ignores non-arrow keys on the closed trigger', () => {
    const screen = renderPicker('tz10', onchange);

    const trigger = screen.getByRole('button').element();
    trigger.focus();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }),
    );
    flush();

    expect(document.querySelector('[role="listbox"]')).toBeNull();
    screen.unmount();
  });

  test('ignores pointerdown outside while closed', () => {
    const screen = renderPicker('tz8', onchange);

    const outside = document.createElement('button');
    outside.textContent = 'outside';
    document.body.appendChild(outside);

    outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    flush();

    expect(document.querySelector('[role="listbox"]')).toBeNull();

    outside.remove();
    screen.unmount();
  });
});

describe('<TimezonePicker /> document pointerdown', () => {
  test('closes via document pointerdown when focus stays in the input', async () => {
    const onchange = vi.fn<(zone: string) => void>();
    const screen = renderPicker('tz9', onchange);

    await screen.getByRole('button').click();
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();

    const outside = document.createElement('div');
    document.body.appendChild(outside);

    outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    flush();

    expect(document.querySelector('[role="listbox"]')).toBeNull();

    outside.remove();
    screen.unmount();
  });
});

describe('<TimezonePicker /> closed-state trigger', () => {
  test('keeps the popup open and query intact when ArrowDown is dispatched on the trigger while open', async () => {
    const onchange = vi.fn<(zone: string) => void>();
    const screen = renderPicker('tz-open', onchange);

    await screen.getByRole('button').click();

    const input = screen.getByRole('combobox').element();

    if (input instanceof HTMLInputElement) input.value = 'tok';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    flush();

    const trigger = screen.getByRole('button').element();
    const activeBefore = input.getAttribute('aria-activedescendant');

    trigger.focus();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
    );
    flush();

    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    expect(input instanceof HTMLInputElement ? input.value : '').toBe('tok');
    expect(input.getAttribute('aria-activedescendant')).toBe(activeBefore);
    expect(onchange).not.toHaveBeenCalled();
    screen.unmount();
  });
});

describe('<TimezonePicker /> scroll reset', () => {
  test('resets list scroll when the search query changes', async () => {
    const zones = Array.from(
      { length: 40 },
      (_, index) => `Europe/City${index}`,
    );
    const onchange = vi.fn<(zone: string) => void>();
    const screen = renderPicker('tz-scroll', onchange, 'UTC', zones);

    await screen.getByRole('button').click();

    const listbox = screen.getByRole('listbox').element();
    listbox.style.maxHeight = '100px';
    listbox.style.overflowY = 'auto';

    // Ensure the list is actually scrollable.
    expect(listbox.scrollHeight).toBeGreaterThan(listbox.clientHeight);

    listbox.scrollTop = 200;
    expect(listbox.scrollTop).toBeGreaterThan(0);

    const input = screen.getByRole('combobox').element();

    if (input instanceof HTMLInputElement) input.value = 'europe';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    flush();

    expect(listbox.scrollTop).toBe(0);
    screen.unmount();
  });

  test('does not scroll the page when opening or navigating the list', () => {
    const zones = Array.from(
      { length: 40 },
      (_, index) => `Europe/City${index}`,
    );
    const onchange = vi.fn<(zone: string) => void>();
    const screen = renderPicker(
      'tz-page-scroll',
      onchange,
      zones[0] ?? '',
      zones,
    );

    const spacer = document.createElement('div');
    spacer.style.height = '2000px';
    document.body.appendChild(spacer);

    // The test page doesn't load the app's CSS, so give the options a fixed
    // block layout that makes the list tall enough to scroll.
    const style = document.createElement('style');
    style.textContent =
      '[role="option"] { display: block; height: 30px; width: 100%; }';
    document.head.appendChild(style);

    const html = document.documentElement;
    const originalOverflowAnchor = html.style.overflowAnchor;

    try {
      html.style.overflowAnchor = 'none';

      window.scrollTo(0, 300);
      const initialScrollY = window.scrollY;
      expect(initialScrollY).toBe(300);

      // Use click() directly so the test doesn't scroll the trigger into view.
      const button = screen.getByRole('button').element();
      if (button instanceof HTMLButtonElement) button.click();
      flush();

      const listbox = screen.getByRole('listbox').element();
      const input = screen.getByRole('combobox').element();

      listbox.style.maxHeight = '100px';
      listbox.style.overflowY = 'auto';

      expect(listbox.scrollHeight).toBeGreaterThan(listbox.clientHeight);
      expect(window.scrollY).toBe(initialScrollY);

      for (let i = 0; i < 20; i++) {
        input.dispatchEvent(
          new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
        );
        flush();
      }

      expect(listbox.scrollTop).toBeGreaterThan(0);
      expect(window.scrollY).toBe(initialScrollY);
    } finally {
      html.style.overflowAnchor = originalOverflowAnchor;
      style.remove();
      spacer.remove();
      window.scrollTo(0, 0);
      screen.unmount();
    }
  });
});
