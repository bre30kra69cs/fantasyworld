import {createModel, createState} from '../utils';
import {createRectPaint} from '../paints/rect';
import {createTextPaint} from '../paints/text';

export const axios = createModel((canvas) => {
  return {
    state: createState({type: 'axios'}),
    paint: (state) => {
      const rectPaint = createRectPaint(canvas);
      const textPaint = createTextPaint(canvas);

      textPaint({text: 'Hello world'}, {x: 10, y: 10}, 'green');

      rectPaint(
        {x: state.point.x - 2, y: state.point.y},
        {x: state.point.x + 2, y: 10000},
        'green',
      );

      rectPaint(
        {x: state.point.x - 2, y: state.point.y},
        {x: state.point.x + 2, y: -10000},
        'orange',
      );

      rectPaint({x: state.point.x, y: state.point.y + 2}, {x: 10000, y: state.point.y - 2}, 'red');

      rectPaint(
        {x: state.point.x, y: state.point.y + 2},
        {x: -10000, y: state.point.y - 2},
        'blue',
      );
    },
  };
});
