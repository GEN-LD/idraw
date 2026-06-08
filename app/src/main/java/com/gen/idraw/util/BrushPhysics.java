package com.gen.idraw.util;

import android.view.MotionEvent;

/**
 * 画笔物理引擎：计算触摸速度、压力、动态笔触粗细。
 * 仅用于 PENCIL 和 CRAYON 笔触。
 */
public class BrushPhysics {

    private float lastX, lastY;
    private long lastTime;
    private boolean hasLast = false;

    // 速度平滑因子
    private float smoothedVelocity = 0;
    private static final float VELOCITY_SMOOTH = 0.3f;

    // 抖动随机
    private final java.util.Random jitterRandom = new java.util.Random();

    /**
     * 处理触摸事件，返回速度（px/ms）
     */
    public float onTouchEvent(MotionEvent event) {
        float x = event.getX();
        float y = event.getY();
        long time = event.getEventTime();

        if (!hasLast) {
            lastX = x;
            lastY = y;
            lastTime = time;
            hasLast = true;
            return 0;
        }

        float dx = x - lastX;
        float dy = y - lastY;
        float distance = (float) Math.sqrt(dx * dx + dy * dy);
        float dt = Math.max(1, time - lastTime);
        float velocity = distance / dt;

        // 平滑速度
        smoothedVelocity = smoothedVelocity * (1 - VELOCITY_SMOOTH) + velocity * VELOCITY_SMOOTH;

        lastX = x;
        lastY = y;
        lastTime = time;

        return smoothedVelocity;
    }

    public void reset() {
        hasLast = false;
        smoothedVelocity = 0;
    }

    /**
     * 计算动态笔触半径
     * @param baseRadius 基础半径
     * @param velocity 当前速度
     * @param pressure 触摸压力（MotionEvent.getPressure()）
     * @param brushType 画笔类型
     */
    public float computeDynamicRadius(float baseRadius, float velocity, float pressure, String brushType) {
        float radius = baseRadius;

        // 速度影响：速度快 → 笔触变细
        float speedFactor = Math.min(1.0f, velocity / 8.0f);
        float speedReduction = speedFactor * baseRadius * 0.4f;
        radius -= speedReduction;

        // 压力影响：压力大 → 笔触变粗
        float pressureBoost = (pressure - 0.5f) * baseRadius * 0.6f;
        radius += pressureBoost;

        // 铅笔 vs 蜡笔的差异
        if ("PENCIL".equals(brushType)) {
            // 铅笔更敏感：速度影响更大
            radius -= speedFactor * baseRadius * 0.2f;
        } else {
            // 蜡笔更厚实：压力影响更大
            radius += pressureBoost * 0.3f;
        }

        // 限制范围
        radius = Math.max(baseRadius * 0.3f, Math.min(baseRadius * 1.5f, radius));

        // 随机抖动（±5%）
        float jitter = 0.95f + jitterRandom.nextFloat() * 0.1f;
        radius *= jitter;

        return radius;
    }

    /**
     * 计算动态透明度
     * @param baseAlpha 基础透明度
     * @param velocity 当前速度
     * @param brushType 画笔类型
     */
    public int computeDynamicAlpha(int baseAlpha, float velocity, String brushType) {
        float alpha = baseAlpha;

        // 速度快 → 透明度增加（变淡）
        float speedFactor = Math.min(1.0f, velocity / 6.0f);
        float fadeAmount = speedFactor * baseAlpha * 0.35f;
        alpha -= fadeAmount;

        if ("PENCIL".equals(brushType)) {
            // 铅笔：快速划过时更浅
            alpha -= speedFactor * baseAlpha * 0.15f;
        } else {
            // 蜡笔：透明度变化较小，更厚实
            alpha += speedFactor * baseAlpha * 0.05f;
        }

        return (int) Math.max(40, Math.min(255, alpha));
    }

    /**
     * 生成手绘抖动偏移
     * @param radius 当前笔触半径
     */
    public float[] jitterOffset(float radius) {
        float maxJitter = Math.max(0.5f, radius * 0.05f);
        float jx = (jitterRandom.nextFloat() - 0.5f) * 2 * maxJitter;
        float jy = (jitterRandom.nextFloat() - 0.5f) * 2 * maxJitter;
        return new float[]{jx, jy};
    }

    /**
     * 计算两个点之间的插值数量
     * @param distance 两点距离
     * @param radius 当前笔触半径
     * @return 应插入的 stamp 数量
     */
    public int computeInterpolationSteps(float distance, float radius) {
        if (radius <= 0) return 1;
        float overlap = 0.55f; // 55% 重叠
        float stepSize = radius * 2 * (1 - overlap);
        return Math.max(1, (int) Math.ceil(distance / stepSize));
    }
}
