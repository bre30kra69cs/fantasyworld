import {ACanvas} from './canvas';
import {Event, AEvent, AListner} from './event';

export abstract class AResizer extends AListner {
  protected canvas: ACanvas;
  protected event: AEvent<'resize'>;

  constructor(canvas: ACanvas) {
    super();
    this.canvas = canvas;
    this.event = new Event('resize');
  }
}

export class Resizer extends AResizer {
  private setWindowSize = () => {
    const size = {
      w: window.innerWidth,
      h: window.innerHeight,
    };
    this.canvas.setSize(size);
  };

  public run = () => {
    this.setWindowSize();
    this.event.push(this.setWindowSize);
    this.event.run();
  };

  public stop = () => this.event.stop();
}
