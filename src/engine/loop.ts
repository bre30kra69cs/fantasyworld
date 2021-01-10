import {State} from './state';

export type Rerender = (state: State) => void;

type LoopRestate = () => State;

export const loop = (rerender: Rerender, restate: LoopRestate) => {
  const iter = () => {
    const state = restate();
    rerender(state);
    window.requestAnimationFrame(iter);
  };

  window.requestAnimationFrame(iter);
};
