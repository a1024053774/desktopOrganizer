const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 获取所有矩形
  getRectangles: () => ipcRenderer.invoke('get-rectangles'),
  
  // 添加新矩形
  addRectangle: (rectangle) => ipcRenderer.invoke('add-rectangle', rectangle),
  
  // 更新矩形
  updateRectangle: (rectangle) => ipcRenderer.invoke('update-rectangle', rectangle),
  
  // 删除矩形
  deleteRectangle: (id) => ipcRenderer.invoke('delete-rectangle', id),
  
  // 打开设置窗口
  openSettings: () => ipcRenderer.invoke('open-settings'),
  
  // 监听矩形更新
  onRectanglesUpdated: (callback) => {
    ipcRenderer.on('rectangles-updated', (_, rectangles) => callback(rectangles));
    
    // 返回清理函数
    return () => {
      ipcRenderer.removeAllListeners('rectangles-updated');
    };
  }
});