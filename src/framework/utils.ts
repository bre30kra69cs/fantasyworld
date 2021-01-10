import {State} from '../engine';
import {Canvas, Model} from './type';
import {id, tap, noop} from '../utils';

type ModelCreatorPprops = (canvas: Canvas) => Partial<ReturnType<Model>>;

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
    ...(customState ?? {}),
  };
};

export const createModel: ModelCreator = (model) => (canvas) => ({
  state: createState(),
  childrens: [],
  pipe: tap,
  paint: noop,
  unpaint: noop,
  ...(model?.(canvas) ?? {}),
});

export const createModelFactory: ModelFactoryCreator = (model) => (childrens = []) => (canvas) => ({
  state: createState(),
  childrens,
  pipe: tap,
  paint: noop,
  unpaint: noop,
  ...(model?.(canvas) ?? {}),
});
