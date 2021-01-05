import {Point} from '../types';

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

export class Camera implements ICamera {
  private x: number;
  private y: number;
  private speed: number;

  constructor(config?: Partial<CameraConfig>) {
    const baseConfig = {...DEFAULT_CAMERA_CONFIG, ...(config ?? {})};
    const {x, y, speed} = baseConfig;

    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  private setX = (x: number) => {
    this.x = x;
  };

  private getX = () => {
    return this.x;
  };

  private getY = () => {
    return this.y;
  };

  private setY = (y: number) => {
    this.y = y;
  };

  private getSpeed = () => {
    return this.speed;
  };

  public listen = () => {
    const speed = this.getSpeed();

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp': {
          this.setY(this.getY() + speed);
          return;
        }
        case 'ArrowDown': {
          this.setY(this.getY() - speed);
          return;
        }
        case 'ArrowLeft': {
          this.setX(this.getX() + speed);
          return;
        }
        case 'ArrowRight': {
          this.setX(this.getX() - speed);
          return;
        }
      }
    });
  };

  public getCoords = () => {
    return {
      x: this.getX(),
      y: this.getY(),
    };
  };
}
