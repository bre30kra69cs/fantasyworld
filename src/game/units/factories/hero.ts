import {createUnitFactory} from '../utils';
import {roter} from '../specs/roter';
import {mover} from '../specs/mover';

export const heroFactory = createUnitFactory({
  roter,
  mover,
});
