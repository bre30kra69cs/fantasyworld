import {Point} from '../../engine';
import {Canvas, Size} from '../type';

export const createRectPaint = (canvas: Canvas) => (from: Point, size: Size, color?: string) => {
  const ctx = canvas.getContext();
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(from.x, from.y, size.w, size.h);
  ctx.fill();
  ctx.restore();
};
