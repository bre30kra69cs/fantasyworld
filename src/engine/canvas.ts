export interface ICanvas {
  save(): void;
  restore(): void;
  getContext(): CanvasRenderingContext2D;
  drawLine(x1: number, y1: number, x2: number, y2: number): void;
  drawMesh(x1: number, y1: number, x2: number, y2: number, gap: number): void;
  translate(x: number, y: number): void;
}

interface CanvasConfig {
  id: string;
}

const DEFAULT_CANVAS_CONFIG: CanvasConfig = {
  id: 'root',
};

export class Canvas<T extends CanvasConfig> implements ICanvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(config?: Partial<T>) {
    const baseConfig = {...DEFAULT_CANVAS_CONFIG, ...(config ?? {})};
    const {id} = baseConfig;

    this.canvas = this.initCanvas(id);
    this.context = this.initContext();

    this.changeSize();
    this.listenSize();
  }

  private initCanvas = (id: string) => {
    return document.getElementById(id) as HTMLCanvasElement;
  };

  private initContext = () => {
    return this.getCnavas().getContext('2d') as CanvasRenderingContext2D;
  };

  private getCnavas = () => {
    return this.canvas;
  };

  private changeSize = () => {
    this.getCnavas().width = window.innerWidth;
    this.getCnavas().height = window.innerHeight;
  };

  private listenSize = () => {
    window.addEventListener('resize', this.changeSize);
  };

  public getContext = () => {
    return this.context;
  };

  public save = () => {
    this.getContext().save();
  };

  public restore = () => {
    this.getContext().restore();
  };

  public drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    const ctx = this.getContext();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };

  public drawMesh = (x1: number, y1: number, x2: number, y2: number, gap: number) => {
    for (let x = x1; x <= x2; x += gap) {
      this.drawLine(x, y1, x, y2);
    }

    for (let y = y1; y <= y2; y += gap) {
      this.drawLine(x1, y, x2, y);
    }
  };

  public translate = (x: number, y: number) => {
    const ctx = this.getContext();

    ctx.translate(x, y);
  };
}
