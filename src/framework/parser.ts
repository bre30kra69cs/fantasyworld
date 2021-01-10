import {RerenderMap, RestateMap, Rerender, Restate} from '../engine';
import {Canvas, Meadiator, Model} from './types';
import {createState} from './utils';

export const parseModel = (root: Model, canvas: Canvas, mediator: Meadiator) => {
  const rerenderMap: RerenderMap = {};
  const restateMap: RestateMap = {};

  const pushToRestateMap = (type: string, pipe?: Restate) => {
    if (!restateMap[type]) {
      restateMap[type] = {
        type,
        pipe,
      };
    }
  };

  const pushToRerenderMap = (type: string, paint?: Rerender, unpaint?: Rerender) => {
    if (!rerenderMap[type]) {
      rerenderMap[type] = {
        type,
        paint,
        unpaint,
      };
    }
  };

  const iter = (model: Model) => {
    const res = model(canvas, mediator);
    const {pipe, paint, unpaint} = res;
    const modelChildrens = res.childrens;
    const modelState = res.state;
    const {type} = modelState;
    pushToRestateMap(type, pipe);
    pushToRerenderMap(type, paint, unpaint);
    const state = createState(modelState);
    const stateChildrens = modelChildrens.map(iter);
    state.childrens = stateChildrens;
    return state;
  };

  const state = iter(root);
  return {restateMap, rerenderMap, state};
};
