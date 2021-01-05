import {Engine, IEngine} from '../engine/engine';
import {Loop, ILoop} from '../engine/loop';
import {Canvas, ICanvas} from '../engine/canvas';
import {Base} from './base';
import {Camera} from './camera';
import {Mesh} from './mesh';

export class Runner {
  private engine: IEngine;
  private canvas: ICanvas;
  private loop: ILoop;

  constructor() {
    this.canvas = new Canvas();
    this.engine = new Engine(this.canvas);
    this.loop = new Loop(this.engine, {
      tick: 500,
      logging: false,
    });
  }

  public run = () => {
    const mesh = new Mesh();
    const camera = new Camera();
    const base = new Base(camera);
    base.push(mesh);
    this.engine.push(base);

    camera.listen();
    this.loop.start();
  };
}
