export const noop = () => {};

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
