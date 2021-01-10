import {createModelFactory, createState} from '../utils';
import {Restate} from '../../engine';

export const createCamera = createModelFactory((canvas) => {
  const createPipe = (): Restate => {
    const size = canvas.getSize();
    let x = size.w / 2;
    let y = size.h / 2;
    const speed = 15;

    window.addEventListener('keydown', ({key}) => {
      switch (key) {
        case 'ArrowDown':
          return (y -= speed);
        case 'ArrowUp':
          return (y += speed);
        case 'ArrowRight':
          return (x -= speed);
        case 'ArrowLeft':
          return (x += speed);
      }
    });

    return (state) => {
      return {
        ...state,
        point: {x, y},
      };
    };
  };

  return {
    state: createState({type: 'camera'}),
    pipe: createPipe(),
    paint: (state) => {
      const ctx = canvas.getContext();
      ctx.save();
      ctx.translate(state.point.x, state.point.y);
    },
    unpaint: () => {
      const ctx = canvas.getContext();
      ctx.restore();
    },
  };
});
