import {createShape} from '../engine';
import {mesh, Props} from '../paints/mesh';
import {ShapeCreator} from '../types';

export const createMesh: ShapeCreator<Props> = (canvas, props) =>
  createShape({
    type: 'mesh',
    paint: () => {
      mesh(canvas, props);
    },
  });
