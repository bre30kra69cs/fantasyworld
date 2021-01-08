import {Point, ABus} from '../../../core';
import {AManagedComponent} from '../manager';

export class AMovedComponent extends AManagedComponent {
  protected speed = 1;
  protected point = {x: 0, y: 0};

  private gap = 1;
  private targetPoint = {x: 0, y: 0};

  constructor(bus: ABus, name?: string) {
    super(bus, name);
    this.manager.pushConst(this.repoint);
  }

  private repoint = () => {
    const ctx = this.bus.getCanvas().getContext();
    ctx.save();
    ctx.translate(this.point.x, this.point.y);

    return () => ctx.restore();
  };

  private isFinished = (from: number, to: number) => {
    return Math.abs(to - from) < this.gap;
  };

  private sin = () => {
    const xLen = Math.abs(this.targetPoint.x - this.point.x);
    const yLen = Math.abs(this.targetPoint.y - this.point.y);
    const base = Math.pow(Math.pow(xLen, 2) + Math.pow(yLen, 2), 1 / 2);
    return yLen / base;
  };

  private cos = () => {
    const xLen = Math.abs(this.targetPoint.x - this.point.x);
    const yLen = Math.abs(this.targetPoint.y - this.point.y);
    const base = Math.pow(Math.pow(xLen, 2) + Math.pow(yLen, 2), 1 / 2);
    return xLen / base;
  };

  protected moveTo = (to: Point) => {
    this.targetPoint = to;

    if (!this.isFinished(this.point.x, this.targetPoint.x)) {
      const sign = Math.sign(this.targetPoint.x - this.point.x);
      const speedX = this.cos() * sign * this.speed;
      this.point.x += speedX;
    } else {
      this.point.x = this.targetPoint.x;
    }

    if (!this.isFinished(this.point.y, this.targetPoint.y)) {
      const sign = Math.sign(this.targetPoint.y - this.point.y);
      const speedY = this.sin() * sign * this.speed;
      this.point.y += speedY;
    } else {
      this.point.y = this.targetPoint.y;
    }
  };

  protected isHere = (point: Point) => {
    return this.isFinished(this.point.x, point.x) && this.isFinished(this.point.y, point.y);
  };

  protected isMoved = () => {
    return (
      this.isFinished(this.point.x, this.targetPoint.x) &&
      this.isFinished(this.point.y, this.targetPoint.y)
    );
  };
}
