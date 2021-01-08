import {AComponent, ElementCreator, ABus} from '../../core';

export class BaseUnit extends AComponent {
  constructor(bus: ABus) {
    super(bus);
    bus.setComponent(this);
  }

  public render = () => {
    return new ElementCreator(this.name, [], {
      paint: () => {
        const paint = this.bus.getPaint('circle');
        paint.draw({x: 0, y: 0}, 25, 'red');
      },
    });
  };
}
