import {Loop, AElement, ALoop, ARender} from './loop';
import {Render} from './render';

export abstract class AEngine {
  protected loop: ALoop;
  protected render: ARender;

  constructor(root: AElement) {
    this.render = new Render(root);
    this.loop = new Loop(this.render);
  }

  public abstract run(): void;
}

export class Engine extends AEngine {
  public run = () => {
    this.loop.run();
  };
}
