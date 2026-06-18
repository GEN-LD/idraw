import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { BrushType } from '../utils/constants.js';
import './DrawingCanvas.css';

function buildPath(points) {
  if (points.length < 2) return null;

  const path = new Path2D();
  path.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    path.quadraticCurveTo(prev.x, prev.y, midX, midY);
  }

  const last = points[points.length - 1];
  path.lineTo(last.x, last.y);
  return path;
}

function drawStrokeToContext(ctx, stroke) {
  const path = buildPath(stroke.points);
  if (!path) return;

  ctx.save();
  ctx.globalCompositeOperation =
    stroke.brushType === BrushType.ERASER ? 'destination-out' : 'source-over';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = stroke.sizePx;
  ctx.strokeStyle = stroke.color;
  ctx.globalAlpha = 1;
  ctx.stroke(path);
  ctx.restore();
}

const DrawingCanvas = forwardRef(function DrawingCanvas(
  { brushType, color, sizePx, ReferenceImage, onStrokeCommitted },
  ref,
) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const strokesRef = useRef([]);
  const undoneRef = useRef([]);
  const currentStrokeRef = useRef(null);
  const brushRef = useRef({ brushType, color, sizePx });

  useEffect(() => {
    brushRef.current = { brushType, color, sizePx };
  }, [brushType, color, sizePx]);

  const redrawAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokesRef.current.forEach((stroke) => drawStrokeToContext(ctx, stroke));
  };

  const drawCurrentStroke = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentStrokeRef.current) return;
    const ctx = canvas.getContext('2d');
    drawStrokeToContext(ctx, currentStrokeRef.current);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    redrawAll();
  };

  useEffect(() => {
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useImperativeHandle(ref, () => ({
    undo() {
      if (strokesRef.current.length === 0) return;
      undoneRef.current.push(strokesRef.current.pop());
      redrawAll();
    },
    redo() {
      if (undoneRef.current.length === 0) return;
      strokesRef.current.push(undoneRef.current.pop());
      redrawAll();
    },
    clear() {
      strokesRef.current = [];
      undoneRef.current = [];
      currentStrokeRef.current = null;
      redrawAll();
    },
    canUndo() {
      return strokesRef.current.length > 0;
    },
    canRedo() {
      return undoneRef.current.length > 0;
    },
  }));

  const getPointerPoint = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    const { x, y } = getPointerPoint(e);
    currentStrokeRef.current = {
      brushType: brushRef.current.brushType,
      color: brushRef.current.color,
      sizePx: brushRef.current.sizePx,
      points: [{ x, y }],
    };
  };

  const handlePointerMove = (e) => {
    if (!currentStrokeRef.current) return;
    e.preventDefault();

    const { x, y } = getPointerPoint(e);
    currentStrokeRef.current.points.push({ x, y });

    // Erase previous current stroke visual by redrawing all then drawing current
    redrawAll();
    drawCurrentStroke();
  };

  const handlePointerUp = (e) => {
    if (!currentStrokeRef.current) return;
    e.preventDefault();

    const { x, y } = getPointerPoint(e);
    currentStrokeRef.current.points.push({ x, y });

    strokesRef.current.push(currentStrokeRef.current);
    undoneRef.current = [];
    currentStrokeRef.current = null;
    redrawAll();
    onStrokeCommitted?.();
  };

  const handlePointerCancel = () => {
    if (currentStrokeRef.current) {
      currentStrokeRef.current = null;
      redrawAll();
    }
  };

  return (
    <div ref={containerRef} className="drawing-canvas-container">
      {ReferenceImage && (
        <div className="drawing-reference">
          <ReferenceImage className="drawing-reference-svg" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
      />
    </div>
  );
});

export default DrawingCanvas;
