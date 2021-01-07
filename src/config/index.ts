import CONFIG from './config.json';

export const config = () => CONFIG;

export const engineLogging = () => config().core.engine.logging;

export const loopLogging = () => config().core.loop.logging;

export const loopCount = () => config().core.loop.count;
