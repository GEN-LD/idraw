package com.gen.idraw.util;

import android.view.View;

public class ViewUtils {

    public static void animateClick(View view, Runnable onComplete) {
        view.animate()
                .scaleX(0.7f)
                .scaleY(0.7f)
                .setDuration(100)
                .withEndAction(() -> view.animate()
                        .scaleX(1f)
                        .scaleY(1f)
                        .setDuration(100)
                        .withEndAction(onComplete)
                        .start())
                .start();
    }
}
