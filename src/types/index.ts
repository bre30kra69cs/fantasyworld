type Fn = (...args: any[]) => any;

export type ExtendFn<T extends Fn, K> = (...args: [...Parameters<T>, K]) => ReturnType<T>;
