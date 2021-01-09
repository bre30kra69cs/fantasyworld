import {Element, Resteter, Render} from '../../core';

export type ElementCreator = () => Element;

export type ResteterCreator = () => Resteter;

export type RenderCreator = () => Render;

export interface Unit {
  element: Element;
  resteter?: Resteter;
  render?: Render;
}
