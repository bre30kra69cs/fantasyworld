import {Point} from '../../engine';
import {createPaint} from '../utils';

type Props = {
  text: string;
  point: Point;
  color?: string;
  size?: number;
};

export const createTextPaint = createPaint((canvas) => ({text, point, color, size}: Props) => {
  const ctx = canvas.getContext();

  ctx.fillStyle = color;
  ctx.font = `${size ?? 14}px serif`;
  ctx.fillText(text, point.x, point.y);
  ctx.fill();
});
