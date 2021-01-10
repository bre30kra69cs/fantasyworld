import {engine, RerenderMap, RestateMap, Rerender, Restate} from '../engine';
import {Canvas, CanvasContainer, Meadiator, Model} from './types';
import {createMediator} from './mediator';
import {axios} from './models/axios';
import {createCamera} from './models/camera';
import {createRoter} from './models/roter';
import {createCleaner} from './models/cleaner';
import {createState} from './utils';
import {mode} from './dev';

const parseModel = (root: Model, canvas: Canvas, mediator: Meadiator) => {
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

const createCanvas = (id: string): Canvas => {
  const container = document.getElementById(id) as CanvasContainer;
  const context = container.getContext('2d');

  const setSize = () => {
    container.width = window.innerWidth;
    container.height = window.innerHeight;
  };

  window.addEventListener('resize', setSize);

  setSize();

  return {
    getContainer: () => {
      return container;
    },
    getContext: () => {
      return context;
    },
    getSize: () => {
      return {
        w: container.width,
        h: container.height,
      };
    },
  };
};

export const framework = (id: string, model: Model) => {
  const canvas = createCanvas(id);
  const mediator = createMediator();
  const roter = createRoter([model, axios]);
  const camera = createCamera([roter]);
  const cleaner = createCleaner([camera]);
  const {restateMap, rerenderMap, state} = parseModel(cleaner, canvas, mediator);
  const cycle = engine(restateMap, rerenderMap, state);
  mode(cycle);
  return cycle;
};
