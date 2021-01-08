import {AComponent, ElementCreator, named} from '../core';
import {GoingUnit} from './components/units';

@named
export class Mesh extends AComponent {
  public render = () => {
    return new ElementCreator(
      this.name,
      [new GoingUnit(this.bus).render(), new GoingUnit(this.bus).render()],
      {
        paint: () => {
          const paint = this.bus.getPaint('mesh');
          paint.draw({x: 0, y: 0}, {x: 400, y: 400}, 50);
        },
        unpaint: () => {},
      },
    );
  };
}
