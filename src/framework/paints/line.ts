import {Canvas, Point} from '../../core';

interface Props {
  from: Point;
  to: Point;
  color?: string;
}

export const createLinePaint = (canvas: Canvas) => (props: Props) => {
  const ctx = canvas.getContext();
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = props.color;
  ctx.moveTo(props.from.x, props.from.y);
  ctx.lineTo(props.to.x, props.to.y);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};
