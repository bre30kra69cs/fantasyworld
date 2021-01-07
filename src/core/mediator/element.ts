import {AElement} from '../engine';

interface Actions {
  prepaint?: () => void;
  paint?: () => void;
  unpaint?: () => void;
}

const noop = () => {};

export class ElementCreator extends AElement {
  private actions: Actions = {
    prepaint: noop,
    paint: noop,
    unpaint: noop,
  };

  constructor(name: string, childrens: AElement[], actions?: Actions) {
    super(name, childrens);
    this.actions = {...this.actions, ...(actions ?? {})};
  }

  public prepaint = () => {
    this.actions.prepaint();
  };

  public paint = () => {
    this.actions.paint();
  };

  public unpaint = () => {
    this.actions.unpaint();
  };
}
