import { createSignal } from 'solid-js';

import { rotate, seconds } from '@/common';

const hours = seconds / 5;
const getSecondsSinceMidnight = (): number =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

const [clock, setClock] = createSignal(getSecondsSinceMidnight());

export const time = {
  get hour() {
    return rotate(((clock() / seconds ** 2) % hours) / hours);
  },
  get milisecond() {
    return rotate(clock() % 1, 0);
  },
  get minute() {
    return rotate(((clock() / seconds) % seconds) / seconds);
  },
  get second() {
    return rotate((clock() % seconds) / seconds);
  },
  update: () => {
    setClock(getSecondsSinceMidnight());
  },
};
