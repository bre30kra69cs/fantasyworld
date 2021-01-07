type EventName = keyof WindowEventMap;

export type EventPayload<T extends EventName> = WindowEventMap[T];

type FnListner<T extends EventName> = (event: EventPayload<T>) => void;

export abstract class AListner {
  public abstract run(): void;

  public abstract stop(): void;
}

export abstract class AEvent<T extends EventName> extends AListner {
  protected listners: FnListner<T>[] = [];
  protected eventName: T;

  constructor(eventName: T) {
    super();
    this.eventName = eventName;
  }

  public push = (listner: FnListner<T>) => this.listners.push(listner);
}

export class Event<T extends EventName> extends AEvent<T> {
  private listner = (event: EventPayload<T>) => this.listners.forEach((listner) => listner(event));

  public run = () => window.addEventListener(this.eventName, this.listner);

  public stop = () => window.removeEventListener(this.eventName, this.listner);
}
