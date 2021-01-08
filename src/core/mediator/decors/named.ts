interface Compoennt {
  new (...args: any[]): any;
}

const getName = (len: number) => {
  const result: string[] = [];

  for (let i = 0; i < len; i += 1) {
    const part = Math.round(Math.random() * 100);
    result.push(`${part}`);
  }

  return result.join('');
};

export const named = <T extends Compoennt>(constructor: T) => {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args, getName(4));
    }
  };
};
