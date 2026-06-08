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
