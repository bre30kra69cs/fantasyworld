import {createModelFactory, createState} from '../utils';

export const createRoter = createModelFactory((canvas) => {
  return {
    state: createState({type: 'roter'}),
    paint: () => {
      const ctx = canvas.getContext();
      ctx.save();
    },
    unpaint: () => {
      const ctx = canvas.getContext();
      ctx.restore();
    },
  };
});
