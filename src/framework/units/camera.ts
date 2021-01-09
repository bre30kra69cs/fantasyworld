import {createElement} from '../utils';
import {Unit, ResteterCreator} from '../types';

const createResteter: ResteterCreator = () => {
  const speed = 25;
  let x = 0;
  let y = 0;

  window.addEventListener('keydown', ({key}) => {
    switch (key) {
      case 'ArrowDown':
        return (y -= speed);
      case 'ArrowUp':
        return (y += speed);
      case 'ArrowLeft':
        return (x += speed);
      case 'ArrowRight':
        return (x -= speed);
    }
  });

  return (element) => {
    console.log(element);
    element.point.x = x;
    element.point.y = y;
  };
};

export const cameraUnit: Unit = {
  element: createElement({
    id: 'camera',
  }),
  resteter: createResteter(),
  render: ({canvas, element}) => {
    const ctx = canvas.getContext();
    ctx.translate(element.point.x, element.point.y);
  },
};
