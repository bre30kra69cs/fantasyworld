import {IUnit} from '../engine/engine';
import {ICanvas} from '../engine/canvas';

export class Mesh implements IUnit {
  public think = () => {
    return new Mesh();
  };

  public paint = (canvas: ICanvas) => {
    canvas.drawMesh(0, 0, 200, 200, 50);
  };
}
