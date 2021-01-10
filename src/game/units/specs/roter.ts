import {createSpec} from '../utils';
import {State} from '../../../engine';

const normalizeAngle = (angle: number) => {
  return angle < 0 ? 360 + angle : angle;
};

const selectDirection = (from: number, to: number) => {
  return to - from > 0 ? 'right' : 'left';
};

export const roter = createSpec(() => {
  let _speed = 0;

  return {
    setSpeed: (speed: number) => {
      _speed = speed;
    },
    rotate: (state: State, angle: number) => {
      if (state.angle === angle) {
        return;
      }

      const normalAngle = normalizeAngle(angle);
      const normalStateAngle = normalizeAngle(state.angle);

      if (Math.abs(normalAngle - normalStateAngle) < _speed) {
        state.angle = angle;
      }

      const direaction = selectDirection(normalStateAngle, normalAngle);

      if (direaction === 'left') {
        state.angle -= _speed;
      }

      if (direaction === 'right') {
        state.angle += _speed;
      }
    },
  };
});
