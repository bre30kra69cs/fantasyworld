import {ACanvas} from '../../platform';

export abstract class APaint {
  protected canvas: ACanvas;

  constructor(canvas: ACanvas) {
    this.canvas = canvas;
  }

  public abstract draw(...args: any[]): void;
}
