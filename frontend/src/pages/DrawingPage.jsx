import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DrawingCanvas from '../components/DrawingCanvas';
import Toolbar from '../components/Toolbar';
import ColorPanel from '../components/ColorPanel';
import { BrushType, PEN_SIZES, ERASER_SIZES, COLORS } from '../utils/constants';
import { playClick } from '../utils/soundUtils';
import {
  LineartPanda, LineartRabbit, LineartGiraffe,
  LineartExcavator, LineartFireTruck, LineartPoliceCar,
} from '../assets/icons';

const LINEART_MAP = {
  panda: LineartPanda,
  rabbit: LineartRabbit,
  giraffe: LineartGiraffe,
  excavator: LineartExcavator,
  fire_truck: LineartFireTruck,
  police_car: LineartPoliceCar,
};

const SIZE_LABELS = ['S', 'M', 'L'];

export default function DrawingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subject') || '';
  const isBlank = searchParams.get('blank') === 'true';

  const [brushType, setBrushType] = useState(BrushType.PEN);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showSizePopup, setShowSizePopup] = useState(false);
  const canvasRef = useRef(null);

  const sizes = brushType === BrushType.PEN ? PEN_SIZES : ERASER_SIZES;
  const currentSize = sizes[sizeIndex];

  useEffect(() => {
    setSizeIndex(0);
  }, [brushType]);

  const handleBrushChange = useCallback((type) => {
    if (brushType !== type) {
      setBrushType(type);
      setShowSizePopup(false);
    }
  }, [brushType]);

  const handleColorSelect = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  const handleSizeSelect = useCallback((idx) => {
    setSizeIndex(idx);
    setShowSizePopup(false);
  }, []);

  const handleBack = useCallback((e) => {
    const btn = e.currentTarget;
    btn.style.transition = 'transform 0.1s ease';
    btn.style.transform = 'scale(0.7)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
      setTimeout(() => navigate(-1), 100);
    }, 100);
  }, [navigate]);

  const handleUndo = useCallback(() => {
    canvasRef.current?.undo();
  }, []);

  const handleClear = useCallback(() => {
    if (window.confirm('确定清空画布吗？')) {
      canvasRef.current?.clear();
    }
  }, []);

  const handleBeforeDraw = useCallback(() => {
    if (!selectedColor && brushType === BrushType.PEN) {
      const toast = document.createElement('div');
      toast.textContent = '选取颜色后开始画画^-^';
      toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.7);color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;font-size:16px;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 1000);
      return false;
    }
    return true;
  }, [selectedColor, brushType]);

  const ReferenceImage = useMemo(() => {
    if (isBlank || !subjectId) return null;
    return LINEART_MAP[subjectId] || null;
  }, [isBlank, subjectId]);

  const showColorPanel = brushType === BrushType.PEN;

  return (
    <div className="drawing-page">
      <Toolbar
        brushType={brushType}
        onBrushChange={handleBrushChange}
        sizeIndex={sizeIndex}
        sizes={sizes}
        sizeLabels={SIZE_LABELS}
        onSizeSelect={handleSizeSelect}
        showSizePopup={showSizePopup}
        onToggleSizePopup={() => setShowSizePopup((v) => !v)}
        onBack={handleBack}
        onUndo={handleUndo}
        onClear={handleClear}
        canUndo={canvasRef.current?.canUndo() ?? false}
      />
      <div className="drawing-canvas-wrapper">
        <DrawingCanvas
          ref={canvasRef}
          brushType={brushType}
          brushSize={currentSize}
          color={selectedColor}
          onBeforeDraw={handleBeforeDraw}
          referenceImage={ReferenceImage}
        />
      </div>
      {showColorPanel && (
        <ColorPanel
          colors={COLORS}
          selectedColor={selectedColor}
          onColorSelect={handleColorSelect}
        />
      )}
    </div>
  );
}
