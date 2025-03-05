# 桌面区域组织器

一个基于 Electron 的应用程序，可在桌面上创建苹果风格的半透明圆角矩形区域，帮助用户更好地组织和分类桌面文件。

## 功能特点

- 在桌面壁纸上创建苹果风格的半透明圆角矩形区域
- 可自定义矩形的标题、位置、大小、颜色和模糊度
- 矩形区域显示在桌面上，不会干扰用户操作桌面图标
- 使用快捷键 `Ctrl+Shift+D` 快速打开设置窗口
- 自动保存区域设置，应用重启后保持不变

## 安装步骤

### 环境要求

- [Node.js](https://nodejs.org/) (v14.0.0 或更高版本)
- [npm](https://www.npmjs.com/) (通常随 Node.js 一起安装)

### 安装依赖

1. 克隆此仓库到本地:
2. 安装所需依赖:
   ```npm
   npm install
   ```

### 必要的依赖包

* **生产依赖** :
* `electron`: ^25.0.0
* `electron-store`: ^8.1.0
* **开发依赖** :
* `electron-builder`: ^24.4.0

## 使用方法

### 运行应用

```
npm start
```

### 创建桌面区域

1. 启动应用后，使用快捷键 `Ctrl+Shift+D` 打开设置窗口
2. 在设置窗口中，使用表单添加新的桌面区域
3. 设置区域的标题、位置、大小、颜色和模糊度
4. 点击"添加"按钮创建新区域
5. 在设置窗口中可以选择已创建的区域进行编辑或删除

### 构建应用安装包

```
npm run build
```

构建后的安装包将保存在 `dist` 目录中。

## 项目结构

```
desktop-organizer/
├── src/                    # 源代码目录
│   ├── main.js             # Electron 主进程
│   ├── preload.js          # 预加载脚本
│   ├── renderer.js         # 渲染进程脚本
│   └── components/         # 组件目录
│       ├── Rectangle.js    # 矩形组件
│       └── Controls.js     # 控制面板组件
├── assets/                 # 资源文件目录
│   └── styles/             # 样式文件
│       └── main.css        # 主样式表
├── views/                  # 视图目录
│   ├── index.html          # 主窗口 HTML
│   └── settings.html       # 设置窗口 HTML
├── package.json            # 项目配置和依赖
└── README.md               # 项目文档
```

## 开发说明

### 主要文件说明

* [main.js](vscode-file://vscode-app/d:/DevelopmentSoftware/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Electron 主进程，负责创建窗口和处理 IPC 通信
* [preload.js](vscode-file://vscode-app/d:/DevelopmentSoftware/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): 预加载脚本，为渲染进程安全地暴露主进程 API
* `renderer.js`: 渲染进程脚本，处理 UI 渲染和用户交互
* `Rectangle.js`: 矩形类，定义矩形区域的属性和方法
* `Controls.js`: 控制面板类，处理设置窗口中的用户界面逻辑

### 已知问题和限制

* 由于操作系统限制，在某些 Windows 版本中可能无法完全实现窗口位于桌面图标下方
* 在某些高 DPI 显示器上可能需要进行额外的缩放调整

### 自定义开发

1. 修改 `main.css` 文件来自定义矩形区域的样式
2. 在 `Rectangle.js` 中可以添加更多属性来扩展矩形功能
3. 编辑 `Controls.js` 来添加更多控制选项
## 下载
你可以从[这里](https://github.com/a1024053774/desktopOrganizer/releases/latest)下载最新版本。
