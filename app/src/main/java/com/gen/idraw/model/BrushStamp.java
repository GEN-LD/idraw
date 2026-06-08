package com.gen.idraw.model;

/**
 * 单个画笔印章（Stamp）数据。
 * 用于存储沿路径的每个绘制单元：位置、动态半径、颜色、透明度等。
 * 仅用于 PENCIL 和 CRAYON 笔触。
 */
public class BrushStamp {
    public float x;
    public float y;
    public float radius;
    public int color;
    public int alpha;

    public BrushStamp(float x, float y, float radius, int color, int alpha) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.alpha = alpha;
    }
}
