import {createModel, createState, framework} from '../framework';
import {createLinePaint} from '../framework/paints/line';

const mesh = createModel((canvas) => ({
  state: createState({type: 'mesh'}),
  paint: () => {
    const linePaint = createLinePaint(canvas);
    linePaint({x: 0, y: 0}, {x: 100, y: 100});
  },
}));

export const game = () => {
  const cycle = framework('root', mesh);
  cycle.run();
};
