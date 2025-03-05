// 渲染进程脚本 - 负责矩形的绘制和交互

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('rectangles-container');
  
  // 获取并显示所有保存的矩形
  const loadRectangles = async () => {
    const rectangles = await window.electronAPI.getRectangles();
    renderRectangles(rectangles);
  };
  
  // 渲染矩形到页面
  const renderRectangles = (rectangles) => {
    container.innerHTML = '';
    
    rectangles.forEach(rect => {
      // 创建矩形元素
      const rectElement = document.createElement('div');
      rectElement.className = 'desktop-rectangle';
      rectElement.id = `rect-${rect.id}`;
      
      // 设置样式
      rectElement.style.width = `${rect.width}px`;
      rectElement.style.height = `${rect.height}px`;
      rectElement.style.left = `${rect.x}px`;
      rectElement.style.top = `${rect.y}px`;
      rectElement.style.backgroundColor = rect.color;
      rectElement.style.backdropFilter = `blur(${rect.blur}px)`;
      
      // 添加标题
      if (rect.title) {
        const titleElement = document.createElement('div');
        titleElement.className = 'rectangle-title';
        titleElement.textContent = rect.title;
        rectElement.appendChild(titleElement);
      }
      
      container.appendChild(rectElement);
    });
  };
  
  // 监听矩形更新
  window.electronAPI.onRectanglesUpdated((rectangles) => {
    renderRectangles(rectangles);
  });
  
  // 初始加载
  await loadRectangles();
  
  // 右键菜单处理 - 打开设置
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    window.electronAPI.openSettings();
  });
});