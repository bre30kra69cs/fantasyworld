import {Canvas, ACanvas} from './canvas';
import {Engine, AEngine, AElement} from '../engine';
import {Cleaner} from './cleaner';
import {Resizer, AResizer} from './resizer';
import {Camera, ACamera} from './camera';
import {Operator} from './operator';

export abstract class APlatform {
  protected canvas: ACanvas;
  protected resizer: AResizer;
  protected engine: AEngine;
  protected camera: ACamera;

  constructor(root: AElement) {
    this.canvas = new Canvas();
    this.camera = new Camera();
    this.resizer = new Resizer(this.canvas);
    const operator = new Operator([root], this.canvas, this.camera);
    const cleaner = new Cleaner([operator], this.canvas);
    this.engine = new Engine(cleaner);
  }

  public abstract run(): void;
}

export class Platform extends APlatform {
  public run = () => {
    this.resizer.run();
    this.camera.run();
    this.engine.run();
  };
}
