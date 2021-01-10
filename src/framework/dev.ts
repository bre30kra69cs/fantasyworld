import {Cycle} from '../engine';
import {config} from '../config';

export const mode = (cycle: Cycle) => {
  const dev = document.getElementById('dev');

  if (config.mode() !== 'dev') {
    dev.style.display = 'none';
    return;
  }

  const active = cycle.getStatus();

  const stop = document.getElementById('dev__stop');
  stop.addEventListener('click', () => {
    cycle.stop();
    start.className = 'dev__button';
    stop.className = 'dev__button dev__active';
  });

  const start = document.getElementById('dev__start');
  start.addEventListener('click', () => {
    cycle.start();
    stop.className = 'dev__button';
    start.className = 'dev__button dev__active';
  });

  const next = document.getElementById('dev__next');
  next.addEventListener('click', () => cycle.next());

  const prev = document.getElementById('dev__prev');
  prev.addEventListener('click', () => cycle.prev());

  active && (start.className = 'dev__button dev__active');
};
