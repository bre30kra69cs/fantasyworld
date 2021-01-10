import {createModel, createCirclePaint} from '../../framework';

export const baseUnit = createModel((canvas) => {
  return {
    paint: (state) => {
      const circlePaint = createCirclePaint(canvas);
      circlePaint({
        point: {x: state.point.x, y: state.point.y},
        radius: 10,
        color: 'red',
      });
    },
  };
});
