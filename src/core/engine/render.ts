import {ARender, AElement} from './loop';
import {Config} from '../config';
import {Logger} from '../logger';

export class Render extends ARender {
  private iter = (element: AElement) => {
    if (Config.engineLogging()) {
      Logger.engine(element.getName(), 'prepaint');
    }

    element.prepaint();

    if (Config.engineLogging()) {
      Logger.engine(element.getName(), 'paint');
    }

    element.paint();
    element.getChildrens().forEach(this.iter);

    if (Config.engineLogging()) {
      Logger.engine(element.getName(), 'unpaint');
    }

    element.unpaint();
  };

  public run = () => {
    this.iter(this.root);
  };
}
