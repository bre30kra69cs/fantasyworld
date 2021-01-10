import {createModelFactory, createState, degree} from '../utilts';

export const createRoter = createModelFactory((canvas) => {
  return {
    state: createState({type: 'roter'}),
    paint: () => {
      const ctx = canvas.getContext();
      ctx.save();
      ctx.rotate(degree(180));
    },
    unpaint: () => {
      const ctx = canvas.getContext();
      ctx.restore();
    },
  };
});
