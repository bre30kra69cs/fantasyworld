import {engine, createShape, Shape} from '../engine';
import {ShapeCreator} from '../types';

export type Point = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

type Camera = {
  coords(): Point;
};

const createCamera = (): Camera => {
  let x = 0;
  let y = 0;
  const speed = 25;

  const coords = () => ({x, y});

  window.addEventListener('keydown', ({key}) => {
    switch (key) {
      case 'ArrowDown':
        y -= speed;
        break;
      case 'ArrowUp':
        y += speed;
        break;
      case 'ArrowLeft':
        x += speed;
        break;
      case 'ArrowRight':
        x -= speed;
        break;
    }
  });

  return {
    coords,
  };
};

export type Canvas = {
  origin: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  getSize(): Size;
};

const createCanvas = (): Canvas => {
  const origin = document.getElementById('root') as HTMLCanvasElement;
  const context = origin.getContext('2d');
  let width = 0;
  let height = 0;

  const setSize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    origin.width = window.innerWidth;
    origin.height = window.innerHeight;
  };

  const getSize = () => ({width, height});

  window.addEventListener('resize', setSize);

  setSize();

  return {origin, context, getSize};
};

const createGroundShape: ShapeCreator<void> = (canvas) =>
  createShape({
    type: 'ground',
    paint: () => {
      const size = canvas.getSize();
      canvas.context.globalCompositeOperation = 'destination-over';
      canvas.context.clearRect(0, 0, size.width, size.height);
    },
    unpaint: () => {},
  });

const createCameraShape: ShapeCreator<Camera> = (canvas, camera) =>
  createShape({
    type: 'camera',
    paint: () => {
      const coords = camera.coords();
      canvas.context.save();
      canvas.context.translate(coords.x, coords.y);
    },
    unpaint: () => {
      canvas.context.restore();
    },
  });

export type Scene = (canvas: Canvas) => Shape;

export const platform = (scene: Scene) => {
  const canvas = createCanvas();
  const camera = createCamera();
  const cameraShape = createCameraShape(canvas, camera);
  const ground = createGroundShape(canvas);
  const shape = scene(canvas);
  cameraShape.push(shape);
  ground.push(cameraShape);
  engine(ground);
};
