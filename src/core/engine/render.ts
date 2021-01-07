import {ARender, AElement} from './loop';

export class Render extends ARender {
  private iter = (element: AElement) => {
    element.prepaint();
    element.paint();
    element.getChildrens().forEach(this.iter);
    element.unpaint();
  };

  public run = () => {
    this.iter(this.root);
  };
}
