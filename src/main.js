process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
});
const { app, BrowserWindow, ipcMain, screen, globalShortcut } = require('electron');
const path = require('path');
const Store = require('electron-store');

// 初始化存储
const store = new Store();

let mainWindow;
let settingsWindow;
let rectangles = store.get('rectangles') || [];


// 创建主窗口（壁纸层）
function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    transparent: true, 
    frame: false,
    skipTaskbar: true,
    backgroundColor: '#00000000', // 完全透明
    opacity: 1.0, // 确保不透明度正确
    hasShadow: false, // 移除阴影
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // 设置窗口点击穿透
  mainWindow.setIgnoreMouseEvents(true);
  
  // 加载主视图
  mainWindow.loadFile(path.join(__dirname, '../views/index.html'));
  
  // 跳过任务栏显示
  mainWindow.setSkipTaskbar(true);
  
}

// 创建设置窗口
function createSettingsWindow() {
  console.log('Creating settings window');
  if (settingsWindow) {
    console.log('Settings window already exists,focusing');
    settingsWindow.focus();
    return;
  }
   // 获取显示器尺寸
   const { width, height } = screen.getPrimaryDisplay().workAreaSize;

   // 调整窗口大小和位置
  settingsWindow = new BrowserWindow({
    width: Math.min(500, width * 0.8),     // 设置合理的宽度
    height: Math.min(600, height * 0.8),   // 设置合理的高度
    minWidth: 400,                         // 最小宽度
    minHeight: 500,                        // 最小高度
    title: '桌面区域设置',
    transparent: false,  // 确保不是透明的
    frame: true,        // 保留窗口框架
    backgroundColor: '#ffffff', // 白色背景
    center: true,                          // 居中显示
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  console.log('load settings window');
  settingsWindow.loadFile(path.join(__dirname, '../views/settings.html'));
  
  

  settingsWindow.on('closed', () => {
    console.log('Settings window closed');
    settingsWindow = null;
  });
  
  // 确保设置窗口在前台
  settingsWindow.setAlwaysOnTop(true);
  settingsWindow.focus();
  
  console.log('Settings window created');
}

// 应用启动完成
app.whenReady().then(() => {
  createMainWindow();
  
  // // 注册快捷键打开设置窗口
  // globalShortcut.register('CommandOrControl+Shift+D', createSettingsWindow);
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });

  const success = globalShortcut.register('CommandOrControl+Shift+D', () => {
    console.log('Shortcut triggered');
    createSettingsWindow();
  });
  
  if (success) {
    console.log('quick key register success');
  } else {
    console.log('quick key register failed');
  }
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

// 应用关闭
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// 退出前保存数据
app.on('before-quit', () => {
  store.set('rectangles', rectangles);
});

// IPC事件处理
ipcMain.handle('get-rectangles', () => {
  return rectangles;
});

ipcMain.handle('add-rectangle', (event, rectangle) => {
  const id = Date.now().toString();
  const newRectangle = { id, ...rectangle };
  rectangles.push(newRectangle);
  mainWindow.webContents.send('rectangles-updated', rectangles);
  return newRectangle;
});

ipcMain.handle('update-rectangle', (event, updatedRectangle) => {
  rectangles = rectangles.map(rect => 
    rect.id === updatedRectangle.id ? updatedRectangle : rect
  );
  mainWindow.webContents.send('rectangles-updated', rectangles);
  return rectangles;
});

ipcMain.handle('delete-rectangle', (event, id) => {
  rectangles = rectangles.filter(rect => rect.id !== id);
  mainWindow.webContents.send('rectangles-updated', rectangles);
  return rectangles;
});

ipcMain.handle('open-settings', () => {
  createSettingsWindow();
});