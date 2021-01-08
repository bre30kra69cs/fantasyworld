import CONFIG from './config.json';

export class Config {
  static config = () => CONFIG;

  static engineLogging = (): boolean => Config.config().structure.core.engine.render.logging;

  static loopLogging = (): boolean => Config.config().structure.core.engine.loop.logging;

  static loopCount = (): number => Config.config().structure.core.engine.loop.count;

  static loopFinite = (): boolean => Config.config().structure.core.engine.loop.finite;

  static canvasId = (): string => Config.config().props.canvasId;

  static cameraSpeed = (): number => Config.config().props.camera.speed;

  static cameraPoint = () => Config.config().props.camera.point;
}
