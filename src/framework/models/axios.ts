import {createModel, createState} from '../utils';
import {createRectPaint} from '../paints/rect';

export const axios = createModel((canvas) => {
  return {
    state: createState({
      type: 'axios',
      isAutopaint: false,
    }),
    paint: (state) => {
      const rectPaint = createRectPaint(canvas);

      rectPaint({
        from: {x: state.point.x - 2, y: state.point.y},
        to: {x: state.point.x + 2, y: 10000},
        color: 'green',
      });

      rectPaint({
        from: {x: state.point.x - 2, y: state.point.y},
        to: {x: state.point.x + 2, y: -10000},
        color: 'orange',
      });

      rectPaint({
        from: {x: state.point.x, y: state.point.y + 2},
        to: {x: 10000, y: state.point.y - 2},
        color: 'red',
      });

      rectPaint({
        from: {x: state.point.x, y: state.point.y + 2},
        to: {x: -10000, y: state.point.y - 2},
        color: 'blue',
      });
    },
  };
});
