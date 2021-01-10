import {createModelFactory, createState} from '../utils';

export const createCleaner = createModelFactory((canvas) => {
  return {
    state: createState({
      type: 'cleaner',
      isAutopaint: false,
    }),
    paint: () => {
      const ctx = canvas.getContext();
      const size = canvas.getSize();
      ctx.clearRect(0, 0, size.w, size.h);
    },
  };
});
