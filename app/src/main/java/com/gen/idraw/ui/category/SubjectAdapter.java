package com.gen.idraw.ui.category;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.gen.idraw.R;
import com.gen.idraw.model.DrawingCategory;
import com.gen.idraw.model.DrawingSubject;
import com.google.android.material.card.MaterialCardView;

import java.util.List;

public class SubjectAdapter extends RecyclerView.Adapter<SubjectAdapter.ViewHolder> {

    private final List<DrawingSubject> subjects;
    private final DrawingCategory category;
    private OnSubjectSelectedListener listener;

    public interface OnSubjectSelectedListener {
        void onSubjectSelected(DrawingSubject subject);
    }

    public SubjectAdapter(List<DrawingSubject> subjects, DrawingCategory category) {
        this.subjects = subjects;
        this.category = category;
    }

    public void setOnSubjectSelectedListener(OnSubjectSelectedListener listener) {
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_subject, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        DrawingSubject subject = subjects.get(position);
        holder.ivIcon.setImageResource(subject.getIconResId());
        holder.tvName.setText(subject.getName());

        int bgColor;
        int strokeColor;
        switch (category) {
            case ANIMAL:
                bgColor = Color.parseColor("#FFE8F5E9");
                strokeColor = Color.parseColor("#FFA5D6A7");
                break;
            case VEHICLE:
                bgColor = Color.parseColor("#FFE3F2FD");
                strokeColor = Color.parseColor("#FF90CAF9");
                break;
            default:
                bgColor = Color.parseColor("#FFFFF8E1");
                strokeColor = Color.parseColor("#FFFFE082");
                break;
        }
        holder.cardView.setCardBackgroundColor(bgColor);
        holder.cardView.setStrokeColor(strokeColor);

        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onSubjectSelected(subject);
            }
        });
    }

    @Override
    public int getItemCount() {
        return subjects.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        MaterialCardView cardView;
        ImageView ivIcon;
        TextView tvName;

        ViewHolder(View itemView) {
            super(itemView);
            cardView = (MaterialCardView) itemView;
            ivIcon = itemView.findViewById(R.id.iv_icon);
            tvName = itemView.findViewById(R.id.tv_name);
        }
    }
}
