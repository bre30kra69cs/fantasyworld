import {createSpec} from '../utils';
import {State, Point} from '../../../engine';

const sin = (from: Point, to: Point) => {
  const xlen = Math.abs(to.x - from.x);
  const ylen = Math.abs(to.y - from.y);
  const zlen = Math.pow(Math.pow(xlen, 2) + Math.pow(ylen, 2), 1 / 2);
  return ylen / zlen;
};

const cos = (from: Point, to: Point) => {
  const xlen = Math.abs(to.x - from.x);
  const ylen = Math.abs(to.y - from.y);
  const zlen = Math.pow(Math.pow(xlen, 2) + Math.pow(ylen, 2), 1 / 2);
  return xlen / zlen;
};

export const mover = createSpec(() => {
  let _speed = 0;

  return {
    setSpeed: (speed: number) => {
      _speed = speed;
    },
    move: (state: State, point: Point) => {
      const statePoint = state.point;

      if (statePoint.x === point.x && statePoint.y === point.y) {
        return;
      }

      if (Math.abs(statePoint.x - point.x) < _speed) {
        statePoint.x = point.x;
      }

      if (Math.abs(statePoint.y - point.y) < _speed) {
        statePoint.y = point.y;
      }

      if (statePoint.x !== point.x) {
        const sign = Math.sign(point.x - statePoint.x);
        const xspeed = sign * cos(statePoint, point) * _speed;
        state.point.x += xspeed;
      }

      if (statePoint.y !== point.y) {
        const sign = Math.sign(point.y - statePoint.y);
        const yspeed = sign * sin(statePoint, point) * _speed;
        state.point.y += yspeed;
      }
    },
  };
});
