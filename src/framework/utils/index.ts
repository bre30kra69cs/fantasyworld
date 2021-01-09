import {Element} from '../../core';

const ELEMENT: Element = {
  id: '',
  priority: 0,
  type: '',
  point: {
    x: 0,
    y: 0,
  },
  pointTo: {
    x: 0,
    y: 0,
  },
  angle: 0,
  angleTo: 0,
};

const genereateId = (len: number) => {
  let result = '';

  for (let i = 0; i < len; i += 1) {
    result += Math.round(Math.random() * 10);
  }

  return result;
};

export const createElement = (element?: Partial<Element>) => {
  return {
    ...ELEMENT,
    id: genereateId(4),
    ...(element || {}),
  };
};
