export class Logger {
  static loop = (count: number) => console.log(`[loop] ${count}`);

  static engine = (name: string, type: string) => console.log(`[engine] ${type} - ${name}`);
}
