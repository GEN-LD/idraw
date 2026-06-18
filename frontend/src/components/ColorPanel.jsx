import './ColorPanel.css';

export default function ColorPanel({ colors, selectedColor, onColorSelect }) {
  return (
    <div className="color-panel">
      {colors.map((c) => {
        const isSelected = selectedColor === c;
        return (
          <div
            key={c}
            className={`color-swatch ${isSelected ? 'selected' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => onColorSelect(c)}
          >
            {isSelected && <div className="color-indicator" />}
          </div>
        );
      })}
    </div>
  );
}
