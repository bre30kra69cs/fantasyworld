import {AComponent, ABus, ElementCreator} from '../../../core';

type Task = () => Task | void;

export abstract class AManager {
  public abstract push(task: Task): void;

  public abstract pushConst(task: Task): void;

  public abstract clean(): void;

  public abstract runPaints(): void;

  public abstract runUnpaints(): void;
}

export class Manager extends AManager {
  private constPaintTasks: Task[] = [];
  private paintTasks: Task[] = [];
  private unpaintTasks: Task[] = [];

  public push = (task: Task) => {
    this.paintTasks.push(task);
  };

  public pushConst = (task: Task) => {
    this.constPaintTasks.push(task);
  };

  public clean = () => {
    this.paintTasks = [];
    this.unpaintTasks = [];
  };

  public runPaints = () => {
    const constUnpaintTasks = this.constPaintTasks
      .map((task) => task())
      .filter((task) => !!task) as Task[];
    const unpaintTasks = this.paintTasks.map((task) => task()).filter((task) => !!task) as Task[];
    this.unpaintTasks = [...unpaintTasks, ...constUnpaintTasks];
  };

  public runUnpaints = () => {
    this.unpaintTasks.forEach((task) => task());
  };
}

export abstract class AManagedComponent extends AComponent {
  protected manager: AManager;

  constructor(bus: ABus, name?: string) {
    super(bus, name);
    this.manager = new Manager();
  }

  protected actions = () => {};

  protected body = () => {};

  protected getChildrens = () => [];

  public render = () => {
    return new ElementCreator(this.name, this.getChildrens(), {
      prepaint: () => {
        this.actions();
        this.manager.push(this.body);
      },
      paint: () => {
        this.manager.runPaints();
      },
      unpaint: () => {
        this.manager.runUnpaints();
        this.manager.clean();
      },
    });
  };
}
