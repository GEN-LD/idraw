import { useRef, useCallback, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { BrushType } from '../utils/constants';
import './DrawingCanvas.css';

const DrawingCanvas = forwardRef(function DrawingCanvas(
  { brushType, brushSize, color, onBeforeDraw, referenceImage: ReferenceImage },
  ref
) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const strokesRef = useRef([]);
  const undoneRef = useRef([]);
  const currentStrokeRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const updateSize = () => {
      setCanvasSize({ width: container.clientWidth, height: container.clientHeight });
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    redrawAll();
  }, [canvasSize]);

  const redrawAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const stroke of strokesRef.current) {
      drawStroke(ctx, stroke);
    }
  }, []);

  const drawStroke = (ctx, stroke) => {
    if (stroke.points.length < 2) return;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = stroke.size;
    if (stroke.type === BrushType.ERASER) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = stroke.color;
    }
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for (let i = 1; i < stroke.points.length; i++) {
      const prev = stroke.points[i - 1];
      const curr = stroke.points[i];
      const mx = (prev.x + curr.x) / 2;
      const my = (prev.y + curr.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
    }
    const last = stroke.points[stroke.points.length - 1];
    ctx.lineTo(last.x, last.y);
    ctx.stroke();
    ctx.restore();
  };

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const handleStart = useCallback((e) => {
    e.preventDefault();
    if (onBeforeDraw && !onBeforeDraw()) return;
    isDrawingRef.current = true;
    undoneRef.current = [];
    const pos = getPos(e);
    currentStrokeRef.current = {
      type: brushType,
      size: brushSize,
      color: color,
      points: [pos],
    };
  }, [brushType, brushSize, color, onBeforeDraw]);

  const handleMove = useCallback((e) => {
    e.preventDefault();
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    const pos = getPos(e);
    currentStrokeRef.current.points.push(pos);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pts = currentStrokeRef.current.points;
    const len = pts.length;
    if (len < 2) return;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = currentStrokeRef.current.size;
    if (currentStrokeRef.current.type === BrushType.ERASER) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentStrokeRef.current.color;
    }
    ctx.beginPath();
    if (len === 2) {
      ctx.moveTo(pts[0].x, pts[0].y);
      ctx.lineTo(pts[1].x, pts[1].y);
    } else {
      const prev = pts[len - 3];
      const curr = pts[len - 2];
      const next = pts[len - 1];
      const mx1 = (prev.x + curr.x) / 2;
      const my1 = (prev.y + curr.y) / 2;
      const mx2 = (curr.x + next.x) / 2;
      const my2 = (curr.y + next.y) / 2;
      ctx.moveTo(mx1, my1);
      ctx.quadraticCurveTo(curr.x, curr.y, mx2, my2);
    }
    ctx.stroke();
    ctx.restore();
  }, []);

  const handleEnd = useCallback((e) => {
    e.preventDefault();
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    isDrawingRef.current = false;
    strokesRef.current.push(currentStrokeRef.current);
    currentStrokeRef.current = null;
  }, []);

  useImperativeHandle(ref, () => ({
    undo: () => {
      if (strokesRef.current.length === 0) return;
      const stroke = strokesRef.current.pop();
      undoneRef.current.push(stroke);
      redrawAll();
    },
    canUndo: () => strokesRef.current.length > 0,
    clear: () => {
      strokesRef.current = [];
      undoneRef.current = [];
      redrawAll();
    },
  }));

  const refImgPadding = 40;
  const refImgMaxW = canvasSize.width - refImgPadding * 2;
  const refImgMaxH = canvasSize.height - refImgPadding * 2;

  return (
    <div className="drawing-canvas-container" ref={containerRef}>
      {ReferenceImage && (
        <div className="reference-image-layer" style={{
          padding: `${refImgPadding}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ReferenceImage
            width={refImgMaxW > 0 ? refImgMaxW : 300}
            height={refImgMaxH > 0 ? refImgMaxH : 400}
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        width={canvasSize.width}
        height={canvasSize.height}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      />
    </div>
  );
});

export default DrawingCanvas;
