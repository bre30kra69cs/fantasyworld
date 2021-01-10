import {Point} from '../../engine';
import {createPaint} from '../utils';

type Props = {
  point: Point;
  radius: number;
  color?: string;
};

export const createCirclePaint = createPaint((canvas) => ({point, radius, color}: Props) => {
  const ctx = canvas.getContext();

  ctx.fillStyle = color;
  ctx.arc(point.x, point.y, radius, 0, 360);
  ctx.fill();
});
