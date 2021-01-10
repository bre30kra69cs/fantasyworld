import {State, Rerender, Restate} from '../engine';

type ModelState = Omit<State, 'childrens'>;

export type Model = (
  canvas: Canvas,
) => {
  state: ModelState;
  childrens: Model[];
  pipe: Restate;
  paint: Rerender;
  unpaint: Rerender;
};

export type Size = {
  w: number;
  h: number;
};

export type CanvasContainer = HTMLCanvasElement;

export type CanvasContext = CanvasRenderingContext2D;

export type Canvas = {
  getContainer(): CanvasContainer;
  getContext(): CanvasContext;
  getSize(): Size;
};
