import {Shape} from '../engine';
import {Canvas} from '../platform';

export type Paint<T> = (canvas: Canvas, props: T) => void;

export type ShapeCreator<T> = (canvas: Canvas, props: T) => Shape;
