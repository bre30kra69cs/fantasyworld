import {Paint} from '../types';
import {Point} from '../platform';

type Props = {
  from: Point;
  to: Point;
  color?: string;
};

export const line: Paint<Props> = (canvas, {from, to, color}) => {
  canvas.context.save();
  canvas.context.beginPath();
  canvas.context.strokeStyle = color;
  canvas.context.moveTo(from.x, from.y);
  canvas.context.lineTo(to.x, to.y);
  canvas.context.stroke();
  canvas.context.closePath();
  canvas.context.restore();
  canvas.context.stroke();
};
