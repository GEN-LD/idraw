package com.gen.idraw.ui.main;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.gen.idraw.R;
import com.gen.idraw.databinding.ActivityMainBinding;
import com.gen.idraw.ui.drawing.DrawingActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityMainBinding binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        binding.btnColoringMode.setOnClickListener(v ->
                Toast.makeText(this, R.string.coloring_coming_soon, Toast.LENGTH_SHORT).show()
        );

        binding.btnDrawingMode.setOnClickListener(v ->
                startActivity(new Intent(this, DrawingActivity.class))
        );
    }
}
