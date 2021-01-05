export class Utils {
  protected mergeConfig = <T>(defaultConfig: T, targetConfig?: Partial<T>) => {
    return {...defaultConfig, ...(targetConfig ?? {})};
  };
}
