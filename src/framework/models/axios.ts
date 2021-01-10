import {createModel, createState} from '../utilts';
import {createRectPaint} from '../paints/rect';

export const axios = createModel((canvas) => {
  return {
    state: createState({type: 'axios'}),
    paint: (state) => {
      const rectPaint = createRectPaint(canvas);

      rectPaint(
        {x: state.point.x - 2, y: state.point.y},
        {
          w: 4,
          h: 10000,
        },
        'green',
      );

      rectPaint(
        {x: state.point.x - 2, y: state.point.y},
        {
          w: 4,
          h: -10000,
        },
        'orange',
      );

      rectPaint(
        {x: state.point.x, y: state.point.y - 2},
        {
          w: -10000,
          h: 4,
        },
        'red',
      );

      rectPaint(
        {x: state.point.x, y: state.point.y - 2},
        {
          w: 10000,
          h: 4,
        },
        'blue',
      );
    },
  };
});
