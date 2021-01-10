import {State, Point} from '../engine';
import {Model} from './types';
import {id, tap, noop} from '../utils';

type ModelCreatorPprops = (...args: Parameters<Model>) => Partial<ReturnType<Model>>;

type ModelCreator = (props?: ModelCreatorPprops) => Model;

type ModelFactoryCreator = (props?: ModelCreatorPprops) => (childrens: Model[]) => Model;

export const degree = (angle: number) => {
  return (Math.PI / 180) * angle;
};

export const stateId = () => {
  return id(4);
};

export const createState = (customState?: Partial<State>): State => {
  return {
    id: stateId(),
    type: 'noop',
    point: {x: 0, y: 0},
    childrens: [],
    isGlobal: false,
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

  target.pipe = (state: State): State => {
    mediator.setState(state);
    return pipe(state);
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

// export const createModelFactory: ModelFactoryCreator = (model) => (childrens = []) => (
//   canvas,
//   mediator,
// ) => ({
//   state: createState(),
//   childrens,
//   pipe: tap,
//   paint: noop,
//   unpaint: noop,
//   ...(model?.(canvas, mediator) ?? {}),
// });

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
