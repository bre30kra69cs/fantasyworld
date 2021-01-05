import {IUnit} from '../engine/engine';
import {ICanvas} from '../engine/canvas';
import {Utils} from '../utils';
import {SCALE_BASE} from '../consts';

export type IActiveUnit = IUnit & {
  rotate(deg: number): void;
};

interface ActiveUnitConfig {
  scaleBase: number;
  isFace: boolean;
  faceDeg: number;
  targetDeg: number;
  rotateSpeed: number;
}

const DEFAULT_ACTIVE_UNIT_CONFIG: ActiveUnitConfig = {
  scaleBase: SCALE_BASE,
  isFace: true,
  faceDeg: 0,
  targetDeg: 40,
  rotateSpeed: 0.1,
};

export class ActiveUnit extends Utils implements IActiveUnit {
  private config: ActiveUnitConfig;

  constructor(config?: Partial<ActiveUnitConfig>) {
    super();

    const baseConfig = this.mergeConfig(DEFAULT_ACTIVE_UNIT_CONFIG, config);

    this.config = baseConfig;
  }

  public think = () => {
    return new ActiveUnit(this.config);
  };

  public paint = (canvas: ICanvas) => {
    if (this.config.faceDeg <= this.config.targetDeg) {
      canvas.rotate(this.config.faceDeg);
      this.config.faceDeg += this.config.rotateSpeed;
    }

    if (this.config.isFace) {
      canvas.drawLine(0, 0, 100, this.config.scaleBase / 2, 'black');
    }

    canvas.drawCircle(0, 0, this.config.scaleBase / 2, 'red');
  };

  public rotate = () => {};
}
