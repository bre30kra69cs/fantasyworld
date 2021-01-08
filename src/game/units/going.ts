import {AComponent, ElementCreator, named} from '../../core';

type Task = () => void;

@named
export class GoingUnit extends AComponent {
  private paintTasts: Task[] = [];
  private unpaintTasts: Task[] = [];
  private speed = 1;
  private point = {
    x: 0,
    y: 0,
  };
  private targetPoint = {
    x: 200,
    y: 200,
  };

  private go = () => {
    const ctx = this.bus.getCanvas().getContext();
    ctx.save();
    ctx.translate(this.point.x, this.point.y);

    this.unpaintTasts.push(() => ctx.restore());
  };

  private paintBody = () => {
    const circle = this.bus.getPaint('circle');
    circle.draw({x: 0, y: 0}, 25, 'red');
  };

  public render = () => {
    return new ElementCreator(
      this.name,
      [
        new ElementCreator('line', [], {
          paint: () => {
            const line = this.bus.getPaint('line');
            line.draw({x: 0, y: 0}, {x: 0, y: 25}, 'yellow');
          },
        }),
      ],
      {
        prepaint: () => {
          if (this.point.x < this.targetPoint.x && this.point.y < this.targetPoint.y) {
            this.point.x += this.speed;
            this.point.y += this.speed;
          }

          this.paintTasts.push(this.go);
          this.paintTasts.push(this.paintBody);
        },
        paint: () => {
          this.paintTasts.forEach((task) => task());
          this.paintTasts = [];
        },
        unpaint: () => {
          this.unpaintTasts.forEach((task) => task());
          this.unpaintTasts = [];
        },
      },
    );
  };
}
