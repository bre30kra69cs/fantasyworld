import {Config} from '../../config';
import {Counter} from './couter';
import {Logger} from '../../logger';

export abstract class AElement {
  protected childrens: AElement[];
  protected name: string;

  constructor(name: string, childrens: AElement[]) {
    this.childrens = childrens;
    this.name = name;
  }

  public getName = () => this.name;

  public getChildrens = () => this.childrens;

  public prepaint = () => {};

  public paint = () => {};

  public unpaint = () => {};
}

export abstract class ARender {
  protected root: AElement;

  constructor(root: AElement) {
    this.root = root;
  }

  public abstract run(): void;
}

export abstract class ALoop {
  protected render: ARender;

  constructor(render: ARender) {
    this.render = render;
  }

  public abstract run(): void;
}

export class Loop extends ALoop {
  private counter = new Counter(Config.loopCount());

  private iter = () => {
    if (Config.loopFinite() && this.counter.isMaxed()) {
      return;
    }

    if (Config.loopLogging()) {
      Logger.loop(this.counter.getCount());
    }

    this.render.run();
    this.counter.increment();
    window.requestAnimationFrame(this.iter);
  };

  public run = () => {
    window.requestAnimationFrame(this.iter);
  };
}
