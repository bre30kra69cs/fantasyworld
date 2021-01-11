import {createSpec} from '../utils';
import {State} from '../../../engine';

const normalizeAngle = (angle: number) => {
  const rounded = angle % 360;
  return rounded < 0 ? 360 + rounded : rounded;
};

const selectDirection = (from: number, to: number) => {
  const contr = normalizeAngle(from + 180);
  const type = from < contr ? 'start' : 'end';

  if (type === 'start') {
    return from <= to && to <= contr ? 'right' : 'left';
  }

  if (type === 'end') {
    return from >= to && to >= contr ? 'left' : 'right';
  }
};

export const roter = createSpec(() => {
  let _speed = 0;

  return {
    setSpeed: (speed: number) => {
      _speed = speed;
    },
    rotate: (state: State, angle: number) => {
      const normalAngle = normalizeAngle(angle);
      const normalStateAngle = normalizeAngle(state.angle);

      if (normalStateAngle === normalAngle) {
        return;
      }

      if (Math.abs(normalStateAngle - normalAngle) < _speed) {
        state.angle = normalAngle;
      }

      const direaction = selectDirection(normalStateAngle, normalAngle);

      if (direaction === 'left') {
        state.angle = normalizeAngle(normalStateAngle - _speed);
      }

      if (direaction === 'right') {
        state.angle = normalizeAngle(normalStateAngle + _speed);
      }
    },
  };
});
