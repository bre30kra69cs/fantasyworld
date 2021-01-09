import {createElement} from '../utils';
import {Unit} from '../types';

export const cleanerUnit: Unit = {
  element: createElement({
    id: 'cleaner',
  }),
  render: ({canvas, element}) => {
    const ctx = canvas.getContext();
    const size = canvas.getSize();
    ctx.clearRect(element.point.x, element.point.y, size.w, size.h);
  },
};
