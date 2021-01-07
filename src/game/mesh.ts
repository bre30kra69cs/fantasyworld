import {AComponent, ElementCreator, ABus} from '../core';

export class Mesh extends AComponent {
  private name: string;

  constructor(bus: ABus) {
    super(bus);
    this.name = 'mesh';
    bus.setComponent(this);
  }

  public getName = () => this.name;

  public render = () => {
    return new ElementCreator('mesh', [], {
      paint: () => {
        const paint = this.bus.getPaint('mesh');
        paint.draw({x: 0, y: 0}, {x: 1000, y: 1000}, 50);
      },
    });
  };
}
