import { CHILD_FRIENDLY_COLORS, toCssColor } from '../utils/constants.js';
import './ColorPanel.css';

export default function ColorPanel({ selectedColor, onSelect, hidden }) {
  if (hidden) return null;

  return (
    <div className="color-panel">
      {CHILD_FRIENDLY_COLORS.map((color) => {
        const isSelected = color === selectedColor;
        return (
          <button
            key={color}
            className={`color-swatch ${isSelected ? 'color-swatch-selected' : ''}`}
            style={{ backgroundColor: toCssColor(color) }}
            onClick={() => onSelect(color)}
            aria-label={`选择颜色 ${color.toString(16)}`}
          />
        );
      })}
    </div>
  );
}
