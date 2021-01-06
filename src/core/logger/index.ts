export const loopLog = (count: number, predict: boolean) =>
  predict && console.log(`[loop] iter ${count}`);

export const renderLog = (type: string, order: 'paint' | 'unpaint', predict: boolean) =>
  predict && console.log(`[render] iter ${type} - ${order}`);
