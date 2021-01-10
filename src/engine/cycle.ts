import {createStateManager, Restate, State} from './state';
import {loop, Rerender} from './loop';

export type Cycle = {
  prev(): void;
  next(): void;
  start(): void;
  stop(): void;
  run(): void;
  getStatus(): boolean;
};

export const createCycle = (rerender: Rerender, restate: Restate, state: State): Cycle => {
  let active = true;
  const stateMangaer = createStateManager(restate, state);

  const loopRestate = () => {
    if (active) {
      stateMangaer.nextState();
    }

    return stateMangaer.getState();
  };

  return {
    prev: () => {
      stateMangaer.prevState();
    },
    next: () => {
      stateMangaer.nextState();
    },
    start: () => {
      active = true;
    },
    stop: () => {
      active = false;
    },
    run: () => {
      loop(rerender, loopRestate);
    },
    getStatus: () => {
      return active;
    },
  };
};
