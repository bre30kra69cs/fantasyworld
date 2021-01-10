import {clone} from '../utils';
import {Restate, State} from './state';
import {Rerender} from './loop';
import {createCycle} from './cycle';

export type TypedRestate = {
  type: string;
  pipe: Restate;
};

export type TypedRerender = {
  type: string;
  paint: Rerender;
  unpaint: Rerender;
};

export type RestateMap = Record<string, TypedRestate>;

export type RerenderMap = Record<string, TypedRerender>;

export const engine = (restateMap: RestateMap, rerenderMap: RerenderMap, state: State) => {
  const rerender = (root: State) => {
    const iter = (iterState: State) => {
      const iterRerender = rerenderMap[iterState.type];
      iterRerender.paint(iterState);
      iterState.childrens.forEach(iter);
      iterRerender.unpaint(iterState);
    };

    iter(root);
  };

  const restate = (value: State) => {
    const root = clone(value);

    const iter = (iterState: State) => {
      const iterRestate = restateMap[iterState.type];
      const nextState = iterRestate.pipe(iterState);
      const nextChildrens = iterState.childrens.map(iter);
      nextState && (nextState.childrens = nextChildrens);
      return nextState;
    };

    return iter(root);
  };

  return createCycle(rerender, restate, state);
};
