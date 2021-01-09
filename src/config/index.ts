interface Config {
  mode: 'dev' | 'prod';
}

const createConfig = () => {
  const config: Config = {
    mode: 'dev',
  };

  return {
    mode: () => {
      return config.mode;
    },
  };
};

export const config = createConfig();
