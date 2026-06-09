#!/usr/bin/env python3
"""裁剪 PNG 透明区域，四周保留 40dp 透明间距，输出 1:1 正方形。

用法:
    python crop_transparent.py                  # 默认间距 40px
    python crop_transparent.py --margin 60     # 自定义间距
    python crop_transparent.py --filter PoliceCar  # 仅处理含关键字文件
"""

import argparse
import os
import sys
from PIL import Image

INPUT_DIR = "drawing_transparent"
OUTPUT_DIR = "drawing_cropped"
DEFAULT_MARGIN = 40


def find_content_bbox(img):
    """返回非透明像素的包围盒 (left, top, right, bottom)，无内容返回 None。"""
    w, h = img.size
    alpha = img.split()[-1].load()

    left = w
    top = h
    right = 0
    bottom = 0

    for y in range(h):
        for x in range(w):
            if alpha[x, y] > 0:
                if x < left:
                    left = x
                if y < top:
                    top = y
                if x > right:
                    right = x
                if y > bottom:
                    bottom = y

    if left > right or top > bottom:
        return None
    return left, top, right + 1, bottom + 1


def crop_and_square(img, margin):
    """裁剪并输出 1:1 正方形。"""
    bbox = find_content_bbox(img)
    if bbox is None:
        return img

    left, top, right, bottom = bbox
    left = max(0, left - margin)
    top = max(0, top - margin)
    right = min(img.width, right + margin)
    bottom = min(img.height, bottom + margin)

    content_w = right - left
    content_h = bottom - top
    side = max(content_w, content_h)

    offset_x = (side - content_w) // 2
    offset_y = (side - content_h) // 2

    result = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    content = img.crop((left, top, right, bottom))
    result.paste(content, (offset_x, offset_y))
    return result


def main():
    parser = argparse.ArgumentParser(description="裁剪透明 PNG")
    parser.add_argument("-m", "--margin", type=int, default=DEFAULT_MARGIN)
    parser.add_argument("-f", "--filter", type=str, default=None)
    args = parser.parse_args()

    if not os.path.isdir(INPUT_DIR):
        print(f"[ERROR] 目录不存在: {INPUT_DIR}")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    png_files = [f for f in os.listdir(INPUT_DIR) if f.lower().endswith(".png")]
    if args.filter:
        png_files = [f for f in png_files if args.filter in f]

    if not png_files:
        print("[INFO] 无匹配文件")
        return

    for filename in png_files:
        in_path = os.path.join(INPUT_DIR, filename)
        out_path = os.path.join(OUTPUT_DIR, filename)

        img = Image.open(in_path).convert("RGBA")
        result = crop_and_square(img, args.margin)
        result.save(out_path, "PNG")
        print(f"[OK] {filename} -> {result.size[0]}x{result.size[1]}")

    print(f"\n完成！处理了 {len(png_files)} 张图片")


if __name__ == "__main__":
    main()
