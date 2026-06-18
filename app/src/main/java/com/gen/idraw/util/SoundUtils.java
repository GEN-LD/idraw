package com.gen.idraw.util;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.SoundPool;

import com.gen.idraw.R;

public class SoundUtils {

    private static SoundPool soundPool;
    private static int soundId;
    private static boolean loaded;

    public static void init(Context context) {
        SoundPool.Builder builder = new SoundPool.Builder();
        builder.setMaxStreams(3);
        builder.setAudioAttributes(new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_ASSISTANCE_SONIFICATION)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build());
        soundPool = builder.build();
        soundPool.setOnLoadCompleteListener((sp, sampleId, status) -> loaded = (status == 0));
        soundId = soundPool.load(context, R.raw.sound_click, 1);
        loaded = false;
    }

    public static void playClick(Context context) {
        SettingsManager settings = SettingsManager.getInstance(context);
        if (!settings.isSoundEffectsEnabled()) return;

        if (soundPool == null) {
            init(context);
        }
        if (loaded) {
            float volume = settings.getVolume() / 100f;
            soundPool.play(soundId, volume, volume, 1, 0, 1f);
        }
    }

    public static void release() {
        if (soundPool != null) {
            soundPool.release();
            soundPool = null;
            loaded = false;
        }
    }
}
