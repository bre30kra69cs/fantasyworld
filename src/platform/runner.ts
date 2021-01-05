import {Engine, IEngine, IUnit} from '../engine/engine';
import {Loop, ILoop} from '../engine/loop';
import {Canvas, ICanvas} from '../engine/canvas';
import {Base, IBase} from './base';
import {Camera, ICamera} from './camera';
import {Mesh} from './mesh';
import {Utils} from '../utils';
import {SCALE_BASE} from '../consts';

export interface IScene {
  prepare(): IUnit[];
}

export interface IRunner {
  setScene(scene: IScene): void;
  run(): void;
}

interface RunnerConfig {
  mode: 'development' | 'production';
  scaleBase: number;
}

const DEFAULT_RUNNER_CONFIG: RunnerConfig = {
  mode: 'development',
  scaleBase: SCALE_BASE,
};

export class Runner extends Utils implements IRunner {
  private config: RunnerConfig;
  private engine: IEngine;
  private canvas: ICanvas;
  private loop: ILoop;
  private base: IBase;
  private camera: ICamera;

  constructor(config?: Partial<RunnerConfig>) {
    super();

    const baseConfig = this.mergeConfig(DEFAULT_RUNNER_CONFIG, config);

    this.config = baseConfig;
    this.canvas = new Canvas();
    this.engine = new Engine(this.canvas);
    this.loop = new Loop(this.engine);
    this.camera = new Camera();
    this.base = new Base(this.camera);
    this.engine.push(this.base);
  }

  public setScene = (scene: IScene) => {
    const units = scene.prepare();

    for (const unit of units) {
      this.base.push(unit);
    }
  };

  public run = () => {
    const {mode} = this.config;

    if (mode === 'development') {
      const mesh = new Mesh({
        gap: this.config.scaleBase,
      });
      this.base.push(mesh);
    }

    this.camera.listen();
    this.loop.start();
  };
}
