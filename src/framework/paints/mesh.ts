import {Canvas, Point} from '../../core';
import {createLinePaint} from './line';

interface Props {
  from: Point;
  to: Point;
  gap: number;
  color?: string;
}

export const createMeshPaint = (canvas: Canvas) => (props: Props) => {
  const linePaint = createLinePaint(canvas);

  for (let x = props.from.x; x <= props.to.x; x += props.gap) {
    linePaint({
      from: {
        x,
        y: props.from.y,
      },
      to: {
        x,
        y: props.to.y,
      },
      color: props.color,
    });
  }

  for (let y = props.from.y; y <= props.to.y; y += props.gap) {
    linePaint({
      from: {
        x: props.from.x,
        y,
      },
      to: {
        x: props.to.x,
        y,
      },
      color: props.color,
    });
  }
};
