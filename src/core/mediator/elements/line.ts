import {ACanvas, Point} from '../../platform';
import {LinePaint} from '../paints';
import {ElementCreator} from '../element';

export const lineElementFactory = (canvas: ACanvas) => (
  from: Point,
  to: Point,
  color?: string,
  childrens = [],
) =>
  new ElementCreator('lineElement', childrens, {
    paint: () => {
      const line = new LinePaint(canvas);
      line.draw(from, to, color);
    },
  });
