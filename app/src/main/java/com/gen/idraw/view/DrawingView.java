package com.gen.idraw.view;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
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

    private BrushType currentBrushType = BrushType.PENCIL;
    private int currentColor = 0xFFEF4444;
    private float currentStrokeWidthPx;

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
        setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        float defaultDp = BrushFactory.getDefaultSizeDp(currentBrushType);
        currentStrokeWidthPx = dpToPx(defaultDp);
    }

    private float dpToPx(float dp) {
        return dp * getResources().getDisplayMetrics().density;
    }

    public void setBrush(BrushType type, int color, float sizeDp) {
        this.currentBrushType = type;
        this.currentColor = color;
        this.currentStrokeWidthPx = dpToPx(sizeDp);
    }

    public void undo() {
        if (strokes.isEmpty()) return;
        undoneStrokes.add(strokes.remove(strokes.size() - 1));
        invalidate();
    }

    public void redo() {
        if (undoneStrokes.isEmpty()) return;
        strokes.add(undoneStrokes.remove(undoneStrokes.size() - 1));
        invalidate();
    }

    public void clearCanvas() {
        strokes.clear();
        undoneStrokes.clear();
        invalidate();
    }

    public boolean canUndo() {
        return !strokes.isEmpty();
    }

    public boolean canRedo() {
        return !undoneStrokes.isEmpty();
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        switch (event.getActionMasked()) {
            case MotionEvent.ACTION_DOWN:
                currentStroke = new Stroke(currentBrushType, currentColor, currentStrokeWidthPx);
                Paint paint = BrushFactory.createPaint(currentBrushType, currentColor, currentStrokeWidthPx);
                currentStroke.setPaint(paint);
                currentStroke.addPoint(event.getX(), event.getY());
                break;

            case MotionEvent.ACTION_MOVE:
                if (currentStroke != null) {
                    currentStroke.addPoint(event.getX(), event.getY());
                }
                break;

            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                if (currentStroke != null) {
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

    public interface OnDrawingChangedListener {
        void onDrawingChanged();
    }

    private OnDrawingChangedListener onDrawingChangedListener;

    public void setOnDrawingChangedListener(OnDrawingChangedListener listener) {
        this.onDrawingChangedListener = listener;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawColor(Color.WHITE);

        for (Stroke stroke : strokes) {
            drawStroke(canvas, stroke);
        }

        if (currentStroke != null) {
            drawStroke(canvas, currentStroke);
        }
    }

    private void drawStroke(Canvas canvas, Stroke stroke) {
        Paint paint = stroke.getPaint();
        if (paint == null) return;

        int count = stroke.getPointCount();
        if (count < 2) {
            // Single point: draw a dot
            if (count == 1) {
                canvas.drawPoint(stroke.getPointX(0), stroke.getPointY(0), paint);
            }
            return;
        }

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

        canvas.drawPath(path, paint);
    }
}
