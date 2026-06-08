package com.gen.idraw.ui.drawing;

import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.gen.idraw.R;
import com.gen.idraw.databinding.ActivityDrawingBinding;
import com.gen.idraw.model.BrushType;
import com.gen.idraw.util.BrushFactory;

public class DrawingActivity extends AppCompatActivity {

    private ActivityDrawingBinding binding;
    private BrushType currentBrush = BrushType.PENCIL;
    private int currentColor = 0xFFEF4444; // Red default
    private float currentSizeDp;

    private static final int[] CHILD_FRIENDLY_COLORS = {
            0xFF000000, // Black
            0xFFFFFFFF, // White
            0xFFEF4444, // Red
            0xFFF97316, // Orange
            0xFFEAB308, // Yellow
            0xFF22C55E, // Green
            0xFF06B6D4, // Cyan
            0xFF3B82F6, // Blue
            0xFF8B5CF6, // Purple
            0xFFEC4899, // Pink
            0xFF92400E, // Brown
            0xFF6B7280, // Gray
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityDrawingBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        hideSystemBars();

        currentSizeDp = BrushFactory.getDefaultSizeDp(currentBrush);
        initToolbar();
        initColorPicker();
        initSizeSlider();
        updateBrushUI();
        applyBrushToDrawingView();

        binding.drawingView.setOnDrawingChangedListener(this::updateUndoRedoState);
    }

    private void initToolbar() {
        binding.btnBack.setOnClickListener(v -> finish());

        binding.btnPencil.setOnClickListener(v -> selectBrush(BrushType.PENCIL));
        binding.btnPen.setOnClickListener(v -> selectBrush(BrushType.PEN));
        binding.btnCrayon.setOnClickListener(v -> selectBrush(BrushType.CRAYON));
        binding.btnEraser.setOnClickListener(v -> selectBrush(BrushType.ERASER));

        binding.btnUndo.setOnClickListener(v -> {
            binding.drawingView.undo();
            updateUndoRedoState();
        });
        binding.btnRedo.setOnClickListener(v -> {
            binding.drawingView.redo();
            updateUndoRedoState();
        });
        binding.btnClear.setOnClickListener(v -> showClearConfirmDialog());

        updateUndoRedoState();
    }

    private void selectBrush(BrushType type) {
        currentBrush = type;
        currentSizeDp = BrushFactory.getDefaultSizeDp(type);
        updateBrushUI();
        applyBrushToDrawingView();
    }

    private void applyBrushToDrawingView() {
        binding.drawingView.setBrush(currentBrush, currentColor, currentSizeDp);
    }

    private void initColorPicker() {
        ColorAdapter adapter = new ColorAdapter(CHILD_FRIENDLY_COLORS);
        adapter.setOnColorSelectedListener((color, position) -> {
            currentColor = color;
            applyBrushToDrawingView();
            updateSizePreview();
        });

        binding.rvColors.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        binding.rvColors.setAdapter(adapter);
    }

    private void initSizeSlider() {
        binding.sliderBrushSize.setValueFrom(BrushFactory.getMinSizeDp(currentBrush));
        binding.sliderBrushSize.setValueTo(BrushFactory.getMaxSizeDp(currentBrush));
        binding.sliderBrushSize.setValue(currentSizeDp);

        binding.sliderBrushSize.addOnChangeListener((slider, value, fromUser) -> {
            currentSizeDp = value;
            applyBrushToDrawingView();
            updateSizePreview();
        });
    }

    private void updateBrushUI() {
        // Update brush button selection state
        binding.btnPencil.setActivated(currentBrush == BrushType.PENCIL);
        binding.btnPen.setActivated(currentBrush == BrushType.PEN);
        binding.btnCrayon.setActivated(currentBrush == BrushType.CRAYON);
        binding.btnEraser.setActivated(currentBrush == BrushType.ERASER);

        // Update icon tint for selected/unselected
        updateBrushIconTint(binding.btnPencil, currentBrush == BrushType.PENCIL);
        updateBrushIconTint(binding.btnPen, currentBrush == BrushType.PEN);
        updateBrushIconTint(binding.btnCrayon, currentBrush == BrushType.CRAYON);
        updateBrushIconTint(binding.btnEraser, currentBrush == BrushType.ERASER);

        // Show/hide color panel for eraser
        int colorPanelVisibility = (currentBrush == BrushType.ERASER) ? View.GONE : View.VISIBLE;
        binding.colorPanelScroll.setVisibility(colorPanelVisibility);

        // Update slider range for current brush type
        binding.sliderBrushSize.setValueFrom(BrushFactory.getMinSizeDp(currentBrush));
        binding.sliderBrushSize.setValueTo(BrushFactory.getMaxSizeDp(currentBrush));
        binding.sliderBrushSize.setValue(currentSizeDp);

        updateSizePreview();
    }

    private void updateBrushIconTint(ImageButton button, boolean selected) {
        button.setImageTintList(android.content.res.ColorStateList.valueOf(
                selected ? 0xFFFFFFFF : 0xFF64748B
        ));
    }

    private void updateSizePreview() {
        float previewSizeDp = Math.min(currentSizeDp, 40f);
        float scale = getResources().getDisplayMetrics().density;
        int sizePx = Math.max((int) (previewSizeDp * scale), 8);

        View preview = binding.viewSizePreview;
        android.view.ViewGroup.LayoutParams params = preview.getLayoutParams();
        params.width = sizePx;
        params.height = sizePx;
        preview.setLayoutParams(params);

        GradientDrawable drawable = new GradientDrawable();
        drawable.setShape(GradientDrawable.OVAL);
        if (currentBrush == BrushType.ERASER) {
            drawable.setColor(0xFFCCCCCC);
            drawable.setStroke(1, 0xFF888888);
        } else {
            drawable.setColor(currentColor);
        }
        preview.setBackground(drawable);
    }

    private void updateUndoRedoState() {
        binding.btnUndo.setEnabled(binding.drawingView.canUndo());
        binding.btnRedo.setEnabled(binding.drawingView.canRedo());
        float alpha = 0.4f;
        binding.btnUndo.setAlpha(binding.drawingView.canUndo() ? 1f : alpha);
        binding.btnRedo.setAlpha(binding.drawingView.canRedo() ? 1f : alpha);
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
        if (hasFocus) {
            hideSystemBars();
        }
    }

    private void showClearConfirmDialog() {
        new AlertDialog.Builder(this)
                .setTitle(R.string.clear_confirm_title)
                .setMessage(R.string.clear_confirm_message)
                .setPositiveButton(R.string.confirm, (dialog, which) -> {
                    binding.drawingView.clearCanvas();
                    updateUndoRedoState();
                })
                .setNegativeButton(R.string.cancel, null)
                .show();
    }
}
