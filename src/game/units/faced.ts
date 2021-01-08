import {AComponent, ElementCreator, ABus} from '../../core';

export class FacedUnit extends AComponent {
  constructor(bus: ABus) {
    super(bus);
    bus.setComponent(this);
  }

  public render = () => {
    return new ElementCreator(this.name, [], {
      paint: () => {
        const circle = this.bus.getPaint('circle');
        circle.draw({x: 0, y: 0}, 25, 'red');

        const line = this.bus.getPaint('line');
        line.draw({x: 0, y: 0}, {x: 0, y: 25}, 'yellow');
      },
    });
  };
}
