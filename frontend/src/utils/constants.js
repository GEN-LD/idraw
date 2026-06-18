export const BrushType = {
  PEN: 'PEN',
  ERASER: 'ERASER',
};

export const DrawingCategory = {
  ANIMAL: 'animal',
  VEHICLE: 'vehicle',
  BLANK: 'blank',
};

export const CHILD_FRIENDLY_COLORS = [
  0xFFEF4444, // Red
  0xFFF97316, // Orange
  0xFFEAB308, // Yellow
  0xFF22C55E, // Green
  0xFF06B6D4, // Cyan
  0xFF3B82F6, // Blue
  0xFF8B5CF6, // Purple
  0xFFEC4899, // Pink
  0xFF92400E, // Brown
];

export const DEFAULT_COLOR = 0xFFEF4444;

export const PEN_SIZES_DP = [20, 30, 40];
export const ERASER_SIZES_DP = [25, 35, 45];

export const SIZE_INDEX_DEFAULT = 1;

/**
 * Convert 0xAARRGGBB integer to CSS rgb/rgba string.
 * Android color int is ARGB, but our palette all have alpha=FF.
 */
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

/**
 * Convert dp value to CSS pixels using a reference density.
 * We use 1dp = 1px for web simplicity, same visual intent.
 */
export function dpToPx(dp) {
  return dp;
}
