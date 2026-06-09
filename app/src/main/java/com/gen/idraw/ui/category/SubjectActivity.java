package com.gen.idraw.ui.category;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.gen.idraw.R;
import com.gen.idraw.databinding.ActivitySubjectBinding;
import com.gen.idraw.model.DrawingCategory;
import com.gen.idraw.model.DrawingSubject;
import com.gen.idraw.model.SubjectRepository;
import com.gen.idraw.ui.drawing.DrawingActivity;

import java.util.List;

public class SubjectActivity extends AppCompatActivity {

    public static final String EXTRA_CATEGORY = "extra_category";

    private ActivitySubjectBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivitySubjectBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        hideSystemBars();

        String categoryStr = getIntent().getStringExtra(EXTRA_CATEGORY);
        DrawingCategory category = DrawingCategory.valueOf(categoryStr);

        binding.btnBack.setOnClickListener(v -> finish());
        binding.tvTitle.setText(getCategoryTitle(category));

        List<DrawingSubject> subjects = SubjectRepository.getSubjects(category);
        SubjectAdapter adapter = new SubjectAdapter(subjects);
        adapter.setOnSubjectSelectedListener(this::openDrawing);

        binding.rvSubjects.setLayoutManager(new GridLayoutManager(this, 3, RecyclerView.VERTICAL, false));
        binding.rvSubjects.setAdapter(adapter);
    }

    private void openDrawing(DrawingSubject subject) {
        Intent intent = new Intent(this, DrawingActivity.class);
        startActivity(intent);
    }

    private String getCategoryTitle(DrawingCategory category) {
        switch (category) {
            case ANIMAL:
                return getString(R.string.category_animal);
            case VEHICLE:
                return getString(R.string.category_vehicle);
            default:
                return "";
        }
    }

    private void hideSystemBars() {
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        );
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideSystemBars();
    }
}
