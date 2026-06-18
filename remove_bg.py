#!/usr/bin/env python3
"""移除 PNG 图片的浅色背景（白色/浅黄/浅灰），转为透明。

用法:
    python remove_bg.py                          # 默认阈值 180
    python remove_bg.py --threshold 160          # 指定阈值
    python remove_bg.py --filter PoliceCar       # 仅处理含关键字文件
"""

import argparse
import os
import sys
from PIL import Image

INPUT_DIR = "drawing"
OUTPUT_DIR = "drawing_transparent"
DEFAULT_THRESHOLD = 180
SOFT_EDGE_RANGE = 40


def luminance(r, g, b):
    return 0.299 * r + 0.587 * g + 0.114 * b


def make_transparent(img, threshold):
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            lum = luminance(r, g, b)
            if lum >= threshold + SOFT_EDGE_RANGE:
                pixels[x, y] = (r, g, b, 0)
            elif lum > threshold:
                ratio = (lum - threshold) / SOFT_EDGE_RANGE
                new_alpha = int(a * (1 - ratio))
                pixels[x, y] = (r, g, b, new_alpha)

    return img


def main():
    parser = argparse.ArgumentParser(description="移除 PNG 浅色背景")
    parser.add_argument("-t", "--threshold", type=int, default=DEFAULT_THRESHOLD)
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
        print(f"[INFO] 无匹配文件")
        return

    for filename in png_files:
        in_path = os.path.join(INPUT_DIR, filename)
        out_path = os.path.join(OUTPUT_DIR, filename)

        img = Image.open(in_path)
        result = make_transparent(img, args.threshold)
        result.save(out_path, "PNG")
        print(f"[OK] {filename} (threshold={args.threshold})")

    print(f"\n完成！处理了 {len(png_files)} 张图片")


if __name__ == "__main__":
    main()
