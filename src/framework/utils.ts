import {State, Point} from '../engine';
import {Model, Canvas} from './types';
import {id, tap, noop} from '../utils';

export type ModelCreatorPprops = (...args: Parameters<Model>) => Partial<ReturnType<Model>>;

type ModelCreator = (props?: ModelCreatorPprops) => Model;

type ModelFactoryCreator = (props?: ModelCreatorPprops) => (childrens: Model[]) => Model;

type Paint<T> = (canvas: Canvas) => (props: T) => void;

export const degree = (angle: number) => {
  return (Math.PI / 180) * angle;
};

export const stateId = () => {
  return id(10);
};

export const createState = (customState?: Partial<State>): State => {
  return {
    id: stateId(),
    type: 'noop',
    point: {x: 0, y: 0},
    childrens: [],
    angle: 0,
    isGlobal: false,
    isAutopaint: true,
    ...(customState ?? {}),
  };
};

export const createModel: ModelCreator = (model) => (canvas, mediator) => {
  const forOverride = model?.(canvas, mediator) ?? {};

  const target = {
    state: createState(),
    childrens: [],
    pipe: tap,
    paint: noop,
    unpaint: noop,
    ...forOverride,
  };

  const pipe = target.pipe;
  const paint = target.paint;
  const unpaint = target.unpaint;

  target.pipe = (state: State): State => {
    mediator.setState(state);
    return pipe(state);
  };

  target.paint = (state: State) => {
    if (state.isAutopaint) {
      const ctx = canvas.getContext();
      ctx.save();
      ctx.translate(state.point.x, state.point.y);
      ctx.rotate(degree(state.angle));
    }

    paint(state);
  };

  target.unpaint = (state: State) => {
    unpaint(state);

    if (state.isAutopaint) {
      const ctx = canvas.getContext();
      ctx.restore();
    }
  };

  mediator.setState(target.state);

  return target;
};

export const createModelFactory: ModelFactoryCreator = (model) => (childrens = []) =>
  createModel((...args) => {
    return {
      ...model(...args),
      childrens,
    };
  });

export const pointTo = (point: Point): Point => {
  return point.reverse
    ? point
    : {
        x: point.x,
        y: -point.y,
        reverse: true,
      };
};

export const unpointTo = (point: Point): Point => {
  return point.reverse
    ? {
        x: point.x,
        y: -point.y,
        reverse: false,
      }
    : point;
};

export const createPaint = <T>(paint: Paint<T>): Paint<T> => {
  return (canvas) => (props) => {
    const ctx = canvas.getContext();
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.font = '10px serif';
    ctx.beginPath();
    paint(canvas)(props);
    ctx.closePath();
    ctx.restore();
  };
};
