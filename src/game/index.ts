import {createModel, createState, framework} from '../framework';
import {createMeshPaint} from '../framework/paints/mesh';

const mesh = createModel((canvas) => ({
  state: createState({type: 'mesh'}),
  paint: () => {
    const meshPaint = createMeshPaint(canvas);
    meshPaint({x: 0, y: 0}, {x: 100, y: 100}, 25);
  },
}));

export const game = () => {
  const engine = framework('root', mesh);
  engine.run();
};
