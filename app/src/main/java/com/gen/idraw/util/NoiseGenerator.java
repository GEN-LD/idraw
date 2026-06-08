package com.gen.idraw.util;

/**
 * 2D Value Noise Generator - 用于程序化生成纹理噪点。
 * 参考 Simplex Noise 算法，实现轻量级、可重复、平滑的噪声。
 */
public class NoiseGenerator {

    private final int[] perm = new int[512];
    private final int[] p = new int[256];

    public NoiseGenerator(long seed) {
        // 初始化排列
        for (int i = 0; i < 256; i++) p[i] = i;
        // 基于 seed 的洗牌
        java.util.Random random = new java.util.Random(seed);
        for (int i = 255; i > 0; i--) {
            int j = random.nextInt(i + 1);
            int temp = p[i];
            p[i] = p[j];
            p[j] = temp;
        }
        // 复制一份
        for (int i = 0; i < 512; i++) {
            perm[i] = p[i & 255];
        }
    }

    public NoiseGenerator() {
        this(123456789L);
    }

    /**
     * 2D Value Noise: 返回值范围 [0, 1]
     */
    public float noise(float x, float y) {
        int xi = (int) Math.floor(x) & 255;
        int yi = (int) Math.floor(y) & 255;
        float xf = x - (float) Math.floor(x);
        float yf = y - (float) Math.floor(y);

        float u = fade(xf);
        float v = fade(yf);

        int aa = perm[perm[xi] + yi];
        int ab = perm[perm[xi] + yi + 1];
        int ba = perm[perm[xi + 1] + yi];
        int bb = perm[perm[xi + 1] + yi + 1];

        float x1 = lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u);
        float x2 = lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u);

        return (lerp(x1, x2, v) + 1.0f) / 2.0f;
    }

    /**
     * FBM (Fractal Brownian Motion): 多层噪声叠加
     * 用于生成更自然的纹理
     */
    public float fbm(float x, float y, int octaves, float persistence) {
        float total = 0;
        float frequency = 1;
        float amplitude = 1;
        float maxValue = 0;
        for (int i = 0; i < octaves; i++) {
            total += noise(x * frequency, y * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= persistence;
            frequency *= 2;
        }
        return total / maxValue;
    }

    private float fade(float t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    private float lerp(float a, float b, float t) {
        return a + t * (b - a);
    }

    private float grad(int hash, float x, float y) {
        // 基于 hash 生成方向向量
        int h = hash & 15;
        float u = h < 8 ? x : y;
        float v = h < 4 ? y : h == 12 || h == 14 ? x : 0;
        return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
    }
}
