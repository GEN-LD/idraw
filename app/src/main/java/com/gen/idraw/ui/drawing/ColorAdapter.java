package com.gen.idraw.ui.drawing;

import android.graphics.drawable.GradientDrawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.gen.idraw.R;

public class ColorAdapter extends RecyclerView.Adapter<ColorAdapter.ViewHolder> {

    private final int[] colors;
    private int selectedPosition = 2; // Default: red
    private int itemHeightPx = -1;

    public interface OnColorSelectedListener {
        void onColorSelected(int color, int position);
    }

    private OnColorSelectedListener listener;

    public ColorAdapter(int[] colors) {
        this.colors = colors;
    }

    public void setItemHeight(int px) {
        this.itemHeightPx = px;
        notifyDataSetChanged();
    }

    public void setOnColorSelectedListener(OnColorSelectedListener listener) {
        this.listener = listener;
    }

    public void setSelectedPosition(int position) {
        int oldPos = selectedPosition;
        selectedPosition = position;
        notifyItemChanged(oldPos);
        notifyItemChanged(position);
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_color_swatch, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        int color = colors[position];
        View swatch = holder.swatchView;

        GradientDrawable drawable = new GradientDrawable();
        drawable.setShape(GradientDrawable.RECTANGLE);
        drawable.setCornerRadius(6f);
        drawable.setColor(color);

        if (position == selectedPosition) {
            drawable.setStroke(3, 0xFFFFFFFF);
        } else {
            drawable.setStroke(1, 0x33888888);
        }

        if (itemHeightPx > 0) {
            ViewGroup.LayoutParams params = swatch.getLayoutParams();
            params.height = itemHeightPx;
            swatch.setLayoutParams(params);
        }

        swatch.setBackground(drawable);
        swatch.setOnClickListener(v -> {
            int oldPos = selectedPosition;
            selectedPosition = holder.getAdapterPosition();
            notifyItemChanged(oldPos);
            notifyItemChanged(selectedPosition);
            if (listener != null) {
                listener.onColorSelected(colors[selectedPosition], selectedPosition);
            }
        });
    }

    @Override
    public int getItemCount() {
        return colors.length;
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        View swatchView;

        ViewHolder(View itemView) {
            super(itemView);
            swatchView = itemView.findViewById(R.id.swatch_view);
        }
    }
}
