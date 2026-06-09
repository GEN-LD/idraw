package com.gen.idraw.ui.drawing;

import android.graphics.drawable.GradientDrawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.gen.idraw.R;

public class ColorAdapter extends RecyclerView.Adapter<ColorAdapter.ViewHolder> {

    private final int[] colors;
    private int selectedPosition = -1;
    private int unselectedHeightPx = -1;
    private int selectedHeightPx = -1;
    private int widthOverflowPx;

    public interface OnColorSelectedListener {
        void onColorSelected(int color, int position);
    }

    private OnColorSelectedListener listener;

    public ColorAdapter(int[] colors) {
        this.colors = colors;
    }

    public void setItemSizes(int unselectedH, int selectedH, int widthOverflow) {
        this.unselectedHeightPx = unselectedH;
        this.selectedHeightPx = selectedH;
        this.widthOverflowPx = widthOverflow;
        notifyDataSetChanged();
    }

    public void setOnColorSelectedListener(OnColorSelectedListener listener) {
        this.listener = listener;
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
        boolean selected = position == selectedPosition;

        GradientDrawable drawable = new GradientDrawable();
        drawable.setShape(GradientDrawable.RECTANGLE);
        drawable.setColor(color);
        drawable.setCornerRadii(new float[]{20f, 20f, 0f, 0f, 0f, 0f, 20f, 20f});

        if (selected) {
            drawable.setStroke(3, 0xFFFFFFFF);
        } else {
            drawable.setStroke(1, 0x33888888);
        }

        swatch.setBackground(drawable);

        int height = selected ? selectedHeightPx : unselectedHeightPx;
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, height);
        if (selected && widthOverflowPx > 0) {
            params.leftMargin = -widthOverflowPx;
        }
        swatch.setLayoutParams(params);

        swatch.setOnClickListener(v -> {
            int oldPos = selectedPosition;
            selectedPosition = holder.getAdapterPosition();
            if (oldPos >= 0) {
                notifyItemChanged(oldPos);
            }
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
