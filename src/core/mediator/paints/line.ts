import {Point} from '../../platform';
import {APaint} from './types';

export abstract class ALinePaint extends APaint {
  public abstract draw(from: Point, to: Point): void;
}

export class LinePaint extends ALinePaint {
  public draw = (from: Point, to: Point) => {
    const ctx = this.canvas.getContext();
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };
}
