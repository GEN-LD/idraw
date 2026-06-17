# iDraw 前端

本项目是 Android 儿童画画 App **iDraw** 的 Web 重写版本，使用 React + Vite 开发。

## 功能

- 首页：选择「涂色模式」（即将上线）或「画画模式」
- 类别选择：动物、交通工具、空白画布
- 主题选择：按类别展示主题列表
- 画画页：钢笔 / 橡皮擦、三档尺寸、9 种颜色、撤销、清空
- 设置页：背景音乐、音效、音量调节，数据保存在浏览器 localStorage

## HTTP 访问方式

### 方式一：开发服务器

```bash
cd frontend
npm install
npm run dev
```

浏览器访问：<http://localhost:5173>

### 方式二：生产构建 + Python 静态服务器

```bash
cd frontend
npm install
npm run build
python3 -m http.server 8080 --directory dist
```

浏览器访问：<http://localhost:8080>

或使用一键脚本（默认 8080 端口）：

```bash
cd frontend
./start.sh
```

若 8080 端口被占用，可指定其他端口：

```bash
cd frontend
PORT=8888 ./start.sh
```

### 方式三：Vite 预览

```bash
cd frontend
npm run build
npm run preview
```

浏览器访问：<http://localhost:4173>

## 项目结构

```
frontend/
├── src/
│   ├── pages/          # 页面组件
│   ├── components/     # 可复用组件
│   ├── hooks/          # 自定义 Hooks
│   ├── utils/          # 工具函数与数据
│   └── assets/icons/   # SVG 图标组件
├── dist/               # 构建产物
├── index.html
├── package.json
└── start.sh            # 一键启动脚本
```

## 路由

使用 HashRouter，支持任意静态文件服务器直接部署。

```
/#/                 首页
/#/category         类别选择
/#/subjects/animal  动物主题
/#/subjects/vehicle 交通工具主题
/#/draw             画画页
/#/settings         设置页
```
