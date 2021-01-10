import {engine} from '../engine';
import {Model} from './types';
import {createMediator} from './mediator';
import {axios} from './models/axios';
import {createCamera} from './models/camera';
import {createRoter} from './models/roter';
import {createCleaner} from './models/cleaner';
import {mode} from './dev';
import {createCanvas} from './canvas';
import {parseModel} from './parser';

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
