package com.gen.idraw.ui.category;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import com.gen.idraw.R;
import com.gen.idraw.databinding.ActivityCategoryBinding;
import com.gen.idraw.model.DrawingCategory;
import com.gen.idraw.ui.drawing.DrawingActivity;
import com.gen.idraw.ui.settings.SettingsActivity;

public class CategoryActivity extends AppCompatActivity {

    private ActivityCategoryBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityCategoryBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        hideSystemBars();

        binding.btnBack.setOnClickListener(v -> finish());

        binding.cardAnimal.setOnClickListener(v -> openCategory(DrawingCategory.ANIMAL));
        binding.cardVehicle.setOnClickListener(v -> openCategory(DrawingCategory.VEHICLE));
        binding.cardBlank.setOnClickListener(v -> openBlankCanvas());
    }

    private void openCategory(DrawingCategory category) {
        Intent intent = new Intent(this, SubjectActivity.class);
        intent.putExtra(SubjectActivity.EXTRA_CATEGORY, category.name());
        startActivity(intent);
    }

    private void openBlankCanvas() {
        Intent intent = new Intent(this, DrawingActivity.class);
        intent.putExtra(DrawingActivity.EXTRA_LINE_ART_RES_ID, 0);
        startActivity(intent);
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
