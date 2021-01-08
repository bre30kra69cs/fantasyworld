import {named} from '../../../core';
import {AMovedComponent} from '../actioned';

@named
export class GoingUnit extends AMovedComponent {
  protected speed = 2;

  private path = [
    {
      isFinished: false,
      point: {x: 200, y: -100},
    },
    {
      isFinished: false,
      point: {x: 200, y: 100},
    },
  ];

  protected actions = () => {
    const to = this.path.find(({isFinished}) => !isFinished);

    if (to) {
      this.moveTo(to.point);
      const isFinished = this.isHere(to.point);
      to.isFinished = isFinished;
    }
  };

  protected body = () => {
    const circle = this.bus.getPaint('circle');
    circle.draw({x: 0, y: 0}, 25, 'red');
  };

  protected getChildrens = () => {
    return [
      this.bus.getElement('line')(
        {
          x: 0,
          y: 0,
        },
        {x: 0, y: 25},
        'yellow',
      ),
    ];
  };
}
