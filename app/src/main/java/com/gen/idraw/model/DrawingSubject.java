package com.gen.idraw.model;

public class DrawingSubject {

    private final String id;
    private final String name;
    private final DrawingCategory category;
    private final int iconResId;
    private final int lineArtResId;

    public DrawingSubject(String id, String name, DrawingCategory category, int iconResId, int lineArtResId) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.iconResId = iconResId;
        this.lineArtResId = lineArtResId;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public DrawingCategory getCategory() { return category; }
    public int getIconResId() { return iconResId; }
    public int getLineArtResId() { return lineArtResId; }
}
