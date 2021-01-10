import {createEngine, Engine, State, RerenderMap, RestateMap, Rerender, Restate} from '../engine';
import {stateId, noop, tap} from '../utils';

type CanvasContainer = HTMLCanvasElement;

type CanvasContext = CanvasRenderingContext2D;

export type Size = {
  w: number;
  h: number;
};

export type Canvas = {
  getContainer(): CanvasContainer;
  getContext(): CanvasContext;
  getSize(): Size;
};

type ModelState = Omit<State, 'childrens'>;

type Model = (
  canvas: Canvas,
  engine: Engine,
) => {
  state: ModelState;
  childrens: Model[];
  pipe: Restate;
  paint: Rerender;
  unpaint: Rerender;
};

type ModelCreatorPprops = (canvas: Canvas, engine: Engine) => Partial<ReturnType<Model>>;

type ModelCreator = (props?: ModelCreatorPprops) => Model;

type ModelFactoryCreator = (props?: ModelCreatorPprops) => (childrens: Model[]) => Model;

export const createState = (customState?: Partial<State>): State => {
  return {
    id: stateId(),
    type: 'noop',
    point: {x: 0, y: 0},
    childrens: [],
    ...(customState ?? {}),
  };
};

const createModelParser = () => {
  let canvas: Canvas;
  let engine: Engine;

  return {
    setCanvas: (value: Canvas) => {
      canvas = value;
    },
    setEngine: (value: Engine) => {
      engine = value;
    },
    run: (root: Model) => {
      if (!canvas) {
        throw new Error('[Framework] run parser without canvas');
      }

      if (!engine) {
        throw new Error('[Framework] run parser without engine');
      }

      const rerenderMap: RerenderMap = {};
      const restateMap: RestateMap = {};

      const pushToRestateMap = (type: string, pipe?: Restate) => {
        if (!restateMap[type]) {
          restateMap[type] = {
            type,
            pipe,
          };
        }
      };

      const pushToRerenderMap = (type: string, paint?: Rerender, unpaint?: Rerender) => {
        if (!rerenderMap[type]) {
          rerenderMap[type] = {
            type,
            paint,
            unpaint,
          };
        }
      };

      const iter = (model: Model) => {
        const res = model(canvas, engine);
        const {pipe, paint, unpaint} = res;
        const modelChildrens = res.childrens;
        const modelState = res.state;
        const {type} = modelState;
        pushToRestateMap(type, pipe);
        pushToRerenderMap(type, paint, unpaint);
        const state = createState(modelState);
        const stateChildrens = modelChildrens.map(iter);
        state.childrens = stateChildrens;
        return state;
      };

      const state = iter(root);
      return {restateMap, rerenderMap, state};
    },
  };
};

export const createModel: ModelCreator = (model) => (canvas, engine) => ({
  state: createState(),
  childrens: [],
  pipe: tap,
  paint: noop,
  unpaint: noop,
  ...(model?.(canvas, engine) ?? {}),
});

export const createModelFactory: ModelFactoryCreator = (model) => (childrens = []) => (
  canvas,
  engine,
) => ({
  state: createState(),
  childrens,
  pipe: tap,
  paint: noop,
  unpaint: noop,
  ...(model?.(canvas, engine) ?? {}),
});

const createCanvas = (id: string): Canvas => {
  const container = document.getElementById(id) as CanvasContainer;
  const context = container.getContext('2d');

  const setSize = () => {
    container.width = window.innerWidth;
    container.height = window.innerHeight;
  };

  window.addEventListener('resize', setSize);

  setSize();

  return {
    getContainer: () => {
      return container;
    },
    getContext: () => {
      return context;
    },
    getSize: () => {
      return {
        w: container.width,
        h: container.height,
      };
    },
  };
};

const createCleaner = createModelFactory((canvas) => {
  return {
    state: createState({type: 'cleaner'}),
    paint: () => {
      const ctx = canvas.getContext();
      const size = canvas.getSize();
      ctx.clearRect(0, 0, size.w, size.h);
    },
  };
});

const createCamera = createModelFactory((canvas) => {
  const createPipe = (): Restate => {
    let x = 0;
    let y = 0;
    const speed = 25;

    window.addEventListener('keydown', ({key}) => {
      switch (key) {
        case 'ArrowDown':
          return (y -= speed);
        case 'ArrowUp':
          return (y += speed);
        case 'ArrowRight':
          return (x -= speed);
        case 'ArrowLeft':
          return (x += speed);
      }
    });

    return (state) => {
      return {
        ...state,
        point: {x, y},
      };
    };
  };

  return {
    state: createState({type: 'camera'}),
    pipe: createPipe(),
    paint: (state) => {
      const ctx = canvas.getContext();
      ctx.save();
      ctx.translate(state.point.x, state.point.y);
    },
    unpaint: () => {
      const ctx = canvas.getContext();
      ctx.restore();
    },
  };
});

export const framework = (id: string, model: Model) => {
  const canvas = createCanvas(id);
  const engine = createEngine();
  const parser = createModelParser();
  parser.setCanvas(canvas);
  parser.setEngine(engine);
  const camera = createCamera([model]);
  const cleaner = createCleaner([camera]);
  const {restateMap, rerenderMap, state} = parser.run(cleaner);
  engine.setState(state);
  engine.setRestate(restateMap);
  engine.setRerender(rerenderMap);
  return engine;
};
