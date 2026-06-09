package com.gen.idraw.ui.category;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.gen.idraw.R;
import com.gen.idraw.model.DrawingSubject;

import java.util.List;

public class SubjectAdapter extends RecyclerView.Adapter<SubjectAdapter.ViewHolder> {

    private final List<DrawingSubject> subjects;
    private OnSubjectSelectedListener listener;

    public interface OnSubjectSelectedListener {
        void onSubjectSelected(DrawingSubject subject);
    }

    public SubjectAdapter(List<DrawingSubject> subjects) {
        this.subjects = subjects;
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
        ImageView ivIcon;
        TextView tvName;

        ViewHolder(View itemView) {
            super(itemView);
            ivIcon = itemView.findViewById(R.id.iv_icon);
            tvName = itemView.findViewById(R.id.tv_name);
        }
    }
}
