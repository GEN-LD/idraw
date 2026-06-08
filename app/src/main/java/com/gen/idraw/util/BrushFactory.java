package com.gen.idraw.util;

import android.graphics.Color;
import android.graphics.DiscretePathEffect;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;

import com.gen.idraw.model.BrushType;

public class BrushFactory {

    public static Paint createPaint(BrushType type, int color, float strokeWidth) {
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(strokeWidth);

        switch (type) {
            case PENCIL:
                paint.setColor(color);
                paint.setAlpha(220);
                paint.setStrokeCap(Paint.Cap.ROUND);
                paint.setStrokeJoin(Paint.Join.ROUND);
                break;

            case MARKER:
                paint.setColor(color);
                paint.setAlpha(140);
                paint.setStrokeCap(Paint.Cap.SQUARE);
                paint.setStrokeJoin(Paint.Join.BEVEL);
                paint.setStrokeMiter(1f);
                break;

            case CRAYON:
                paint.setColor(color);
                paint.setAlpha(200);
                paint.setStrokeCap(Paint.Cap.ROUND);
                paint.setStrokeJoin(Paint.Join.ROUND);
                paint.setPathEffect(new DiscretePathEffect(
                        strokeWidth * 0.3f,
                        strokeWidth * 0.15f
                ));
                break;

            case ERASER:
                paint.setColor(Color.BLACK);
                paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.DST_OUT));
                paint.setStrokeCap(Paint.Cap.ROUND);
                paint.setStrokeJoin(Paint.Join.ROUND);
                paint.setAlpha(255);
                break;
        }
        return paint;
    }

    public static float getDefaultSizeDp(BrushType type) {
        switch (type) {
            case PENCIL: return 4f;
            case MARKER: return 16f;
            case CRAYON: return 10f;
            case ERASER: return 20f;
            default: return 4f;
        }
    }

    public static float getMinSizeDp(BrushType type) {
        switch (type) {
            case PENCIL: return 1f;
            case MARKER: return 8f;
            case CRAYON: return 4f;
            case ERASER: return 8f;
            default: return 1f;
        }
    }

    public static float getMaxSizeDp(BrushType type) {
        switch (type) {
            case PENCIL: return 12f;
            case MARKER: return 40f;
            case CRAYON: return 24f;
            case ERASER: return 50f;
            default: return 12f;
        }
    }
}
