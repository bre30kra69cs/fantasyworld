import {createLinePaint} from './line';
import {Point} from '../../engine';
import {Canvas} from '../type';

export const createMeshPaint = (canvas: Canvas) => (
  from: Point,
  to: Point,
  gap: number,
  color?: string,
) => {
  const linePaint = createLinePaint(canvas);

  for (let x = from.x; x <= to.x; x += gap) {
    linePaint(
      {
        x,
        y: from.y,
      },
      {
        x,
        y: to.y,
      },
      color,
    );
  }

  for (let y = from.y; y <= to.y; y += gap) {
    linePaint(
      {
        x: from.x,
        y,
      },
      {
        x: to.x,
        y,
      },
      color,
    );
  }
};
