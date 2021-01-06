import {Paint} from '../types';
import {Point} from '../platform';
import {line} from './line';

export type Props = {
  from: Point;
  to: Point;
  gap: number;
  color?: string;
};

export const mesh: Paint<Props> = (canvas, {from, to, gap, color}) => {
  for (let x = from.x; x <= to.x; x += gap) {
    line(canvas, {
      from: {x, y: from.y},
      to: {x, y: to.y},
      color,
    });
  }

  for (let y = from.y; y <= to.y; y += gap) {
    line(canvas, {
      from: {x: from.x, y},
      to: {x: to.x, y},
      color,
    });
  }
};
