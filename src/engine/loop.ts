import {IEngine} from './engine';
import {Logger} from '../logger';
import {Utils} from '../utils';

export interface ILoop {
  start(): void;
}

interface LoopConfig {
  framesCount: number;
  logging: boolean;
}

const DEFAULT_LOOP_CONFIG: LoopConfig = {
  framesCount: Infinity,
  logging: false,
};

export class Loop extends Utils implements ILoop {
  private config: LoopConfig;
  private engine: IEngine;
  private frameCounter = 0;

  constructor(engine: IEngine, config?: Partial<LoopConfig>) {
    super();

    const baseConfig = this.mergeConfig(DEFAULT_LOOP_CONFIG, config);

    this.config = baseConfig;
    this.engine = engine;
  }

  private incrementFrameCounter = () => {
    this.frameCounter += 1;
  };

  private iter = () => {
    if (this.config.logging) {
      Logger.loopFrame(this.frameCounter);
    }

    if (!Number.isFinite(this.config.framesCount)) {
      this.engine.render();
      this.incrementFrameCounter();
      window.requestAnimationFrame(this.iter);
    } else if (this.config.framesCount > this.frameCounter) {
      this.engine.render();
      this.incrementFrameCounter();
      window.requestAnimationFrame(this.iter);
    }
  };

  public start = () => {
    window.requestAnimationFrame(this.iter);
  };
}
