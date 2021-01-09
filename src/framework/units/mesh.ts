import {createElement} from '../utils';
import {Unit} from '../types';
import {createMeshPaint} from '../paints/mesh';

export const meshUnit: Unit = {
  element: createElement({
    id: 'mesh',
  }),
  render: ({canvas}) => {
    const meshPaint = createMeshPaint(canvas);

    meshPaint({
      from: {
        x: 0,
        y: 0,
      },
      to: {
        x: 100,
        y: 100,
      },
      gap: 25,
    });
  },
};
