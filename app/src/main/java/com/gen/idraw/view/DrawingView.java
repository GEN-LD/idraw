package com.gen.idraw.view;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.graphics.Paint;
import android.graphics.Path;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;

import com.gen.idraw.model.BrushType;
import com.gen.idraw.model.Stroke;
import com.gen.idraw.util.BrushFactory;

import java.util.ArrayList;
import java.util.List;

public class DrawingView extends View {

    private final List<Stroke> strokes = new ArrayList<>();
    private final List<Stroke> undoneStrokes = new ArrayList<>();
    private Stroke currentStroke;

    private BrushType currentBrushType = BrushType.PEN;
    private int currentColor = 0xFFEF4444;
    private float currentStrokeWidthPx;

    private Bitmap mCanvasBitmap;
    private Canvas mCanvas;
    private final Paint mBitmapPaint = new Paint();
    private final Paint mWhitePaint = new Paint();

    private Drawable referenceDrawable;

    private boolean drawingEnabled = false;

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
        float defaultDp = BrushFactory.getDefaultSizeDp(currentBrushType);
        currentStrokeWidthPx = dpToPx(defaultDp);
        mWhitePaint.setColor(Color.WHITE);
        mWhitePaint.setStyle(Paint.Style.FILL);
    }

    private float dpToPx(float dp) {
        return dp * getResources().getDisplayMetrics().density;
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        if (w > 0 && h > 0) {
            initBitmap(w, h);
            updateReferenceBounds();
        }
    }

    private void initBitmap(int w, int h) {
        if (mCanvasBitmap != null && !mCanvasBitmap.isRecycled()) {
            mCanvasBitmap.recycle();
        }
        mCanvasBitmap = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        mCanvas = new Canvas(mCanvasBitmap);
        mCanvas.drawColor(Color.TRANSPARENT);

        if (referenceDrawable != null) {
            referenceDrawable.setBounds(0, 0, w, h);
        }

        for (Stroke stroke : strokes) {
            drawStrokeToBitmap(stroke);
        }
    }

    public void setReferenceImage(int resId) {
        if (resId != 0) {
            referenceDrawable = getResources().getDrawable(resId, null);
            updateReferenceBounds();
        } else {
            referenceDrawable = null;
        }
        invalidate();
    }

    private void updateReferenceBounds() {
        if (referenceDrawable == null) return;
        int padding = (int) dpToPx(40f);
        int w = getWidth();
        int h = getHeight();
        if (w > 0 && h > 0) {
            int availW = w - padding * 2;
            int availH = h - padding * 2;
            float imgW = referenceDrawable.getIntrinsicWidth();
            float imgH = referenceDrawable.getIntrinsicHeight();
            if (imgW <= 0 || imgH <= 0) {
                referenceDrawable.setBounds(padding, padding, w - padding, h - padding);
                return;
            }
            float scale = Math.min(availW / imgW, availH / imgH);
            int drawW = (int) (imgW * scale);
            int drawH = (int) (imgH * scale);
            int left = padding + (availW - drawW) / 2;
            int top = padding + (availH - drawH) / 2;
            referenceDrawable.setBounds(left, top, left + drawW, top + drawH);
        }
    }

    public void setDrawingEnabled(boolean enabled) {
        this.drawingEnabled = enabled;
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
            mCanvas.drawColor(Color.TRANSPARENT, android.graphics.PorterDuff.Mode.CLEAR);
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
        if (!drawingEnabled) {
            if (event.getActionMasked() == MotionEvent.ACTION_DOWN && tryDrawListener != null) {
                tryDrawListener.onTryDrawWithoutColor();
            }
            return true;
        }

        float x = event.getX();
        float y = event.getY();

        switch (event.getActionMasked()) {
            case MotionEvent.ACTION_DOWN:
                currentStroke = new Stroke(currentBrushType, currentColor, currentStrokeWidthPx);
                currentStroke.addPoint(x, y);
                if (currentBrushType == BrushType.ERASER) {
                    drawLastSegmentToBitmap(currentStroke);
                }
                break;

            case MotionEvent.ACTION_MOVE:
                if (currentStroke != null) {
                    currentStroke.addPoint(x, y);
                    if (currentBrushType == BrushType.ERASER) {
                        drawLastSegmentToBitmap(currentStroke);
                    }
                }
                break;

            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                if (currentStroke != null) {
                    if (currentBrushType == BrushType.PEN) {
                        drawStrokeToBitmap(currentStroke);
                    }

                    strokes.add(currentStroke);
                    undoneStrokes.clear();
                    currentStroke = null;

                    if (onDrawingChangedListener != null) {
                        onDrawingChangedListener.onDrawingChanged();
                    }
                }
                break;
        }

        invalidate();
        return true;
    }

    private void drawStrokeToBitmap(Stroke stroke) {
        if (mCanvas == null) return;

        Paint paint = BrushFactory.createPaint(stroke.getBrushType(), stroke.getColor(), stroke.getStrokeWidth());
        Path path = buildPath(stroke);
        if (path != null) {
            mCanvas.drawPath(path, paint);
        }
    }

    private void drawLastSegmentToBitmap(Stroke stroke) {
        if (mCanvas == null) return;
        int count = stroke.getPointCount();
        if (count < 2) return;

        Paint paint = BrushFactory.createPaint(stroke.getBrushType(), stroke.getColor(), stroke.getStrokeWidth());
        Path path = new Path();
        float prevX = stroke.getPointX(count - 2);
        float prevY = stroke.getPointY(count - 2);
        float currX = stroke.getPointX(count - 1);
        float currY = stroke.getPointY(count - 1);
        float midX = (prevX + currX) / 2f;
        float midY = (prevY + currY) / 2f;
        path.moveTo(prevX, prevY);
        path.quadTo(prevX, prevY, midX, midY);
        path.lineTo(currX, currY);
        mCanvas.drawPath(path, paint);
    }

    private void redrawAll() {
        if (mCanvas == null) return;

        mCanvas.drawColor(Color.TRANSPARENT, android.graphics.PorterDuff.Mode.CLEAR);
        for (Stroke stroke : strokes) {
            drawStrokeToBitmap(stroke);
        }
        invalidate();
    }

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

        canvas.drawRect(0, 0, getWidth(), getHeight(), mWhitePaint);

        if (referenceDrawable != null) {
            referenceDrawable.draw(canvas);
        }

        if (mCanvasBitmap != null && !mCanvasBitmap.isRecycled()) {
            canvas.drawBitmap(mCanvasBitmap, 0, 0, mBitmapPaint);
        }

        if (currentStroke != null && currentStroke.getBrushType() == BrushType.PEN) {
            Path path = buildPath(currentStroke);
            if (path != null) {
                Paint paint = BrushFactory.createPaint(
                        currentStroke.getBrushType(),
                        currentStroke.getColor(),
                        currentStroke.getStrokeWidth());
                canvas.drawPath(path, paint);
            }
        }
    }

    public interface OnDrawingChangedListener {
        void onDrawingChanged();
    }

    private OnDrawingChangedListener onDrawingChangedListener;

    public void setOnDrawingChangedListener(OnDrawingChangedListener listener) {
        this.onDrawingChangedListener = listener;
    }

    public interface OnTryDrawWithoutColorListener {
        void onTryDrawWithoutColor();
    }

    private OnTryDrawWithoutColorListener tryDrawListener;

    public void setOnTryDrawWithoutColorListener(OnTryDrawWithoutColorListener listener) {
        this.tryDrawListener = listener;
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
