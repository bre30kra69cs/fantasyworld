import {Platform, APlatform, Canvas, ACanvas} from '../platform';
import {Bus, ABus, AComponent} from './bus';

interface ComponentRoot {
  new (bud: ABus): AComponent;
}

export abstract class AMediator {
  protected canvas: ACanvas;
  protected platform: APlatform;
  protected bus: ABus;

  constructor(Tree: ComponentRoot) {
    this.canvas = new Canvas();
    this.bus = new Bus(this.canvas);
    const componentRoot = new Tree(this.bus);
    const elementRoot = componentRoot.render();
    this.platform = new Platform(elementRoot, this.canvas);
  }

  public abstract run(): void;
}

export class Mediator extends AMediator {
  public run = () => {
    this.platform.run();
  };
}
