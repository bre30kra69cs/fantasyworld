import {IEngine} from './engine';

export interface ILoop {
  start(): void;
}

interface LoopConfig {
  tick: number;
  ticksCount: number;
  logging: boolean;
}

const DEFAULT_LOOP_CONFIG: LoopConfig = {
  tick: 500,
  ticksCount: Infinity,
  logging: false,
};

export class Loop implements ILoop {
  private config: LoopConfig;
  private engine: IEngine;
  private internalTickCounter = 0;

  constructor(engine: IEngine, config?: Partial<LoopConfig>) {
    const baseConfig = {...DEFAULT_LOOP_CONFIG, ...(config ?? {})};

    this.config = baseConfig;
    this.engine = engine;
  }

  private incrementInternalTick = () => {
    this.internalTickCounter += 1;
  };

  private getInternalTick = () => {
    return this.internalTickCounter;
  };

  private getConfig = () => {
    return this.config;
  };

  private getTick = () => {
    return this.getConfig()['tick'];
  };

  private getTicksCount = () => {
    return this.getConfig()['ticksCount'];
  };

  private getLogging = () => {
    return this.getConfig()['logging'];
  };

  private getEngine = () => {
    return this.engine;
  };

  private wait = () => {
    const tick = this.getTick();

    return new Promise((res) => {
      setTimeout(res, tick);
    });
  };

  private iter = () => {
    this.getEngine().render();
    window.requestAnimationFrame(this.iter);
  };

  public start = () => {
    window.requestAnimationFrame(this.iter);
  };
}
