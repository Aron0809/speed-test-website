/**
 * 设置画布的设备像素比以获得清晰的渲染效果
 */
export const setupCanvasPixelRatio = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const ctx = canvas.getContext('2d')!;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  ctx.scale(dpr, dpr);
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  
  return ctx;
};

/**
 * 检查是否为暗色主题
 */
export const isDarkTheme = (): boolean => {
  return document.documentElement.classList.contains('dark');
};

/**
 * 获取主题相关的颜色
 */
export const getThemeColors = () => {
  const isDark = isDarkTheme();
  return {
    background: isDark ? '#374151' : '#e5e7eb',
    text: isDark ? '#fff' : '#374151',
    gridLines: isDark ? '#374151' : '#e5e7eb'
  };
};

/**
 * 清除画布
 */
export const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height);
};

/**
 * 绘制圆弧
 */
export const drawArc = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  color: string,
  lineWidth: number = 15
) => {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}; 