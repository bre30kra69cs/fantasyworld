import {runScene, Scene, Canvas, CanvasContainer} from '../../core';
import {cleanerUnit} from '../units/cleaner';
import {cameraUnit} from '../units/camera';
import {meshUnit} from '../units/mesh';
import {Unit} from '../types';

const createCanvas = (id: string): Canvas => {
  const canvas = document.getElementById(id) as CanvasContainer;
  const context = canvas.getContext('2d');

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resize);

  resize();

  return {
    getCanvas: () => {
      return canvas;
    },
    getContext: () => {
      return context;
    },
    getSize: () => {
      return {
        w: canvas.width,
        h: canvas.height,
      };
    },
  };
};

const createConfig = <T>(defaultConfig: T, userConfig?: Partial<T>) => {
  return {...defaultConfig, ...(userConfig || {})};
};

export const pushUnitToScene = (scene: Scene, unit: Unit): Scene => {
  if (scene.elements.some((element) => element.id === unit.element.id)) {
    throw new Error(`Unit with this id alredy exist: ${unit.element.id}`);
  }

  return {
    elements: [unit.element, ...scene.elements],
    restater: (element) => {
      switch (element.id) {
        case unit.element.id:
          return unit.resteter && unit.resteter(element);
        default:
          return scene.restater(element);
      }
    },
    render: (props) => {
      switch (props.element.id) {
        case unit.element.id:
          return unit.render && unit.render(props);
        default:
          return scene.render(props);
      }
    },
  };
};

const pushUnitsToScene = (scene: Scene, units: Unit[]) => {
  return units.reduce((acc, unit) => pushUnitToScene(acc, unit), scene);
};

interface GameConfig {
  mode: 'dev' | 'prod';
}

const CONFIG: GameConfig = {
  mode: 'dev',
};

interface Game {
  run(): void;
}

export const createGame = (id: string, scene: Scene, userConfig?: Partial<GameConfig>): Game => {
  const config = createConfig(CONFIG, userConfig);
  const canvas = createCanvas(id);

  const nextScene =
    config.mode === 'dev'
      ? pushUnitsToScene(scene, [cleanerUnit, cameraUnit, meshUnit])
      : pushUnitsToScene(scene, [cleanerUnit, cameraUnit]);

  return {
    run: () => {
      runScene(canvas, nextScene);
    },
  };
};
