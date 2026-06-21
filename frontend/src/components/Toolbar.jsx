import { useRef, useEffect, useState } from 'react';
import {
  IcUndo,
  IcClear,
  IcSizeS,
  IcSizeM,
  IcSizeL,
} from '../assets/icons/index.js';
import { BrushType } from '../utils/constants.js';
import './Toolbar.css';

const SIZE_ICONS = [IcSizeS, IcSizeM, IcSizeL];

export default function Toolbar({
  brushType,
  onBrushChange,
  sizeIndex,
  sizes,
  sizeLabels,
  onSizeSelect,
  showSizePopup,
  onToggleSizePopup,
  onBack,
  onUndo,
  onClear,
  canUndo,
}) {
  const CurrentSizeIcon = SIZE_ICONS[sizeIndex] || IcSizeS;
  const toolbarRef = useRef(null);
  const sizeBtnRef = useRef(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (showSizePopup && sizeBtnRef.current && toolbarRef.current) {
      const toolbarRect = toolbarRef.current.getBoundingClientRect();
      const btnRect = sizeBtnRef.current.getBoundingClientRect();
      setPopupPos({
        top: btnRect.top - toolbarRect.top,
        left: toolbarRect.width,
      });
    }
  }, [showSizePopup]);

  return (
    <div ref={toolbarRef} className="toolbar-outer">
      <div className="toolbar-scroll">
        <div className="toolbar-panel">
          <button className="toolbar-button back-button" onClick={onBack} aria-label="返回">
            <img src="/idraw/ic_back.png" alt="返回" className="nav-icon-img" />
          </button>
          <button
            className={`toolbar-button brush-tool-button ${brushType === BrushType.PEN ? 'toolbar-button-active' : ''}`}
            onClick={() => onBrushChange(BrushType.PEN)}
            aria-label="钢笔"
          >
            <img src="/idraw/pen.png" alt="钢笔" className="toolbar-icon-img brush-icon" />
          </button>
          <button
            className={`toolbar-button brush-tool-button ${brushType === BrushType.ERASER ? 'toolbar-button-active' : ''}`}
            onClick={() => onBrushChange(BrushType.ERASER)}
            aria-label="橡皮擦"
          >
            <img src="/idraw/eraser.png" alt="橡皮擦" className="toolbar-icon-img brush-icon" />
          </button>

          <button
            ref={sizeBtnRef}
            className="toolbar-button toolbar-button-active"
            onClick={onToggleSizePopup}
            aria-label="笔刷大小"
          >
            <CurrentSizeIcon className="icon" />
          </button>

          <button className="toolbar-button" onClick={onUndo} disabled={!canUndo} aria-label="撤销">
            <IcUndo className="icon" />
          </button>
          <button className="toolbar-button" onClick={onClear} aria-label="清空">
            <IcClear className="icon" />
          </button>
        </div>
      </div>

      {showSizePopup && (
        <div className="size-popup" style={{ top: popupPos.top, left: popupPos.left }}>
          {sizes.map((size, idx) => {
            const Icon = SIZE_ICONS[idx];
            return (
              <button
                key={idx}
                className={`toolbar-button ${sizeIndex === idx ? 'toolbar-button-active' : ''}`}
                onClick={() => onSizeSelect(idx)}
                aria-label={sizeLabels[idx]}
              >
                <Icon className="icon" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
