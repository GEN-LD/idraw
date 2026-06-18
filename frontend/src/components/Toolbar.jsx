import {
  IcBack,
  IcPen,
  IcEraser,
  IcSizeS,
  IcSizeM,
  IcSizeL,
  IcUndo,
  IcClear,
} from '../assets/icons/index.js';
import { BrushType } from '../utils/constants.js';
import './Toolbar.css';

export default function Toolbar({
  currentBrush,
  currentSizeIndex,
  canUndo,
  onBack,
  onSelectBrush,
  onSelectSize,
  onUndo,
  onClear,
}) {
  const brushButtons = [
    { type: BrushType.PEN, icon: IcPen, label: '钢笔' },
    { type: BrushType.ERASER, icon: IcEraser, label: '橡皮擦' },
  ];

  const sizeButtons = [
    { index: 0, icon: IcSizeS, label: '小' },
    { index: 1, icon: IcSizeM, label: '中' },
    { index: 2, icon: IcSizeL, label: '大' },
  ];

  return (
    <div className="toolbar-scroll">
      <div className="toolbar-panel">
        <button
          className="toolbar-button"
          onClick={onBack}
          aria-label="返回"
        >
          <IcBack className="icon" />
        </button>

        <div className="toolbar-divider" />

        {brushButtons.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            className={`toolbar-button ${currentBrush === type ? 'toolbar-button-active' : ''}`}
            onClick={() => onSelectBrush(type)}
            aria-label={label}
          >
            <Icon className="icon" />
          </button>
        ))}

        <div className="toolbar-divider" />

        {sizeButtons.map(({ index, icon: Icon, label }) => (
          <button
            key={index}
            className={`toolbar-button ${currentSizeIndex === index ? 'toolbar-button-active' : ''}`}
            onClick={() => onSelectSize(index)}
            aria-label={label}
          >
            <Icon className="icon" />
          </button>
        ))}

        <div className="toolbar-divider" />

        <button
          className="toolbar-button"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="撤销"
        >
          <IcUndo className="icon" />
        </button>

        <button
          className="toolbar-button"
          onClick={onClear}
          aria-label="清空"
        >
          <IcClear className="icon" />
        </button>
      </div>
    </div>
  );
}
