import {Point} from '../../platform';
import {APaint} from './types';

export abstract class ACirclePaint extends APaint {
  public abstract draw(center: Point, radius: number, color?: string): void;
}

export class CirclePaint extends ACirclePaint {
  public draw = (center: Point, radius: number, color?: string) => {
    const ctx = this.canvas.getContext();
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(center.x, center.y, radius, 0, 360);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };
}
