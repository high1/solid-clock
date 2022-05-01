import { Index } from 'solid-js';
import { Hand } from 'Hand';
import type { Component } from 'solid-js';

type LinesProps = { numberOfLines: number, lineClass: string, lineLength: number, lineWidth: number };

const lineRotate = (index: number, length: number) => `rotate(${(360 * index) / length} 100 100)`;

export const Lines: Component<LinesProps> = ({ numberOfLines, lineClass, lineLength, lineWidth} ) => (
  <Index each={Array.from({ length: numberOfLines }, (_, index) => index)}>
    {(index) => <Hand rotate={() =>lineRotate(index(), numberOfLines)} handClass={lineClass} handLength={lineLength} handWidth={lineWidth} fixed />}
  </Index>
);