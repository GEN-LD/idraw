import { BrushType } from './constants.js';

export function createBrushConfig(type, color, sizePx) {
  const config = {
    type,
    color,
    sizePx,
  };

  switch (type) {
    case BrushType.PEN:
      config.compositeOperation = 'source-over';
      config.lineCap = 'round';
      config.lineJoin = 'round';
      config.strokeStyle = color;
      config.globalAlpha = 1;
      break;

    case BrushType.ERASER:
      config.compositeOperation = 'destination-out';
      config.lineCap = 'round';
      config.lineJoin = 'round';
      config.strokeStyle = 'rgba(0,0,0,1)';
      config.globalAlpha = 1;
      break;

    default:
      break;
  }

  return config;
}

export function getDefaultSizeDp(type) {
  switch (type) {
    case BrushType.PEN:
      return 16;
    case BrushType.ERASER:
      return 20;
    default:
      return 16;
  }
}

export function getMinSizeDp() {
  return 8;
}

export function getMaxSizeDp(type) {
  switch (type) {
    case BrushType.PEN:
      return 40;
    case BrushType.ERASER:
      return 50;
    default:
      return 40;
  }
}

export function isPathBrush(type) {
  return type === BrushType.PEN || type === BrushType.ERASER;
}
