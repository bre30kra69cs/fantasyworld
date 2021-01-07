export abstract class AElement {
  protected childrens: AElement[] = [];

  constructor(childrens: AElement[]) {
    this.childrens = childrens;
  }

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
  constructor(render: ARender) {
    super(render);
  }

  private iter = () => {
    this.render.run();
    window.requestAnimationFrame(this.iter);
  };

  public run = () => {
    window.requestAnimationFrame(this.iter);
  };
}
