# TimezonePicker

`TimezonePicker` is a searchable timezone combobox. It receives a list of timezone identifiers, groups and filters them, and manages the active option, keyboard navigation, focus, scrolling, and popup placement.

## Data preparation

The component receives four props:

- `id` — identifier used to associate the trigger and popup elements.
- `value` — currently selected timezone.
- `zones` — available timezone identifiers.
- `onchange` — callback invoked when a timezone is selected.

Timezone identifiers are grouped by their first path segment. For example, `Europe/Belgrade` belongs to the `Europe` group. Identifiers without a path segment, such as `UTC`, are placed in `Other`.

The trigger displays a timezone using `zoneLabel`: the last path segment with underscores replaced by spaces (e.g. `America/New_York` → `New York`).

Search is case-insensitive. Underscores are treated as spaces, allowing queries to match the human-readable form of timezone identifiers.

The filtered results are grouped before being flattened into the options list. Each option receives an index corresponding to its position in the rendered list. This index is used for active-option tracking and keyboard navigation.

When no zone matches the query, the listbox shows "No matching timezones".

## Invariants

- `options` is the flattened representation of `groups`, in display order.
- `activeIndex` indexes `options`.
- `item.index` is the corresponding position in `options`.
- Input order determines group order and item order within each group. Indices stay aligned with `options` regardless of input order.
- `buildGroups` does not sort. If a particular group order is required (for example alphabetical), sort the input before calling.

## State management

The picker maintains the following state:

- `open` — whether the popup is visible.
- `query` — current search query.
- `activeIndex` — index of the currently active option.
- `placement` — whether the popup opens above or below the trigger.

When the popup opens, the query is cleared and the active index is initialized from the selected value. If that value is not present in the available options, the index defaults to zero.

Changing the query resets the active index to zero and scrolls the listbox to its beginning.

## Focus management

The trigger opens and closes the popup on click. When the popup opens, the search input receives focus through a Svelte action.

The action runs when the input mounts. Svelte actions do not track state changes, so this is suitable for handling the initial focus when the popup is created.

Selecting an option or pressing Escape closes the popup and restores focus to the trigger. Pressing Tab closes the popup without restoring focus, allowing normal tab navigation to continue.

Focus moving outside the component also closes the popup.

## Keyboard navigation

The search input handles keyboard interaction:

- ArrowDown moves the active index forward.
- ArrowUp moves it backward.
- Home moves the active index to the first option.
- End moves the active index to the last option.
- Enter selects the active option.
- Escape closes the popup and restores focus to the trigger.
- Tab closes the popup without restoring focus.

Navigation is bounded by the available options. The active index cannot move below zero or beyond the last option. If there are no options, navigation does nothing.

The closed trigger also handles ArrowDown and ArrowUp, opening the popup when either key is pressed.

## Active-option scrolling

Scrolling is performed by adjusting the listbox's `scrollTop` directly. This
keeps scrolling contained within the listbox and prevents the document from
scrolling when an option is brought into view.

When the listbox mounts, the initially active option is centered in the
visible list. During keyboard navigation, the list scrolls only when the
active option moves outside the visible area, and only by the amount needed
to bring it back into view.

Changing the search query resets the listbox scroll position to the beginning.

## Popup placement

After the popup mounts, the component measures the available space above and
below the trigger, along with the popup's height and margins. The popup opens
above the trigger when it does not fit below and there is more available space
above. Otherwise, it opens below.

When the popup opens above the trigger, the flex direction is reversed. This
keeps the search input adjacent to the trigger while the options extend
upward, without changing their DOM order.

Placement is calculated when the popup opens. A window resize closes the
popup rather than recalculating its position.

## Dismissal and selection

A document-level pointer handler detects clicks outside the component and closes the popup without restoring focus. The component also closes when focus moves outside its root element.

Selecting an option invokes `onchange` with the selected timezone identifier, then closes the popup and restores focus to the trigger.
