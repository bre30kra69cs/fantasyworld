import {Point} from '../../engine';
import {Canvas} from '../types';

interface Props {
  text: string;
  size?: number;
}

export const createTextPaint = (canvas: Canvas) => (props: Props, point: Point, color?: string) => {
  const ctx = canvas.getContext();
  ctx.save();
  ctx.font = `${props.size ?? 14}px serif`;
  ctx.fillStyle = color;
  ctx.fillText(props.text, point.x, point.y);
  ctx.fill();
  ctx.restore();
};
