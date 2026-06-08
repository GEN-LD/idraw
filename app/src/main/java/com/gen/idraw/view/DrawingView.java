package com.gen.idraw.view;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;

import com.gen.idraw.model.BrushStamp;
import com.gen.idraw.model.BrushType;
import com.gen.idraw.model.Stroke;
import com.gen.idraw.util.BrushFactory;
import com.gen.idraw.util.BrushPhysics;

import java.util.ArrayList;
import java.util.List;

public class DrawingView extends View {

    private final List<Stroke> strokes = new ArrayList<>();
    private final List<Stroke> undoneStrokes = new ArrayList<>();
    private Stroke currentStroke;

    private BrushType currentBrushType = BrushType.PENCIL;
    private int currentColor = 0xFFEF4444;
    private float currentStrokeWidthPx;

    // 双缓冲 Bitmap
    private Bitmap mCanvasBitmap;
    private Canvas mCanvas;
    private final Paint mBitmapPaint = new Paint();

    // 物理引擎
    private final BrushPhysics brushPhysics = new BrushPhysics();

    // 触摸事件时间
    private long lastTouchTime;
    private float lastTouchX, lastTouchY;
    private boolean hasTouchStart;

    public DrawingView(Context context) {
        super(context);
        init();
    }

    public DrawingView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public DrawingView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        // 使用硬件加速（默认），提升绘制性能
        // 内部使用 Bitmap 双缓冲保证所有绘制操作兼容性
        float defaultDp = BrushFactory.getDefaultSizeDp(currentBrushType);
        currentStrokeWidthPx = dpToPx(defaultDp);
    }

    private float dpToPx(float dp) {
        return dp * getResources().getDisplayMetrics().density;
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        if (w > 0 && h > 0) {
            initBitmap(w, h);
        }
    }

    private void initBitmap(int w, int h) {
        if (mCanvasBitmap != null && !mCanvasBitmap.isRecycled()) {
            mCanvasBitmap.recycle();
        }
        mCanvasBitmap = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        mCanvas = new Canvas(mCanvasBitmap);
        mCanvas.drawColor(Color.WHITE);
    }

    public void setBrush(BrushType type, int color, float sizeDp) {
        this.currentBrushType = type;
        this.currentColor = color;
        this.currentStrokeWidthPx = dpToPx(sizeDp);
    }

    public void undo() {
        if (strokes.isEmpty()) return;
        undoneStrokes.add(strokes.remove(strokes.size() - 1));
        redrawAll();
        if (onDrawingChangedListener != null) {
            onDrawingChangedListener.onDrawingChanged();
        }
    }

    public void redo() {
        if (undoneStrokes.isEmpty()) return;
        strokes.add(undoneStrokes.remove(undoneStrokes.size() - 1));
        redrawAll();
        if (onDrawingChangedListener != null) {
            onDrawingChangedListener.onDrawingChanged();
        }
    }

    public void clearCanvas() {
        strokes.clear();
        undoneStrokes.clear();
        if (mCanvas != null) {
            mCanvas.drawColor(Color.WHITE);
        }
        invalidate();
        if (onDrawingChangedListener != null) {
            onDrawingChangedListener.onDrawingChanged();
        }
    }

    public boolean canUndo() {
        return !strokes.isEmpty();
    }

    public boolean canRedo() {
        return !undoneStrokes.isEmpty();
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        float x = event.getX();
        float y = event.getY();
        long time = event.getEventTime();

        switch (event.getActionMasked()) {
            case MotionEvent.ACTION_DOWN:
                currentStroke = new Stroke(currentBrushType, currentColor, currentStrokeWidthPx);
                currentStroke.addPoint(x, y);

                // 初始化物理引擎
                brushPhysics.reset();
                brushPhysics.onTouchEvent(event);

                lastTouchX = x;
                lastTouchY = y;
                lastTouchTime = time;
                hasTouchStart = true;

                // 如果是 Stamp 画笔，直接绘制第一个 stamp
                if (BrushFactory.isStampBrush(currentBrushType)) {
                    drawStampAt(x, y, currentStrokeWidthPx, currentColor, currentBrushType);
                }
                break;

            case MotionEvent.ACTION_MOVE:
                if (currentStroke == null) break;

                float pressure = event.getPressure();
                float velocity = brushPhysics.onTouchEvent(event);

                if (BrushFactory.isStampBrush(currentBrushType)) {
                    // Stamp 绘制方式：沿路径插值绘制
                    float dx = x - lastTouchX;
                    float dy = y - lastTouchY;
                    float distance = (float) Math.sqrt(dx * dx + dy * dy);

                    if (distance > 0.5f) {
                        // 计算动态参数
                        float dynamicRadius = brushPhysics.computeDynamicRadius(
                                currentStrokeWidthPx / 2, velocity, pressure, currentBrushType.name());
                        int dynamicAlpha = brushPhysics.computeDynamicAlpha(
                                currentBrushType == BrushType.PENCIL ? 200 : 220,
                                velocity, currentBrushType.name());

                        int steps = brushPhysics.computeInterpolationSteps(distance, dynamicRadius);
                        float stepX = dx / steps;
                        float stepY = dy / steps;

                        for (int i = 1; i <= steps; i++) {
                            float interpX = lastTouchX + stepX * i;
                            float interpY = lastTouchY + stepY * i;

                            // 手绘抖动
                            float[] jitter = brushPhysics.jitterOffset(dynamicRadius);
                            float stampX = interpX + jitter[0];
                            float stampY = interpY + jitter[1];

                            // 绘制 stamp
                            drawStampAt(stampX, stampY, dynamicRadius, currentColor, currentBrushType);

                            // 记录到 stroke
                            currentStroke.addStamp(new BrushStamp(stampX, stampY, dynamicRadius, currentColor, dynamicAlpha));
                        }

                        lastTouchX = x;
                        lastTouchY = y;
                    }
                } else {
                    // Path 绘制方式：记录点
                    currentStroke.addPoint(x, y);
                }
                break;

            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                if (currentStroke == null) break;

                if (BrushFactory.isPathBrush(currentBrushType)) {
                    // Path 绘制：先绘制到双缓冲 Bitmap
                    drawStrokeToBitmap(currentStroke);
                }

                strokes.add(currentStroke);
                undoneStrokes.clear();
                currentStroke = null;
                hasTouchStart = false;

                if (onDrawingChangedListener != null) {
                    onDrawingChangedListener.onDrawingChanged();
                }
                break;
        }

        invalidate();
        return true;
    }

    /**
     * 绘制单个 Stamp 到双缓冲 Bitmap
     */
    private void drawStampAt(float x, float y, float radius, int color, BrushType type) {
        if (mCanvas == null || radius <= 0.5f) return;

        Bitmap stampBitmap = BrushFactory.getStampBitmap(type, radius);
        if (stampBitmap == null || stampBitmap.isRecycled()) return;

        Paint paint = BrushFactory.createStampPaint(type, color, 255);

        // 计算绘制位置
        float left = x - radius;
        float top = y - radius;
        float right = x + radius;
        float bottom = y + radius;

        // 裁剪区域优化
        Rect clipBounds = new Rect(
                (int) Math.max(0, left - radius),
                (int) Math.max(0, top - radius),
                (int) Math.min(mCanvasBitmap.getWidth(), right + radius),
                (int) Math.min(mCanvasBitmap.getHeight(), bottom + radius)
        );

        mCanvas.save();
        mCanvas.clipRect(clipBounds);
        mCanvas.drawBitmap(stampBitmap, null, new RectF(left, top, right, bottom), paint);
        mCanvas.restore();
    }

    /**
     * 将 Stroke 绘制到双缓冲 Bitmap
     */
    private void drawStrokeToBitmap(Stroke stroke) {
        if (mCanvas == null) return;

        if (BrushFactory.isStampBrush(stroke.getBrushType())) {
            // 重绘该 stroke 的所有 stamp
            List<BrushStamp> stamps = stroke.getStamps();
            for (BrushStamp stamp : stamps) {
                drawStampAt(stamp.x, stamp.y, stamp.radius, stamp.color, stroke.getBrushType());
            }
        } else {
            // Path 绘制
            Paint paint = BrushFactory.createPaint(stroke.getBrushType(), stroke.getColor(), stroke.getStrokeWidth());
            Path path = buildPath(stroke);
            if (path != null) {
                mCanvas.drawPath(path, paint);
            }
        }
    }

    /**
     * 重绘所有 stroke（用于 undo/redo/clear）
     */
    private void redrawAll() {
        if (mCanvas == null) return;

        mCanvas.drawColor(Color.WHITE);
        for (Stroke stroke : strokes) {
            drawStrokeToBitmap(stroke);
        }
        invalidate();
    }

    /**
     * 构建 Path 对象（用于 PEN 和 ERASER）
     */
    private Path buildPath(Stroke stroke) {
        int count = stroke.getPointCount();
        if (count < 2) return null;

        Path path = new Path();
        path.moveTo(stroke.getPointX(0), stroke.getPointY(0));

        for (int i = 1; i < count; i++) {
            float prevX = stroke.getPointX(i - 1);
            float prevY = stroke.getPointY(i - 1);
            float currX = stroke.getPointX(i);
            float currY = stroke.getPointY(i);
            float midX = (prevX + currX) / 2f;
            float midY = (prevY + currY) / 2f;
            path.quadTo(prevX, prevY, midX, midY);
        }

        float lastX = stroke.getPointX(count - 1);
        float lastY = stroke.getPointY(count - 1);
        path.lineTo(lastX, lastY);

        return path;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        // 绘制双缓冲 Bitmap
        if (mCanvasBitmap != null && !mCanvasBitmap.isRecycled()) {
            canvas.drawBitmap(mCanvasBitmap, 0, 0, mBitmapPaint);
        } else {
            canvas.drawColor(Color.WHITE);
        }

        // 绘制当前正在画的 stroke（实时预览）
        if (currentStroke != null) {
            if (BrushFactory.isPathBrush(currentStroke.getBrushType())) {
                // Path 绘制方式：实时预览
                Path path = buildPath(currentStroke);
                if (path != null) {
                    Paint paint = BrushFactory.createPaint(
                            currentStroke.getBrushType(),
                            currentStroke.getColor(),
                            currentStroke.getStrokeWidth());
                    canvas.drawPath(path, paint);
                }
            }
            // Stamp 绘制方式：已经在双缓冲 Bitmap 上实时绘制了
        }
    }

    public interface OnDrawingChangedListener {
        void onDrawingChanged();
    }

    private OnDrawingChangedListener onDrawingChangedListener;

    public void setOnDrawingChangedListener(OnDrawingChangedListener listener) {
        this.onDrawingChangedListener = listener;
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        if (mCanvasBitmap != null && !mCanvasBitmap.isRecycled()) {
            mCanvasBitmap.recycle();
            mCanvasBitmap = null;
        }
    }
}
