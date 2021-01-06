import {noop} from '../utils/noop';
import {cerateCounter} from '../utils/counter';
import {loopLog, renderLog} from '../logger';
import {engineLogging, loopCount, loopLogging} from '../../config';

export type Shape = {
  paint(): void;
  push(shape: Shape): void;
  unpaint(): void;
  type: string;
  childrens: Shape[];
};

export type ShapeProps = Partial<Pick<Shape, 'paint' | 'unpaint' | 'type'>>;

export const createShape = (props: ShapeProps): Shape => {
  const childrens = [];
  const type = props.type ?? 'noop';

  const push = (shape: Shape) => childrens.push(shape);
  const paint = props.paint ?? noop;
  const unpaint = props.unpaint ?? noop;

  return {
    paint,
    push,
    unpaint,
    type,
    childrens,
  };
};

const render = (root: Shape) => {
  const iter = (shape: Shape) => {
    renderLog(shape.type, 'paint', engineLogging());
    shape.paint();
    shape.childrens.forEach(iter);
    renderLog(shape.type, 'unpaint', engineLogging());
    shape.unpaint && shape.unpaint();
  };

  iter(root);
};

const loop = (root: Shape) => {
  const isNumber = typeof loopCount() === 'number';
  const counter = cerateCounter(loopCount());

  const iter = () => {
    if (isNumber && !counter.check()) {
      return;
    }

    loopLog(counter.get(), loopLogging());
    render(root);
    counter.increment();
    window.requestAnimationFrame(iter);
  };

  window.requestAnimationFrame(iter);
};

export const engine = (root: Shape) => {
  loop(root);
};
