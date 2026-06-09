package com.gen.idraw.util;

import android.content.Context;
import android.content.SharedPreferences;

public class SettingsManager {

    private static final String PREFS_NAME = "idraw_settings";
    private static final String KEY_BG_MUSIC = "bg_music_enabled";
    private static final String KEY_SOUND_EFFECTS = "sound_effects_enabled";
    private static final String KEY_VOLUME = "volume";

    private static SettingsManager instance;
    private final SharedPreferences prefs;

    private SettingsManager(Context context) {
        prefs = context.getApplicationContext().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    public static synchronized SettingsManager getInstance(Context context) {
        if (instance == null) {
            instance = new SettingsManager(context);
        }
        return instance;
    }

    public boolean isBgMusicEnabled() {
        return prefs.getBoolean(KEY_BG_MUSIC, true);
    }

    public void setBgMusicEnabled(boolean enabled) {
        prefs.edit().putBoolean(KEY_BG_MUSIC, enabled).apply();
    }

    public boolean isSoundEffectsEnabled() {
        return prefs.getBoolean(KEY_SOUND_EFFECTS, true);
    }

    public void setSoundEffectsEnabled(boolean enabled) {
        prefs.edit().putBoolean(KEY_SOUND_EFFECTS, enabled).apply();
    }

    public int getVolume() {
        return prefs.getInt(KEY_VOLUME, 70);
    }

    public void setVolume(int volume) {
        prefs.edit().putInt(KEY_VOLUME, Math.max(0, Math.min(100, volume))).apply();
    }
}
