package com.gen.idraw.ui.main;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.gen.idraw.R;
import com.gen.idraw.databinding.ActivityMainBinding;
import com.gen.idraw.ui.category.CategoryActivity;
import com.gen.idraw.ui.drawing.DrawingActivity;
import com.gen.idraw.ui.settings.SettingsActivity;
import com.gen.idraw.util.ViewUtils;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityMainBinding binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        hideSystemBars();

        binding.btnColoringMode.setOnClickListener(v -> {
            Toast toast = Toast.makeText(this, R.string.coloring_coming_soon, Toast.LENGTH_LONG);
            toast.show();
            new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(toast::cancel, 1000);
        });

        binding.btnDrawingMode.setOnClickListener(v ->
                startActivity(new Intent(this, CategoryActivity.class))
        );

        binding.btnSettings.setOnClickListener(v ->
                ViewUtils.animateClick(v, () -> startActivity(new Intent(this, SettingsActivity.class)))
        );
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
