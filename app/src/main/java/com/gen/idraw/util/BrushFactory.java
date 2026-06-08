package com.gen.idraw.util;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.DiscretePathEffect;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.PorterDuffColorFilter;
import android.graphics.RectF;

import com.gen.idraw.model.BrushType;

import java.util.HashMap;
import java.util.Map;

public class BrushFactory {

    // Stamp 缓存：按 "TYPE_radius" 作为 key
    private static final Map<String, Bitmap> stampCache = new HashMap<>();
    private static final int MAX_CACHE_SIZE = 30;
    private static final NoiseGenerator noiseGen = new NoiseGenerator(123456789L);
    private static final NoiseGenerator noiseGen2 = new NoiseGenerator(987654321L);

    // 纹理尺寸
    private static final int TEXTURE_SIZE = 256;

    /**
     * 创建 Stamp 纹理 Bitmap（圆形灰度纹理），带缓存。
     * 用于 PENCIL 和 CRAYON 笔触。
     */
    public static Bitmap getStampBitmap(BrushType type, float radius) {
        // 按 2px 一档离散化半径
        float discreteRadius = Math.round(radius / 2.0f) * 2.0f;
        String cacheKey = type.name() + "_" + discreteRadius;

        Bitmap cached = stampCache.get(cacheKey);
        if (cached != null && !cached.isRecycled()) {
            return cached;
        }

        // 缓存大小控制
        if (stampCache.size() >= MAX_CACHE_SIZE) {
            // 简单清理：清空所有
            for (Bitmap b : stampCache.values()) {
                if (b != null && !b.isRecycled()) {
                    b.recycle();
                }
            }
            stampCache.clear();
        }

        int size = Math.max(32, (int) Math.ceil(discreteRadius * 2));
        size = Math.min(size, TEXTURE_SIZE);
        Bitmap bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);

        switch (type) {
            case PENCIL:
                drawPencilTexture(canvas, size, discreteRadius);
                break;
            case CRAYON:
                drawCrayonTexture(canvas, size, discreteRadius);
                break;
            default:
                drawSoftCircle(canvas, size, discreteRadius);
                break;
        }

