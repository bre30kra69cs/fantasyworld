import {Runner} from '../platform/runner';
import {Persona} from '../scenes/persona';

const SCALE_BASE = 50;

export const main = () => {
  const runner = new Runner({
    scaleBase: SCALE_BASE,
  });

  const scene = new Persona({
    scaleBase: SCALE_BASE,
  });

  runner.setScene(scene);
  runner.run();
};
