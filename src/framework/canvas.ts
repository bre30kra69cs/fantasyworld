import {Canvas, CanvasContainer} from './types';

export const createCanvas = (id: string): Canvas => {
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
