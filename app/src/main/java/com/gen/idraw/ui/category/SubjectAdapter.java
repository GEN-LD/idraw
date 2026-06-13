package com.gen.idraw.ui.category;

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
import com.gen.idraw.util.SoundUtils;
import com.google.android.material.card.MaterialCardView;

import java.util.List;

public class SubjectAdapter extends RecyclerView.Adapter<SubjectAdapter.ViewHolder> {

    private static final int[][] CARD_COLORS = {
            {0xFFFCE4EC, 0xFFF48FB1, 0xFFC2185B},
            {0xFFE3F2FD, 0xFF90CAF9, 0xFF1565C0},
            {0xFFFFF8E1, 0xFFFFE082, 0xFFF57F17},
            {0xFFE8F5E9, 0xFFA5D6A7, 0xFF2E7D32},
            {0xFFF3E5F5, 0xFFCE93D8, 0xFF7B1FA2},
            {0xFFFBE9E7, 0xFFFFAB91, 0xFFE64A19},
    };

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

        int[] colors = CARD_COLORS[position % CARD_COLORS.length];
        holder.cardView.setCardBackgroundColor(colors[0]);
        holder.cardView.setStrokeColor(colors[1]);
        holder.tvName.setTextColor(colors[2]);

        holder.itemView.setOnClickListener(v -> {
            SoundUtils.playClick(v.getContext());
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
