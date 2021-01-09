export const noop = () => {};

export const tap = <T>(arg: T) => arg;

export const id = (len: number) => {
  let res = '';

  for (let i = 0; i <= len; i += 1) {
    res += Math.round(Math.random() * 10);
  }

  return res;
};

export const stateId = () => {
  return id(4);
};

export const omit = <T, K extends keyof T>(target: T, name: K): Omit<T, K> => {
  return Object.keys(target)
    .filter((key) => key !== name)
    .reduce((acc, next) => {
      return {
        ...acc,
        [next]: target[next],
      };
    }, {} as Omit<T, K>);
};

export const clone = (target: any) => {
  if (typeof target !== 'object') {
    return target;
  }

  return Object.keys(target)
    .map((key) => {
      if (typeof target[key] === 'object') {
        if (Array.isArray(target[key])) {
          return {[key]: target[key].map(clone)};
        } else {
          return {[key]: clone(target[key])};
        }
      }

      return {[key]: target[key]};
    })
    .reduce((acc, next) => {
      return {
        ...acc,
        ...next,
      };
    }, {});
};

const equalArray = <T extends any[]>(value1: T, value2: T) => {
  if (value1.length !== value2.length) {
    return false;
  }

  return value1.every((_, index) => equal(value1[index], value2[index]));
};

const equalObject = <T>(value1: T, value2: T) => {
  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  if (!keys1.every((key) => keys2.includes(key))) {
    return false;
  }

  if (!keys2.every((key) => keys1.includes(key))) {
    return false;
  }

  return keys1.every((key) => equal(value1[key], value2[key]));
};

export const equal = <T>(left: T, right: T) => {
  if (Array.isArray(left) && Array.isArray(right)) {
    return equalArray(left, right);
  }

  if (typeof left === 'object' && typeof right === 'object') {
    return equalObject(left, right);
  }

  return left === right;
};
