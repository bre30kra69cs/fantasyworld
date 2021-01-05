import {IUnit, IUnitStorage} from '../engine/engine';
import {ICanvas} from '../engine/canvas';
import {ICamera} from './camera';

export class Base implements IUnit, IUnitStorage {
  private camera: ICamera;
  private units: IUnit[];

  constructor(camera: ICamera, units: IUnit[] = []) {
    this.camera = camera;
    this.units = units;
  }

  public push = (unit: IUnit) => {
    this.units.push(unit);
  };

  private thinks = () => {
    const nextUnits = [];

    for (const unit of this.units) {
      const nextUnit = unit.think(this.units);
      nextUnits.push(nextUnit);
    }

    this.units = nextUnits;
  };

  private paints = (canvas: ICanvas) => {
    for (const unit of this.units) {
      canvas.save();
      unit.paint(canvas);
      canvas.restore();
    }
  };

  public think = () => {
    this.thinks();
    return new Base(this.camera, this.units);
  };

  public paint = (canvas: ICanvas) => {
    const {x, y} = this.camera.getCoords();
    canvas.translate(x, y);

    this.paints(canvas);
  };
}
