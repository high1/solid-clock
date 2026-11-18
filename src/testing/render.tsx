/** Local render helper for the browser-mode component tests. */
import type { JSX } from '@solidjs/web';

import { render as solidRender } from '@solidjs/web';
import { utils } from 'vitest/browser';

const containers = new Map<HTMLElement, () => void>();

export function cleanup() {
  for (const [container, dispose] of containers) {
    dispose();
    container.remove();
  }

  containers.clear();
}

export function render(component: () => JSX.Element) {
  const container = document.body.appendChild(document.createElement('div'));
  const dispose = solidRender(component, container);
  containers.set(container, dispose);

  const unmount = () => {
    const dispose = containers.get(container);

    dispose?.();
    containers.delete(container);
    container.remove();
  };

  return {
    container,
    unmount,
    ...utils.getElementLocatorSelectors(document.body),
  };
}
