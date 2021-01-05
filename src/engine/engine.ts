import {ICanvas} from './canvas';

export interface IUnit {
  think(units: IUnit[]): IUnit;
  paint(canvas: ICanvas): void;
}

export interface IUnitStorage {
  push(unit: IUnit): void;
}

export type IEngine = IUnitStorage & {
  render(): void;
};

export class Engine implements IEngine {
  private units: IUnit[] = [];
  private canvas: ICanvas;

  constructor(canvas: ICanvas) {
    this.canvas = canvas;
  }

  private getCanvas = () => {
    return this.canvas;
  };

  private setUnits = (units: IUnit[]) => {
    this.units = units;
  };

  private getUnits = () => {
    return this.units;
  };

  private thinks = () => {
    const currentUnits = this.getUnits();
    const nextUnits = [];

    for (const unit of currentUnits) {
      const nextUnit = unit.think(currentUnits);
      nextUnits.push(nextUnit);
    }

    this.setUnits(nextUnits);
  };

  private cleanCanvas = () => {
    const ctx = this.canvas.getContext();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };

  private paints = () => {
    const currentUnits = this.getUnits();
    const canvas = this.getCanvas();

    this.cleanCanvas();
    for (const unit of currentUnits) {
      canvas.save();
      unit.paint(canvas);
      canvas.restore();
    }
  };

  public push = (unit: IUnit) => {
    this.getUnits().push(unit);
  };

  public render = () => {
    this.thinks();
    this.paints();
  };
}
