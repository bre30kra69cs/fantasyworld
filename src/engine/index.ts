import {clone, equal} from '../utils';
import {config} from '../config';

export type Cycle = {
  prev(): void;
  next(): void;
  start(): void;
  stop(): void;
  run(): void;
  setRestate(restate: Restate): void;
  setRerender(rerender: Rerender): void;
  setState(state: State): void;
};

export type Engine = Omit<Cycle, 'setRestate' | 'setRerender'> & {
  setRestate(restateMap: RestateMap): void;
  setRerender(rerenderMap: RerenderMap): void;
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

const createCycle = (): Cycle => {
  let rerender: Rerender;
  let restate: Restate;
  let active = true;
  let runned = false;
  const stateHistory = [];
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
      if (runned) {
        throw new Error('[Engine] cycle already runned');
      }

      if (!rerender) {
        throw new Error('[Engine] run cycle without rerender');
      }

      if (!restate) {
        throw new Error('[Engine] run cycle without restate');
      }

      if (stateHistory.length === 0) {
        throw new Error('[Engine] run cycle without state');
      }

      runned = true;
      loop(rerender, loopRestate);
    },
    setRestate: (value: Restate) => {
      if (runned) {
        throw new Error('[Engine] set cycle restate after init');
      }

      restate = value;
    },
    setRerender: (value: Rerender) => {
      if (runned) {
        throw new Error('[Engine] set cycle rerender after init');
      }

      rerender = value;
    },
    setState: (value: State) => {
      if (runned) {
        throw new Error('[Engine] set cycle state after init');
      }

      stateHistory.push(value);
    },
  };
};

export const createEngine = (): Engine => {
  const cycle = createCycle();

  return {
    ...cycle,
    setRestate: (restateMap: RestateMap) => {
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

      cycle.setRestate(restate);
    },
    setRerender: (rerenderMap: RerenderMap) => {
      const rerender = (root: State) => {
        const iter = (iterState: State) => {
          const iterRerender = rerenderMap[iterState.type];
          iterRerender.paint(iterState);
          iterState.childrens.forEach(iter);
          iterRerender.unpaint(iterState);
        };

        iter(root);
      };

      cycle.setRerender(rerender);
    },
  };
};
