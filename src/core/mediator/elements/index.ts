import {lineElementFactory} from './line';

export interface EllementsMap {
  line: ReturnType<typeof lineElementFactory>;
}

export {lineElementFactory};
