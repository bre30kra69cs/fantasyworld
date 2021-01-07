import {AElement} from '../engine';
import {ACanvas} from './canvas';
import {ACamera} from './camera';

export class Operator extends AElement {
  private canvas: ACanvas;
  private camera: ACamera;

  constructor(childrens: AElement[], canvas: ACanvas, camera: ACamera) {
    super(childrens);
    this.canvas = canvas;
    this.camera = camera;
  }

  public paint = () => {
    const ctx = this.canvas.getContext();
    const point = this.camera.getPoint();
    ctx.save();
    ctx.moveTo(point.x, point.y);
  };

  public unpaint = () => {
    const ctx = this.canvas.getContext();
    ctx.restore();
  };
}
