import {Size} from './types';

export abstract class ACanvas {
  public abstract getCanvas(): HTMLCanvasElement;

  public abstract getContext(): CanvasRenderingContext2D;

  public abstract getSize(): Size;

  public abstract setSize(size: Size): void;
}

export class Canvas extends ACanvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() {
    super();
    this.canvas = document.getElementById('root') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
  }

  public getCanvas = () => this.canvas;

  public getContext = () => this.context;

  public getSize = (): Size => ({
    w: this.canvas.width,
    h: this.canvas.height,
  });

  public setSize = (size: Size) => {
    this.canvas.width = size.w;
    this.canvas.height = size.h;
  };
}
