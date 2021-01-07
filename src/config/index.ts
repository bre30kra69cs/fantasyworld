import CONFIG from './config.json';

export class Config {
  static config = () => CONFIG;

  static engineLogging = () => Config.config().structure.core.engine.render.logging;

  static loopLogging = () => Config.config().structure.core.engine.loop.logging;

  static loopCount = () => Config.config().structure.core.engine.loop.count;

  static canvasId = () => Config.config().props.canvasId;

  static cameraSpeed = () => Config.config().props.cameraSpeed;
}
