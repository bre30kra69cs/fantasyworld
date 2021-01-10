import {createLinePaint} from './line';
import {Point} from '../../engine';
import {Canvas} from '../types';
import {createPaint} from '../utils';

type Props = {
  from: Point;
  to: Point;
  gap: number;
  color?: string;
};

export const createMeshPaint = createPaint((canvas: Canvas) => ({from, to, gap, color}: Props) => {
  const linePaint = createLinePaint(canvas);

  for (let x = from.x; x <= to.x; x += gap) {
    linePaint({
      from: {
        x,
        y: from.y,
      },
      to: {
        x,
        y: to.y,
      },
      color,
    });
  }

  for (let y = from.y; y <= to.y; y += gap) {
    linePaint({
      from: {
        x: from.x,
        y,
      },
      to: {
        x: to.x,
        y,
      },
      color,
    });
  }
});
