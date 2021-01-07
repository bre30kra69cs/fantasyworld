import {AElement} from '../engine';
import {ACanvas} from '../platform';

export abstract class AComponent {
  protected bus: ABus;

  constructor(bus: ABus) {
    this.bus = bus;
    this.bus.setComponent(this);
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
}

export class Bus extends ABus {
  private components: Record<string, AComponent> = {};

  public setComponent = (component: AComponent) => {
    const name = component.getName();
    this.components[name] = component;
  };

  public getComponent = (name: string) => {
    const component = this.components[name];
    return component;
  };
}
