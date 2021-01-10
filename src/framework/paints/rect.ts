import {Point} from '../../engine';
import {createPaint} from '../utils';

type Props = {
  from: Point;
  to: Point;
  color?: string;
};

export const createRectPaint = createPaint((canvas) => ({from, to, color}: Props) => {
  const ctx = canvas.getContext();

  ctx.fillStyle = color;
  ctx.fillRect(from.x, from.y, to.x - from.x, to.y - from.y);
  ctx.fill();
});
