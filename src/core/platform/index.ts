import {createCycle, createEngine, Platform, Cycle} from '../engine';

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export type CanvasContainer = HTMLCanvasElement;

export type CanvasContext = CanvasRenderingContext2D;

export interface Canvas {
  getCanvas(): CanvasContainer;
  getContext(): CanvasContext;
  getSize(): Size;
}

export interface Element {
  id: string;
  priority: number;
  type: string;
  point: Point;
  pointTo: Point;
  angle: number;
  angleTo: number;
}

export type Resteter = (element: Element) => void;

export interface RenderProps {
  cycle: Cycle;
  canvas: Canvas;
  element: Element;
}

export type Render = (props: RenderProps) => void;

const createPlatform = (
  canvas: Canvas,
  elements: Element[],
  resteter: Resteter,
  rerender: Render,
): Platform => {
  let cycle: Cycle;

  return {
    init: (initCycle) => {
      cycle = initCycle;
    },
    restate: () => {
      elements.forEach((element) => {
        resteter(element);
      });
    },
    render: () => {
      elements.forEach((element) => {
        rerender({
          element,
          canvas,
          cycle,
        });
      });
    },
  };
};

export interface Scene {
  elements: Element[];
  restater: Resteter;
  render: Render;
}

export const runScene = (canvas: Canvas, scene: Scene) => {
  const platform = createPlatform(canvas, scene.elements, scene.restater, scene.render);
  const engine = createEngine(platform);
  const cycle = createCycle(engine);
  platform.init(cycle);
  cycle.run();
};
