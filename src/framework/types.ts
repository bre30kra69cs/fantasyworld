import {State, Rerender, Restate, Point} from '../engine';

export type FindProps = {
  id?: string;
  type?: string;
};

export type Meadiator = {
  setState(state: State): void;
  getState(findProps: FindProps): State | undefined;
  toCanvasPoint(point: Point): Point;
};

export type Model = (
  canvas: Canvas,
  mediator: Meadiator,
) => {
  state: State;
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
