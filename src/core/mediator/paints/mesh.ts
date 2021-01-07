import {Point} from '../../platform';
import {APaint} from './types';
import {LinePaint} from './line';

export abstract class AMeshPaint extends APaint {
  public abstract draw(from: Point, to: Point, gap: number): void;
}

export class MeshPaint extends AMeshPaint {
  public draw = (from: Point, to: Point, gap: number) => {
    const line = new LinePaint(this.canvas);

    for (let x = from.x; x <= to.x; x += gap) {
      line.draw({x, y: from.y}, {x, y: to.y});
    }

    for (let y = from.y; y <= to.y; y += gap) {
      line.draw({x: from.x, y}, {x: to.x, y});
    }
  };
}
