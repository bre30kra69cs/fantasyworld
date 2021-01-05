import {Point} from '../types';
import {Utils} from '../utils';

export interface ICamera {
  listen(): void;
  getCoords(): Point;
}

interface CameraConfig {
  x: number;
  y: number;
  speed: number;
}

const DEFAULT_CAMERA_CONFIG: CameraConfig = {
  x: 0,
  y: 0,
  speed: 25,
};

export class Camera extends Utils implements ICamera {
  private x: number;
  private y: number;
  private speed: number;

  constructor(config?: Partial<CameraConfig>) {
    super();

    const {x, y, speed} = this.mergeConfig(DEFAULT_CAMERA_CONFIG, config);

    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  public listen = () => {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp': {
          this.y += this.speed;
          return;
        }
        case 'ArrowDown': {
          this.y -= this.speed;
          return;
        }
        case 'ArrowLeft': {
          this.x += this.speed;
          return;
        }
        case 'ArrowRight': {
          this.x -= this.speed;
          return;
        }
      }
    });
  };

  public getCoords = () => {
    return {
      x: this.x,
      y: this.y,
    };
  };
}
