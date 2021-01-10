import {clone, equal} from '../utils';
import {config} from '../config';

export type Cycle = {
  prev(): void;
  next(): void;
  start(): void;
  stop(): void;
  run(): void;
  getStatus(): boolean;
};

export type Point = {
  x: number;
  y: number;
};

export type State = {
  id: string;
  type: string;
  point: Point;
  childrens: State[];
};

export type Restate = (state: State) => State;

export type Rerender = (state: State) => void;

export type TypedRestate = {
  type: string;
  pipe: Restate;
};

export type TypedRerender = {
  type: string;
  paint: Rerender;
  unpaint: Rerender;
};

export type RestateMap = Record<string, TypedRestate>;

export type RerenderMap = Record<string, TypedRerender>;

type LoopRestate = () => State;

const loop = (rerender: Rerender, restate: LoopRestate) => {
  const iter = () => {
    const state = restate();
    rerender(state);
    window.requestAnimationFrame(iter);
  };

  window.requestAnimationFrame(iter);
};

const createCycle = (rerender: Rerender, restate: Restate, state: State): Cycle => {
  let active = true;
  const stateHistory = [state];
  let currentIndex = 0;

  const getPrevIndex = () => {
    if (currentIndex > 0) {
      return currentIndex - 1;
    }

    return currentIndex;
  };

  const getNextIndex = () => {
    if (currentIndex < stateHistory.length - 1) {
      return currentIndex + 1;
    }

    return currentIndex;
  };

  const incrementIndex = () => {
    currentIndex += 1;
  };

  const decrementIndex = () => {
    currentIndex -= 1;
  };

  const getState = () => {
    return stateHistory[currentIndex];
  };

  const getLastState = () => {
    return stateHistory[stateHistory.length - 1];
  };

  const pushState = (state: State) => {
    const lastState = getLastState();

    if (!equal(state, lastState)) {
      if (config.historyLen() === stateHistory.length) {
        stateHistory.shift();
        if (currentIndex !== 0) {
          decrementIndex();
        }
      }

      stateHistory.push(state);
      return true;
    }

    return false;
  };

  const setNextState = () => {
    if (getNextIndex() > currentIndex) {
      incrementIndex();
    } else {
      const state = getState();
      const nextState = restate(state);
      const isPushed = pushState(nextState);

      if (isPushed) {
        incrementIndex();
      }
    }
  };

  const setPrevState = () => {
    if (getPrevIndex() < currentIndex) {
      decrementIndex();
    }
  };

  const loopRestate = () => {
    if (active) {
      setNextState();
    }

    return getState();
  };

  return {
    prev: () => {
      setPrevState();
    },
    next: () => {
      setNextState();
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

export const engine = (restateMap: RestateMap, rerenderMap: RerenderMap, state: State) => {
  const rerender = (root: State) => {
    const iter = (iterState: State) => {
      const iterRerender = rerenderMap[iterState.type];
      iterRerender.paint(iterState);
      iterState.childrens.forEach(iter);
      iterRerender.unpaint(iterState);
    };

    iter(root);
  };

  const restate = (value: State) => {
    const root = clone(value);

    const iter = (iterState: State) => {
      const iterRestate = restateMap[iterState.type];
      const nextState = iterRestate.pipe(iterState);
      const nextChildrens = iterState.childrens.map(iter);
      nextState && (nextState.childrens = nextChildrens);
      return nextState;
    };

    return iter(root);
  };

  return createCycle(rerender, restate, state);
};
