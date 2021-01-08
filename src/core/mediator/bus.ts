import {AElement} from '../engine';
import {ACanvas} from '../platform';
import {PaintsMap, LinePaint, MeshPaint, CirclePaint} from './paints';

export interface ComponentRoot {
  new (bud: ABus): AComponent;
}

export abstract class AComponent {
  protected bus: ABus;
  protected name: string;

  constructor(bus: ABus, name?: string) {
    this.bus = bus;
    this.name = name;
    bus.setComponent(this);
  }

  public getName = () => this.name;

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
    circle: new CirclePaint(this.canvas),
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
