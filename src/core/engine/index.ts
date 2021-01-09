export interface Platform {
  init(cycle: Cycle): void;
  restate(): void;
  render(): void;
}

interface Engine {
  restate(): void;
  render(): void;
  stop(): void;
  run(): void;
}

export const createEngine = (platform: Platform): Engine => {
  let isActive = true;

  return {
    restate: () => {
      if (isActive) {
        platform.restate();
      }
    },
    render: () => {
      platform.render();
    },
    stop: () => {
      isActive = false;
    },
    run: () => {
      isActive = true;
    },
  };
};

const loop = (engine: Engine) => {
  const iter = () => {
    engine.restate();
    engine.render();
    window.requestAnimationFrame(iter);
  };

  window.requestAnimationFrame(iter);
};

export interface Cycle {
  run(): void;
  stopEngine(): void;
  runEngine(): void;
}

export const createCycle = (engine: Engine): Cycle => {
  return {
    run: () => {
      loop(engine);
    },
    stopEngine: () => {
      engine.stop();
    },
    runEngine: () => {
      engine.run();
    },
  };
};
