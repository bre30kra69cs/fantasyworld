import {Point} from '../../engine';
import {Canvas} from '../';

export const createLinePaint = (canvas: Canvas) => (from: Point, to: Point, color?: string) => {
  const ctx = canvas.getContext();
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};
