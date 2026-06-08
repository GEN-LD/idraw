package com.gen.idraw.model;

import android.graphics.Paint;

import java.util.ArrayList;
import java.util.List;

public class Stroke {
    private final List<Float> pointsX;
    private final List<Float> pointsY;
    private final List<BrushStamp> stamps;
    private final BrushType brushType;
    private final int color;
    private final float strokeWidth;
    private Paint paint;

    public Stroke(BrushType brushType, int color, float strokeWidth) {
        this.pointsX = new ArrayList<>();
        this.pointsY = new ArrayList<>();
        this.stamps = new ArrayList<>();
        this.brushType = brushType;
        this.color = color;
        this.strokeWidth = strokeWidth;
    }

    public void addPoint(float x, float y) {
        pointsX.add(x);
        pointsY.add(y);
    }

    public int getPointCount() {
        return pointsX.size();
    }

    public float getPointX(int index) {
        return pointsX.get(index);
    }

    public float getPointY(int index) {
        return pointsY.get(index);
    }

    public void addStamp(BrushStamp stamp) {
        stamps.add(stamp);
    }

    public List<BrushStamp> getStamps() {
        return stamps;
    }

    public boolean hasStamps() {
        return !stamps.isEmpty();
    }

    public BrushType getBrushType() {
        return brushType;
    }

    public int getColor() {
        return color;
    }

    public float getStrokeWidth() {
        return strokeWidth;
    }

    public Paint getPaint() {
        return paint;
    }

    public void setPaint(Paint paint) {
        this.paint = paint;
    }
}
