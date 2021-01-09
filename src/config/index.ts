interface Config {
  mode: 'dev' | 'prod';
  historyLen: number;
}

const createConfig = () => {
  const config: Config = {
    mode: 'dev',
    historyLen: 100,
  };

  return {
    mode: () => config.mode,
    historyLen: () => config.historyLen,
  };
};

export const config = createConfig();
