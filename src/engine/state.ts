import {config} from '../config';
import {equal} from '../utils';

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

export type StateManager = {
  nextState(): void;
  prevState(): void;
  getState(): State;
};

export const createStateManager = (restate: Restate, state: State): StateManager => {
  const stateHistory = [state];
  let index = 0;

  const decrementIndex = () => {
    index -= 1;
  };

  const incrementIndex = () => {
    index += 1;
  };

  const lastIndex = () => {
    return stateHistory.length - 1;
  };

  const nextIndex = () => {
    if (lastIndex() > index) {
      incrementIndex();
    }
  };

  const prevIndex = () => {
    if (index > 0) {
      decrementIndex();
    }
  };

  const getState = () => {
    return stateHistory[index];
  };

  const getLastState = () => {
    return stateHistory[lastIndex()];
  };

  const shiftState = () => {
    stateHistory.shift();
    prevIndex();
  };

  const pushState = (nextState: State) => {
    const lastState = getLastState();

    if (!equal(nextState, lastState)) {
      if (config.historyLen() === stateHistory.length) {
        shiftState();
      }

      stateHistory.push(nextState);
      return true;
    }

    return false;
  };

  const prevState = () => {
    prevIndex();
  };

  const nextState = () => {
    if (lastIndex() > index) {
      nextIndex();
    } else if (lastIndex() === index) {
      const currentState = getState();
      const nextState = restate(currentState);
      const isPushed = pushState(nextState);

      if (isPushed) {
        incrementIndex();
      }
    } else {
      throw new Error(`[Engine] state index ${index} overflow`);
    }
  };

  return {
    nextState,
    prevState,
    getState,
  };
};
