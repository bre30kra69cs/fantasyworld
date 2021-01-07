import {Point} from './types';
import {Event, AEvent, AListner, EventPayload} from './event';
import {Config} from '../config';

export abstract class ACamera extends AListner {
  protected event: AEvent<'keydown'>;
  protected point: Point = {x: 0, y: 0};
  protected speed = Config.cameraSpeed();

  constructor() {
    super();
    this.event = new Event('keydown');
  }

  public getPoint = () => this.point;
}

export class Camera extends ACamera {
  private moveCamera = (event: EventPayload<'keydown'>) => {
    switch (event.key) {
      case 'ArrowUp':
        this.point.y += this.speed;
        break;
      case 'ArrowDown':
        this.point.y -= this.speed;
        break;
      case 'ArrowLeft':
        this.point.x += this.speed;
        break;
      case 'ArrowRight':
        this.point.x -= this.speed;
        break;
    }
  };

  public run = () => {
    this.event.push(this.moveCamera);
    this.event.run();
  };

  public stop = () => this.event.stop();
}
