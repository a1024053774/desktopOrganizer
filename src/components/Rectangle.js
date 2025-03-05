class Rectangle {
  constructor(options = {}) {
    this.id = options.id || null;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 300;
    this.height = options.height || 200;
    this.color = options.color || 'rgba(255, 255, 255, 0.2)';
    this.title = options.title || '';
    this.opacity = options.opacity || 0.5;
    this.blur = options.blur || 10;
  }
  
  // 序列化矩形数据，用于保存
  toJSON() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      color: this.color,
      title: this.title,
      opacity: this.opacity,
      blur: this.blur
    };
  }
  
  // 从JSON创建矩形实例
  static fromJSON(json) {
    return new Rectangle(json);
  }
}

// 导出Rectangle类
if (typeof module !== 'undefined') {
  module.exports = Rectangle;
}