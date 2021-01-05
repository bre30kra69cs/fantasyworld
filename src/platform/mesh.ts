import {IUnit} from '../engine/engine';
import {ICanvas} from '../engine/canvas';
import {Utils} from '../utils';
import {SCALE_BASE} from '../consts';

interface MeshConfig {
  width: number;
  height: number;
  gap: number;
}

const DEFAULT_MESH_CONFIG: MeshConfig = {
  width: 400,
  height: 400,
  gap: SCALE_BASE,
};

export class Mesh extends Utils implements IUnit {
  private config: MeshConfig;

  constructor(config?: Partial<MeshConfig>) {
    super();

    const baseConfig = this.mergeConfig(DEFAULT_MESH_CONFIG, config);

    this.config = baseConfig;
  }

  public think = () => {
    return new Mesh();
  };

  public paint = (canvas: ICanvas) => {
    const {width, height, gap} = this.config;
    canvas.drawMesh(0, 0, width, height, gap);
  };
}
