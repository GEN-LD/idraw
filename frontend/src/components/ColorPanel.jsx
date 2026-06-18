import { useEffect, useRef, useState } from 'react';
import './ColorPanel.css';

const SELECTED_WIDTH = 180;

export default function ColorPanel({ colors, selectedColor, onColorSelect }) {
  const panelRef = useRef(null);
  const [sizes, setSizes] = useState({ normalH: 32, selectedH: 38, marginLeft: 0, panelContentW: 92 });

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const updateSizes = () => {
      const height = panel.clientHeight;
      const style = getComputedStyle(panel);
      const paddingTop = parseInt(style.paddingTop, 10) || 0;
      const paddingBottom = parseInt(style.paddingBottom, 10) || 0;
      const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      const paddingRight = parseInt(style.paddingRight, 10) || 0;
      const availableHeight = height - paddingTop - paddingBottom;
      const spacing = 6;
      const n = colors.length;
      const totalSpacing = spacing * (n - 1);
      const normalH = Math.floor((availableHeight - totalSpacing) / n);
      const selectedH = Math.floor(normalH * 1.2);
      const unselectedH = Math.floor((availableHeight - totalSpacing - selectedH) / (n - 1));
      const contentWidth = panel.clientWidth - paddingLeft - paddingRight;
      const marginLeft = -(SELECTED_WIDTH - contentWidth);
      setSizes({ normalH: unselectedH, selectedH, marginLeft, panelContentW: contentWidth });
    };

    updateSizes();
    const ro = new ResizeObserver(updateSizes);
    ro.observe(panel);
    return () => ro.disconnect();
  }, [colors.length]);

  return (
    <div ref={panelRef} className="color-panel">
      {colors.map((c) => {
        const isSelected = selectedColor === c;
        const height = isSelected ? sizes.selectedH : sizes.normalH;
        return (
          <button
            key={c}
            className={`color-swatch ${isSelected ? 'selected' : ''}`}
              style={{
                backgroundColor: c,
                height: `${height}px`,
                marginLeft: isSelected ? `${sizes.marginLeft}px` : 0,
                width: isSelected ? `${SELECTED_WIDTH}px` : '100%',
              }}
            onClick={() => onColorSelect(c)}
            aria-label={`选择颜色 ${c}`}
          />
        );
      })}
    </div>
  );
}
