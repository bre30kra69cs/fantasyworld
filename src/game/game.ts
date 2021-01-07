import {Mediator, AMediator} from '../core';
import {Mesh} from './mesh';

export abstract class AGame {
  protected medidator: AMediator;

  constructor() {
    this.medidator = new Mediator(Mesh);
  }

  public abstract run(): void;
}

export class Game extends AGame {
  public run = () => {
    this.medidator.run();
  };
}
