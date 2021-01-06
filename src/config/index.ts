import CONFIG from './config.json';

type Config = {
  core: {
    engine: {
      logging: boolean;
    };
    loop: {
      count: number | null;
      logging: boolean;
    };
  };
};

export const config = (): Config => CONFIG;

export const engineLogging = () => config().core.engine.logging;

export const loopLogging = () => config().core.loop.logging;

export const loopCount = () => config().core.loop.count;
