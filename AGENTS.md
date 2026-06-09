# Agent Workflows

## 项目规范

本项目为 Android 儿童画画 App（iDraw），使用 Java + Android SDK 开发。

## 开发工作流

**每次修改完成后必须执行以下步骤：**

1. **编译** - 运行 `./gradlew assembleDebug` 确保编译成功
2. **安装** - 运行 `adb install -r app/build/outputs/apk/debug/app-debug.apk` 安装到手机
3. **提交** - 运行 `git add -A && git commit -m "<修改描述>"`

**执行顺序：** 编译 → 安装 → 提交

**手机设备：** 通过 `adb devices` 检查当前连接设备

## 提交信息规范

- 使用中文描述
- 首行简要总结（50字以内）
- 后续行详细说明修改内容
- 示例：
  ```
  feat: 添加钢笔笔触
  - 实现 Path 绘制方式
  - 透明度 255，端点圆形
  ```

## 技术栈

- Java 17
- Android SDK 35（minSdk 29）
- Gradle 8.14
- ConstraintLayout
- RecyclerView
- Material Slider
- Material SwitchMaterial

## 导航流程

```
首页
  ├── 画画模式 → 类别选择 (CategoryActivity)
  │     ├── 动物 → 主题选择 (SubjectActivity)
  │     │     ├── 熊猫 → 画画 (DrawingActivity)
  │     │     ├── 小兔子 → 画画
  │     │     ├── 小鸡 → 画画
  │     │     └── 长颈鹿 → 画画
  │     ├── 交通工具 → 主题选择
  │     │     ├── 挖掘机 → 画画
  │     │     ├── 消防车 → 画画
  │     │     ├── 救护车 → 画画
  │     │     ├── 警车 → 画画
  │     │     └── 自行车 → 画画
  │     └── 空白画布 → 画画
  └── 设置按钮 → 设置 (SettingsActivity)
        ├── 背景音乐开关
        ├── 音效开关
        └── 音量滑动条
```

## 画笔工具

- **钢笔 (PEN)**: 20/30/40 三档尺寸
- **橡皮擦 (ERASER)**: 25/35/45 三档尺寸
- 颜色: 9种儿童友好色（红、橙、黄、绿、青、蓝、紫、粉、棕）

## 项目结构

```
app/src/main/java/com/gen/idraw/
├── model/
│   ├── BrushType.java          # 画笔类型枚举
│   ├── DrawingCategory.java    # 类别枚举
│   ├── DrawingSubject.java     # 主题数据类
│   ├── SubjectRepository.java  # 主题仓库
│   └── Stroke.java             # 笔画数据
├── view/
│   └── DrawingView.java        # 画布视图
├── ui/
│   ├── main/
│   │   └── MainActivity.java   # 首页
│   ├── category/
│   │   ├── CategoryActivity.java    # 类别选择
│   │   ├── SubjectActivity.java     # 主题选择
│   │   └── SubjectAdapter.java      # 主题适配器
│   ├── drawing/
│   │   ├── DrawingActivity.java     # 画画页
│   │   └── ColorAdapter.java        # 颜色适配器
│   └── settings/
│       └── SettingsActivity.java    # 设置页
├── util/
│   ├── BrushFactory.java       # 画笔工厂
│   └── SettingsManager.java    # 设置管理器
└── IdrawApplication.java       # 应用入口
```