        stampCache.put(cacheKey, bitmap);
        return bitmap;
    }

    /**
     * 铅笔纹理：细密灰度噪点 + 边缘淡出
     */
    private static void drawPencilTexture(Canvas canvas, int size, float radius) {
        int[] pixels = new int[size * size];
        float center = size / 2f;
        float maxDist = size / 2f;
        float noiseScale = 0.15f;

        for (int y = 0; y < size; y++) {
            for (int x = 0; x < size; x++) {
                float dx = x - center;
                float dy = y - center;
                float dist = (float) Math.sqrt(dx * dx + dy * dy);

                // 边缘淡出（高斯形状）
                float edgeFade = (float) Math.exp(-(dist * dist) / (2 * maxDist * maxDist * 0.6f));

                // 细密噪点
                float n = noiseGen.fbm(x * noiseScale, y * noiseScale, 4, 0.5f);
                float n2 = noiseGen2.noise(x * noiseScale * 2, y * noiseScale * 2);
                float noiseValue = (n * 0.7f + n2 * 0.3f);

                // 铅笔纹理：整体偏灰，颗粒细密
                int gray = (int) (120 + noiseValue * 100);
                gray = (int) (gray * edgeFade);

                int alpha = (int) (255 * edgeFade);
                pixels[y * size + x] = (alpha << 24) | (gray << 16) | (gray << 8) | gray;
            }
        }

        canvas.drawBitmap(pixels, 0, size, 0, 0, size, size, false, null);
    }

    /**
     * 蜡笔纹理：粗颗粒斑点 + 强噪点 + 不规则堆积
     */
    private static void drawCrayonTexture(Canvas canvas, int size, float radius) {
        int[] pixels = new int[size * size];
        float center = size / 2f;
        float maxDist = size / 2f;
        float noiseScale = 0.06f;

        for (int y = 0; y < size; y++) {
            for (int x = 0; x < size; x++) {
                float dx = x - center;
                float dy = y - center;
                float dist = (float) Math.sqrt(dx * dx + dy * dy);

                // 边缘较硬但有轻微淡出
                float edgeFade = (float) Math.exp(-(dist * dist) / (2 * maxDist * maxDist * 0.85f));

                // 粗颗粒噪声
                float n = noiseGen.fbm(x * noiseScale, y * noiseScale, 3, 0.7f);
                float n2 = noiseGen2.fbm(x * noiseScale * 1.5f, y * noiseScale * 1.5f, 2, 0.5f);

                // 蜡笔纹理：粗颗粒，明暗对比强烈
                float noiseValue = (n * 0.5f + n2 * 0.5f);
                int gray = (int) (80 + noiseValue * 140);
                gray = (int) (gray * edgeFade);

                // 蜡笔堆积感：部分区域完全透明
                float spotNoise = noiseGen.noise(x * noiseScale * 0.5f, y * noiseScale * 0.5f);
                int alpha = (int) (255 * edgeFade * (0.7f + spotNoise * 0.3f));

                pixels[y * size + x] = (alpha << 24) | (gray << 16) | (gray << 8) | gray;
            }
        }

        canvas.drawBitmap(pixels, 0, size, 0, 0, size, size, false, null);
    }

    /**
     * 基础柔边圆形
     */
    private static void drawSoftCircle(Canvas canvas, int size, float radius) {
        int[] pixels = new int[size * size];
        float center = size / 2f;
        float maxDist = size / 2f;

        for (int y = 0; y < size; y++) {
            for (int x = 0; x < size; x++) {
                float dx = x - center;
                float dy = y - center;
                float dist = (float) Math.sqrt(dx * dx + dy * dy);
                float edgeFade = (float) Math.exp(-(dist * dist) / (2 * maxDist * maxDist * 0.8f));
                int alpha = (int) (255 * edgeFade);
                int gray = 255;
                pixels[y * size + x] = (alpha << 24) | (gray << 16) | (gray << 8) | gray;
            }
        }

        canvas.drawBitmap(pixels, 0, size, 0, 0, size, size, false, null);
    }

    /**
     * 创建 Stamp 绘制用的 Paint（带颜色混合）
     * 用于 PENCIL 和 CRAYON 的 stamp 绘制。
     */
    public static Paint createStampPaint(BrushType type, int color, int alpha) {
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        paint.setFilterBitmap(true);

        switch (type) {
            case PENCIL:
                paint.setColorFilter(new PorterDuffColorFilter(color, PorterDuff.Mode.MULTIPLY));
                paint.setAlpha(alpha);
                break;
            case CRAYON:
                paint.setColorFilter(new PorterDuffColorFilter(color, PorterDuff.Mode.MULTIPLY));
                paint.setAlpha(alpha);
                break;
            default:
                paint.setColor(color);
                paint.setAlpha(alpha);
                break;
        }

        return paint;
    }

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

            case PEN:
                paint.setColor(color);
                paint.setAlpha(255);
                paint.setStrokeCap(Paint.Cap.ROUND);
                paint.setStrokeJoin(Paint.Join.ROUND);
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
                paint.setColor(Color.WHITE);
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
            case PEN: return 16f;
            case CRAYON: return 10f;
            case ERASER: return 20f;
            default: return 4f;
        }
    }

    public static float getMinSizeDp(BrushType type) {
        switch (type) {
            case PENCIL: return 1f;
            case PEN: return 8f;
            case CRAYON: return 4f;
            case ERASER: return 8f;
            default: return 1f;
        }
    }

    public static float getMaxSizeDp(BrushType type) {
        switch (type) {
            case PENCIL: return 12f;
            case PEN: return 40f;
            case CRAYON: return 24f;
            case ERASER: return 50f;
            default: return 12f;
        }
    }

    /**
     * 判断是否为 Stamp 绘制方式（PENCIL 和 CRAYON）
     */
    public static boolean isStampBrush(BrushType type) {
        return type == BrushType.PENCIL || type == BrushType.CRAYON;
    }

    /**
     * 判断是否为 Path 绘制方式（PEN 和 ERASER）
     */
    public static boolean isPathBrush(BrushType type) {
        return type == BrushType.PEN || type == BrushType.ERASER;
    }
}
