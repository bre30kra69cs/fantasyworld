export class Counter {
  private count = 0;
  private max: number;

  constructor(max: number) {
    this.max = max;
  }

  public increment = () => {
    this.count += 1;
  };

  public isMaxed = () => {
    return this.count >= this.max;
  };

  public getCount = () => {
    return this.count;
  };
}
