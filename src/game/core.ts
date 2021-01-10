import {createMeshPaint, createModel, createState, framework} from '../framework';
import {man} from './units/basics/man';

const mesh = createModel((canvas) => ({
  state: createState({type: 'mesh'}),
  childrens: [man],
  paint: () => {
    const meshPaint = createMeshPaint(canvas);
    meshPaint({
      from: {x: -1000, y: -1000},
      to: {x: 1000, y: 1000},
      gap: 20,
    });
  },
}));

export const game = () => {
  const cycle = framework('root', mesh);
  cycle.run();
};
