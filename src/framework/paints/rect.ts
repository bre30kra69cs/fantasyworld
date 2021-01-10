import {Point} from '../../engine';
import {Canvas} from '../types';

export const createRectPaint = (canvas: Canvas) => (from: Point, to: Point, color?: string) => {
  const ctx = canvas.getContext();
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(from.x, from.y, to.x - from.x, to.y - from.y);
  ctx.fill();
  ctx.restore();
};
