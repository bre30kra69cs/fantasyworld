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

type GlobaslRestate = (state: State) => void;

/**
 *
 * @param rerender - rerender entire state
 * @param restate - restate localy
 * @param globalRestate - restate globaly (must be mutation)
 * @param state - initial state
 */
export const createCycle = (
  rerender: Rerender,
  restate: Restate,
  globalRestate: GlobaslRestate,
  state: State,
): Cycle => {
  let active = true;
  const stateMangaer = createStateManager(restate, state);

  const loopRestate = () => {
    if (active) {
      stateMangaer.nextState();
    }

    const nextState = stateMangaer.getState();
    globalRestate(nextState);
    return nextState;
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
