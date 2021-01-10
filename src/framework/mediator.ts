import {State} from '../engine';
import {Meadiator, FindProps} from './types';

type StateMap = Record<string, State>;

export const createMediator = (): Meadiator => {
  const stateMap: StateMap = {};

  // TODO: optimaize find
  const find = ({type, id}: FindProps) => {
    if (type) {
      const targets = Object.keys(stateMap).filter((key) => stateMap[key].type === type);

      if (id) {
        return targets.filter((key) => key === id).map((key) => stateMap[key])[0];
      }

      return targets.map((key) => stateMap[key])[0];
    }

    if (id) {
      return stateMap[id];
    }
  };

  return {
    setState: (state) => {
      stateMap[state.id] = state;
    },
    getState: (props) => {
      return find(props);
    },
    toCanvasPoint: (point) => {
      const camera = find({type: 'camera'});
      return {
        x: camera.point.x + point.x,
        y: camera.point.y + point.y,
      };
    },
  };
};
