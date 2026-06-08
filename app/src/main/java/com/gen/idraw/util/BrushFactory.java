package com.gen.idraw.util;

import android.graphics.Color;
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
            case PEN:
                paint.setColor(color);
                paint.setAlpha(255);
                paint.setStrokeCap(Paint.Cap.ROUND);
                paint.setStrokeJoin(Paint.Join.ROUND);
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
            case PEN: return 16f;
            case ERASER: return 20f;
            default: return 16f;
        }
    }

    public static float getMinSizeDp(BrushType type) {
        switch (type) {
            case PEN: return 8f;
            case ERASER: return 8f;
            default: return 8f;
        }
    }

    public static float getMaxSizeDp(BrushType type) {
        switch (type) {
            case PEN: return 40f;
            case ERASER: return 50f;
            default: return 40f;
        }
    }

    /**
     * 判断是否为 Path 绘制方式（PEN 和 ERASER）
     */
    public static boolean isPathBrush(BrushType type) {
        return type == BrushType.PEN || type == BrushType.ERASER;
    }
}
