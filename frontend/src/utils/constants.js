export const BrushType = {
  PEN: 'PEN',
  ERASER: 'ERASER',
};

export const DrawingCategory = {
  ANIMAL: 'animal',
  VEHICLE: 'vehicle',
  BLANK: 'blank',
};

export const COLORS = [
  '#F87171',
  '#FB923C',
  '#FACC15',
  '#4ADE80',
  '#22D3EE',
  '#60A5FA',
  '#A78BFA',
  '#F472B6',
  '#B45309',
];

export const CHILD_FRIENDLY_COLORS = [
  0xFFF87171,
  0xFFFB923C,
  0xFFFACC15,
  0xFF4ADE80,
  0xFF22D3EE,
  0xFF60A5FA,
  0xFFA78BFA,
  0xFFF472B6,
  0xFFB45309,
];

export const DEFAULT_COLOR = 0xFFF87171;

export const PEN_SIZES = [10, 20, 30];
export const ERASER_SIZES = [15, 25, 35];

export const PEN_SIZES_DP = [10, 20, 30];
export const ERASER_SIZES_DP = [15, 25, 35];

export const SIZE_INDEX_DEFAULT = 0;

export function toCssColor(colorInt) {
  const r = (colorInt >> 16) & 0xFF;
  const g = (colorInt >> 8) & 0xFF;
  const b = colorInt & 0xFF;
  const a = ((colorInt >> 24) & 0xFF) / 255;
  if (a === 1) {
    return `rgb(${r}, ${g}, ${b})`;
  }
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function dpToPx(dp) {
  return dp;
}
