import {createCirclePaint, createLinePaint, createState} from '../../../framework';
import {heroFactory} from '../factories/hero';

export const man = heroFactory((canvas, mediator, specs) => {
  const {roter, mover} = specs;
  roter.setSpeed(1);
  mover.setSpeed(1);

  return {
    state: createState({
      type: 'man',
    }),
    pipe: (state) => {
      mover.move(state, {x: 100, y: 100});
      roter.rotate(state, 550);
      return state;
    },
    paint: () => {
      const circlePaint = createCirclePaint(canvas);
      const linePaint = createLinePaint(canvas);

      circlePaint({
        point: {x: 0, y: 0},
        radius: 20,
        color: 'black',
      });

      linePaint({
        from: {x: 0, y: 0},
        to: {x: 0, y: 20},
        color: 'red',
      });
    },
  };
});
