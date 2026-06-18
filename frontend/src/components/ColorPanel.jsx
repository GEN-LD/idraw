import { useEffect, useRef, useState } from 'react';
import './ColorPanel.css';

export default function ColorPanel({ colors, selectedColor, onColorSelect }) {
  const panelRef = useRef(null);
  const [sizes, setSizes] = useState({ normalH: 32, selectedH: 38, overflow: 0 });

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const updateSizes = () => {
      const height = panel.clientHeight;
      const paddingTop = parseInt(getComputedStyle(panel).paddingTop, 10) || 0;
      const paddingBottom = parseInt(getComputedStyle(panel).paddingBottom, 10) || 0;
      const availableHeight = height - paddingTop - paddingBottom;
      const spacing = 4;
      const n = colors.length;
      const totalSpacing = spacing * (n - 1);
      const normalH = Math.floor((availableHeight - totalSpacing) / n);
      const selectedH = Math.floor(normalH * 1.2);
      const unselectedH = Math.floor((availableHeight - totalSpacing - selectedH) / (n - 1));
      const contentWidth = panel.clientWidth - paddingTop - paddingBottom;
      const overflow = Math.floor(contentWidth * 0.5);
      setSizes({ normalH: unselectedH, selectedH, overflow });
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
              marginLeft: isSelected ? `-${sizes.overflow}px` : 0,
              width: isSelected ? `calc(100% + ${sizes.overflow}px)` : '100%',
            }}
            onClick={() => onColorSelect(c)}
            aria-label={`选择颜色 ${c}`}
          />
        );
      })}
    </div>
  );
}
