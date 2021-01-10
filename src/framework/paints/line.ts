import {Point} from '../../engine';
import {Canvas} from '../types';
import {createPaint} from '../utils';

type Props = {
  from: Point;
  to: Point;
  color?: string;
};

export const createLinePaint = createPaint((canvas: Canvas) => ({from, to, color}: Props) => {
  const ctx = canvas.getContext();

  ctx.strokeStyle = color;
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
});
