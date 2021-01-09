import {createGame} from './framework';

const main = () => {
  const game = createGame('root', {
    elements: [],
    restater: () => {},
    render: () => {},
  });

  game.run();
};

main();
