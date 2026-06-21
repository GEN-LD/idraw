import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DrawingCanvas from '../components/DrawingCanvas';
import Toolbar from '../components/Toolbar';
import ColorPanel from '../components/ColorPanel';
import { BrushType, PEN_SIZES, ERASER_SIZES, COLORS } from '../utils/constants';
import { getSubjectById } from '../utils/subjectsRepository.js';
import {
  LineartPanda, LineartRabbit, LineartGiraffe,
  LineartExcavator, LineartFireTruck, LineartPoliceCar,
} from '../assets/icons/index.js';
import { playClick } from '../utils/soundUtils';
import { animateClick } from '../utils/viewUtils';
import './DrawingPage.css';

const SIZE_LABELS = ['S', 'M', 'L'];

const LINEART_COMPONENTS = {
  LineartPanda, LineartRabbit, LineartGiraffe,
  LineartExcavator, LineartFireTruck, LineartPoliceCar,
};

export default function DrawingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subject') || '';
  const isBlank = searchParams.get('blank') === 'true';
  const coloringMode = searchParams.get('coloring') === 'true';

  const [brushType, setBrushType] = useState(BrushType.PEN);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showSizePopup, setShowSizePopup] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
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
    animateClick(e.currentTarget, () => navigate(-1));
  }, [navigate]);

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

  const handleCanvasChange = useCallback(() => {
    setCanUndo(canvasRef.current?.canUndo() ?? false);
  }, []);

  const subject = useMemo(() => getSubjectById(subjectId), [subjectId]);

  const referenceImage = useMemo(() => {
    if (isBlank || !subjectId) return null;
    if (coloringMode) {
      return `/idraw/lineart_${subjectId}.png`;
    }
    const componentName = subject?.lineArt;
    if (componentName && LINEART_COMPONENTS[componentName]) {
      const Component = LINEART_COMPONENTS[componentName];
      return <Component className="lineart-svg" />;
    }
    return `/idraw/lineart_${subjectId}.png`;
  }, [isBlank, subjectId, coloringMode, subject]);

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
        canUndo={canUndo}
      />
      <div className="drawing-canvas-wrapper">
        <DrawingCanvas
          ref={canvasRef}
          brushType={brushType}
          brushSize={currentSize}
          color={selectedColor}
          onBeforeDraw={handleBeforeDraw}
          referenceImage={referenceImage}
          onStrokeCommitted={handleCanvasChange}
        />
      </div>
      <ColorPanel
        colors={COLORS}
        selectedColor={selectedColor}
        onColorSelect={handleColorSelect}
      />
    </div>
  );
}
