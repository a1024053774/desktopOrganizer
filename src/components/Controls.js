class Controls {
  constructor(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.selectedRectangle = null;
    
    this.init();
  }
  
  init() {
    this.createForm();
    this.createRectanglesList();
  }
  
  createForm() {
    // 创建表单容器
    const form = document.createElement('form');
    form.id = 'rectangle-form';
    form.className = 'controls-form';
    
    // 标题输入
    form.innerHTML = `
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" id="title" name="title">
      </div>
      
      <div class="form-group">
        <label for="width">宽度</label>
        <input type="number" id="width" name="width" value="300">
      </div>
      
      <div class="form-group">
        <label for="height">高度</label>
        <input type="number" id="height" name="height" value="200">
      </div>
      
      <div class="form-group">
        <label for="x">X 位置</label>
        <input type="number" id="x" name="x" value="100">
      </div>
      
      <div class="form-group">
        <label for="y">Y 位置</label>
        <input type="number" id="y" name="y" value="100">
      </div>
      
      <div class="form-group">
        <label for="color">背景颜色</label>
        <input type="color" id="color-base" name="color-base" value="#ffffff">
        <input type="range" id="opacity" name="opacity" min="0" max="1" step="0.05" value="0.5">
        <span id="opacity-value">0.5</span>
      </div>
      
      <div class="form-group">
        <label for="blur">模糊度</label>
        <input type="range" id="blur" name="blur" min="0" max="30" value="10">
        <span id="blur-value">10px</span>
      </div>
      
      <div class="button-group">
        <button type="button" id="btn-add">添加</button>
        <button type="button" id="btn-update" disabled>更新</button>
        <button type="button" id="btn-delete" disabled>删除</button>
      </div>
    `;
    
    this.container.appendChild(form);
    
    // 添加事件监听
    document.getElementById('opacity').addEventListener('input', (e) => {
      document.getElementById('opacity-value').textContent = e.target.value;
    });
    
    document.getElementById('blur').addEventListener('input', (e) => {
      document.getElementById('blur-value').textContent = `${e.target.value}px`;
    });
    
    document.getElementById('btn-add').addEventListener('click', () => {
      this.handleAddRectangle();
    });
    
    document.getElementById('btn-update').addEventListener('click', () => {
      this.handleUpdateRectangle();
    });
    
    document.getElementById('btn-delete').addEventListener('click', () => {
      this.handleDeleteRectangle();
    });
  }
  
  createRectanglesList() {
    // 创建矩形列表容器
    const listContainer = document.createElement('div');
    listContainer.className = 'rectangles-list';
    listContainer.innerHTML = `
      <h3>已添加的区域</h3>
      <ul id="rectangles-list"></ul>
    `;
    
    this.container.appendChild(listContainer);
  }
  
  updateRectanglesList(rectangles) {
    const list = document.getElementById('rectangles-list');
    list.innerHTML = '';
    
    rectangles.forEach(rect => {
      const item = document.createElement('li');
      item.textContent = rect.title || `区域 ${rect.id.slice(0, 5)}`;
      item.dataset.id = rect.id;
      
      if (this.selectedRectangle && this.selectedRectangle.id === rect.id) {
        item.className = 'selected';
      }
      
      item.addEventListener('click', () => {
        this.selectRectangle(rect);
      });
      
      list.appendChild(item);
    });
  }
  
  selectRectangle(rectangle) {
    this.selectedRectangle = rectangle;
    
    // 更新表单值
    document.getElementById('title').value = rectangle.title || '';
    document.getElementById('width').value = rectangle.width;
    document.getElementById('height').value = rectangle.height;
    document.getElementById('x').value = rectangle.x;
    document.getElementById('y').value = rectangle.y;
    document.getElementById('opacity').value = rectangle.opacity;
    document.getElementById('opacity-value').textContent = rectangle.opacity;
    document.getElementById('blur').value = rectangle.blur;
    document.getElementById('blur-value').textContent = `${rectangle.blur}px`;
    
    // 处理颜色 - 从rgba分离出基础色和透明度
    try {
      const colorBase = rectangle.color.replace(/rgba?\(|\)/g, '').split(',');
      const r = parseInt(colorBase[0].trim()).toString(16).padStart(2, '0');
      const g = parseInt(colorBase[1].trim()).toString(16).padStart(2, '0');
      const b = parseInt(colorBase[2].trim()).toString(16).padStart(2, '0');
      document.getElementById('color-base').value = `#${r}${g}${b}`;
    } catch (e) {
      document.getElementById('color-base').value = '#ffffff';
    }
    
    // 启用更新和删除按钮
    document.getElementById('btn-update').disabled = false;
    document.getElementById('btn-delete').disabled = false;
    
    // 更新列表选择状态
    const items = document.querySelectorAll('#rectangles-list li');
    items.forEach(item => {
      if (item.dataset.id === rectangle.id) {
        item.className = 'selected';
      } else {
        item.className = '';
      }
    });
  }
  
  getFormData() {
    const title = document.getElementById('title').value;
    const width = parseInt(document.getElementById('width').value) || 300;
    const height = parseInt(document.getElementById('height').value) || 200;
    const x = parseInt(document.getElementById('x').value) || 0;
    const y = parseInt(document.getElementById('y').value) || 0;
    const colorBase = document.getElementById('color-base').value;
    const opacity = parseFloat(document.getElementById('opacity').value);
    const blur = parseInt(document.getElementById('blur').value);
    
    // 转换hex颜色到rgba
    const r = parseInt(colorBase.slice(1, 3), 16);
    const g = parseInt(colorBase.slice(3, 5), 16);
    const b = parseInt(colorBase.slice(5, 7), 16);
    const color = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    
    return {
      title,
      width,
      height,
      x,
      y,
      color,
      opacity,
      blur
    };
  }
  
  handleAddRectangle() {
    const data = this.getFormData();
    this.callbacks.onAdd(data);
  }
  
  handleUpdateRectangle() {
    if (!this.selectedRectangle) return;
    
    const data = this.getFormData();
    this.callbacks.onUpdate({
      ...data,
      id: this.selectedRectangle.id
    });
  }
  
  handleDeleteRectangle() {
    if (!this.selectedRectangle) return;
    
    this.callbacks.onDelete(this.selectedRectangle.id);
    this.selectedRectangle = null;
    
    // 重置表单和按钮状态
    document.getElementById('rectangle-form').reset();
    document.getElementById('btn-update').disabled = true;
    document.getElementById('btn-delete').disabled = true;
  }
}

// 导出Controls类
if (typeof module !== 'undefined') {
  module.exports = Controls;
}