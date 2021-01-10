import {Model, createModel} from '../../framework';

export type UnitSpec = (...args: Parameters<Model>) => any;

type UnitFactorySpecs = Record<string, UnitSpec>;

type UnitSpecResult<T extends UnitFactorySpecs> = {
  [K in keyof T]: ReturnType<T[K]>;
};

type UnitModel<T extends UnitFactorySpecs> = (
  ...args: [...Parameters<Model>, UnitSpecResult<T>]
) => Partial<ReturnType<Model>>;

export const createUnitFactory = <T extends UnitFactorySpecs>(specs: T) => (
  fn: UnitModel<T>,
): Model => (canvas, mediator) => {
  const res = Object.keys(specs).reduce(
    (acc, next) => ({
      ...acc,
      [next]: specs[next](canvas, mediator),
    }),
    {} as UnitSpecResult<T>,
  );

  return createModel((...args) => fn(...args, res))(canvas, mediator);
};

export const createSpec = <T>(fn: (...args: Parameters<Model>) => T) => fn;
