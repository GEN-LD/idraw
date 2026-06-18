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
  '#EF4444',
  '#F97316',
  '#EAB308',
  '#22C55E',
  '#06B6D4',
  '#3B82F6',
  '#8B5CF6',
  '#EC4899',
  '#92400E',
];

export const CHILD_FRIENDLY_COLORS = [
  0xFFEF4444,
  0xFFF97316,
  0xFFEAB308,
  0xFF22C55E,
  0xFF06B6D4,
  0xFF3B82F6,
  0xFF8B5CF6,
  0xFFEC4899,
  0xFF92400E,
];

export const DEFAULT_COLOR = 0xFFEF4444;

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
