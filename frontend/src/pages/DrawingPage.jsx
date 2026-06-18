import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes.js';
import {
  BrushType,
  DEFAULT_COLOR,
  ERASER_SIZES_DP,
  PEN_SIZES_DP,
  SIZE_INDEX_DEFAULT,
  toCssColor,
} from '../utils/constants.js';
import DrawingCanvas from '../components/DrawingCanvas.jsx';
import Toolbar from '../components/Toolbar.jsx';
import ColorPanel from '../components/ColorPanel.jsx';
import './DrawingPage.css';

export default function DrawingPage() {
  const navigate = useNavigate();

  // 保持与 Android 一致：不显示任何线稿参考图
  const ReferenceImage = null;

  const [currentBrush, setCurrentBrush] = useState(BrushType.PEN);
  const [currentColor, setCurrentColor] = useState(DEFAULT_COLOR);
  const [currentSizeIndex, setCurrentSizeIndex] = useState(SIZE_INDEX_DEFAULT);
  const [canUndo, setCanUndo] = useState(false);

  const canvasRef = useRef(null);

  const currentSizes = currentBrush === BrushType.ERASER ? ERASER_SIZES_DP : PEN_SIZES_DP;
  const currentSizePx = currentSizes[currentSizeIndex];

  const handleSelectBrush = useCallback((type) => {
    setCurrentBrush(type);
    setCurrentSizeIndex(SIZE_INDEX_DEFAULT);
  }, []);

  const handleSelectSize = useCallback((index) => {
    setCurrentSizeIndex(index);
  }, []);

  const handleUndo = useCallback(() => {
    canvasRef.current?.undo();
    setCanUndo(canvasRef.current?.canUndo() ?? false);
  }, []);

  const handleClear = useCallback(() => {
    if (window.confirm('确定清空画布吗？')) {
      canvasRef.current?.clear();
      setCanUndo(false);
    }
  }, []);

  const handleCanvasChanged = useCallback(() => {
    setCanUndo(canvasRef.current?.canUndo() ?? false);
  }, []);

  return (
    <div className="drawing-page">
      <Toolbar
        currentBrush={currentBrush}
        currentSizeIndex={currentSizeIndex}
        canUndo={canUndo}
        onBack={() => navigate(ROUTES.HOME)}
        onSelectBrush={handleSelectBrush}
        onSelectSize={handleSelectSize}
        onUndo={handleUndo}
        onClear={handleClear}
      />

      <div className="drawing-canvas-area">
        <DrawingCanvas
          ref={canvasRef}
          brushType={currentBrush}
          color={toCssColor(currentColor)}
          sizePx={currentSizePx}
          ReferenceImage={ReferenceImage}
          onStrokeCommitted={handleCanvasChanged}
        />
      </div>

      <ColorPanel
        selectedColor={currentColor}
        onSelect={setCurrentColor}
        hidden={currentBrush === BrushType.ERASER}
      />
    </div>
  );
}
