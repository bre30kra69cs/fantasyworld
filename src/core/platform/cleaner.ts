import {AElement} from '../engine';
import {ACanvas} from './canvas';

export class Cleaner extends AElement {
  private canvas: ACanvas;

  constructor(childrens: AElement[], canvas: ACanvas) {
    super('cleaner', childrens);
    this.canvas = canvas;
  }

  public paint = () => {
    const ctx = this.canvas.getContext();
    const size = this.canvas.getSize();
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, size.w, size.h);
  };
}
