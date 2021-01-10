import {createModelFactory, createState} from '../utilts';

export const createCleaner = createModelFactory((canvas) => {
  return {
    state: createState({type: 'cleaner'}),
    paint: () => {
      const ctx = canvas.getContext();
      const size = canvas.getSize();
      ctx.clearRect(0, 0, size.w, size.h);
    },
  };
});
