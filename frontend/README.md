# iDraw 前端

本项目是 Android 儿童画画 App **iDraw** 的 Web 重写版本，使用 React + Vite 开发。

## 功能

- 首页：选择「涂色模式」（即将上线）或「画画模式」
- 类别选择：动物、交通工具、空白画布
- 主题选择：按类别展示主题列表
- 画画页：钢笔 / 橡皮擦、三档尺寸、9 种颜色、撤销、清空
- 设置页：背景音乐、音效、音量调节，数据保存在浏览器 localStorage

## HTTP 访问方式

应用以 `/idraw` 子路径对外提供访问，配合 Nginx 反向代理使用。

### 方式一：开发服务器

```bash
cd frontend
npm install
npm run dev
```

浏览器访问：<http://localhost:5173>（开发模式默认从根路径访问，如需 `/idraw` 子路径请用 Nginx 反代）

### 方式二：生产构建 + Nginx 反向代理

```bash
cd frontend
npm install
npm run build
PORT=8888 ./start.sh
```

上游服务监听 `127.0.0.1:8888`，仅本机访问。然后使用 `deploy/nginx.conf` 配置 Nginx：

```nginx
location /idraw/ {
    proxy_pass http://127.0.0.1:8888/;
    ...
}
```

浏览器访问：<http://your-host/idraw/>

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

使用 HashRouter，配合 `/idraw` 子路径部署时的完整 URL：

```
/idraw/#/                 首页
/idraw/#/category         类别选择
/idraw/#/subjects/animal  动物主题
/idraw/#/subjects/vehicle 交通工具主题
/idraw/#/draw             画画页
/idraw/#/settings         设置页
```
