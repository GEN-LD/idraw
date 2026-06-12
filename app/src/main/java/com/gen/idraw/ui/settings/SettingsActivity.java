package com.gen.idraw.ui.settings;

import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import com.gen.idraw.databinding.ActivitySettingsBinding;
import com.gen.idraw.util.SettingsManager;

public class SettingsActivity extends AppCompatActivity {

    private ActivitySettingsBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivitySettingsBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        hideSystemBars();

        SettingsManager settings = SettingsManager.getInstance(this);

        binding.switchBgMusic.setChecked(settings.isBgMusicEnabled());
        binding.switchSoundEffects.setChecked(settings.isSoundEffectsEnabled());
        binding.sliderVolume.setValue(settings.getVolume());

        binding.btnBack.setOnClickListener(v -> ViewUtils.animateClick(v, () -> finish()));

        binding.switchBgMusic.setOnCheckedChangeListener((buttonView, isChecked) ->
                settings.setBgMusicEnabled(isChecked));

        binding.switchSoundEffects.setOnCheckedChangeListener((buttonView, isChecked) ->
                settings.setSoundEffectsEnabled(isChecked));

        binding.sliderVolume.addOnChangeListener((slider, value, fromUser) ->
                settings.setVolume((int) value));
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
