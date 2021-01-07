import {AElement} from '../engine';
import {ACanvas} from '../platform';
import {PaintsMap, LinePaint, MeshPaint} from './paints';

export abstract class AComponent {
  protected bus: ABus;

  constructor(bus: ABus) {
    this.bus = bus;
  }

  public abstract getName(): string;

  public abstract render(): AElement;
}

export abstract class ABus {
  protected canvas: ACanvas;

  constructor(canvas: ACanvas) {
    this.canvas = canvas;
  }

  public getCanvas = () => this.canvas;

  public abstract setComponent(component: AComponent): void;

  public abstract getComponent(name: string): AComponent | undefined;

  public abstract getPaint<T extends keyof PaintsMap>(name: T): PaintsMap[T];
}

export class Bus extends ABus {
  private components: Record<string, AComponent> = {};
  private paints: PaintsMap = {
    line: new LinePaint(this.canvas),
    mesh: new MeshPaint(this.canvas),
  };

  public setComponent = (component: AComponent) => {
    const name = component.getName();
    this.components[name] = component;
  };

  public getComponent = (name: string) => {
    const component = this.components[name];
    return component;
  };

  public getPaint = <T extends keyof PaintsMap>(name: T) => {
    const paint = this.paints[name];
    return paint;
  };
}
