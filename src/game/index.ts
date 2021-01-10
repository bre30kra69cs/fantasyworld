import {createMeshPaint, createModel, createState, framework} from '../framework';

const mesh = createModel((canvas) => ({
  state: createState({type: 'mesh'}),
  paint: () => {
    const meshPaint = createMeshPaint(canvas);
    meshPaint({x: -1000, y: -1000}, {x: 1000, y: 1000}, 25);
  },
}));

export const game = () => {
  const cycle = framework('root', mesh);
  cycle.run();
};
