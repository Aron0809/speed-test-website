import { useEffect, useRef } from 'react';
import { getSpeedColor, getSpeedRating } from '../utils/speedTest';
import { setupCanvasPixelRatio, getThemeColors } from '../utils/canvas-helpers';

interface SpeedGraphProps {
  data: number[];
  label: string;
  height?: number;
  maxPoints?: number;
}

const SpeedGraph = ({ 
  data, 
  label, 
  height = 120,
  maxPoints = 20
}: SpeedGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 设置画布像素比并获取上下文
    const ctx = setupCanvasPixelRatio(canvas);
    canvas.style.height = `${height}px`;
    
    // 清除画布
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (data.length === 0) return;
    
    // Display only the last maxPoints data points
    const displayData = data.slice(-maxPoints);
    
    // Find max value to scale the graph
    const maxValue = Math.max(...displayData, 1); // Ensure at least 1 for scaling
    
    // Calculate dimensions
    const padding = 20;
    const graphWidth = rect.width - padding * 2;
    const graphHeight = height - padding * 2;
    
    // 绘制背景网格
    const themeColors = getThemeColors();
    ctx.strokeStyle = themeColors.gridLines;
    ctx.lineWidth = 0.5;
    
    // 绘制水平网格线
    for (let i = 0; i <= 4; i++) {
      const y = padding + (graphHeight * i) / 4;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
    }
    
    // Draw data points and lines
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    
    // Calculate average speed for color
    const avgSpeed = displayData.reduce((sum, val) => sum + val, 0) / displayData.length;
    const rating = getSpeedRating(avgSpeed);
    const lineColor = getSpeedColor(rating);
    
    // Draw filled area beneath the line
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    displayData.forEach((value, index) => {
      const x = padding + (index * graphWidth) / Math.max(displayData.length - 1, 1);
      const y = height - padding - (value / maxValue) * graphHeight;
      ctx.lineTo(x, y);
    });
    
    ctx.lineTo(rect.width - padding, height - padding);
    ctx.closePath();
    
    // Add gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${lineColor}50`); // Semi-transparent color at top
    gradient.addColorStop(1, `${lineColor}05`); // Almost transparent at bottom
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw the actual line
    ctx.beginPath();
    
    displayData.forEach((value, index) => {
      const x = padding + (index * graphWidth) / Math.max(displayData.length - 1, 1);
      const y = height - padding - (value / maxValue) * graphHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.strokeStyle = lineColor;
    ctx.stroke();
    
    // Draw data points
    displayData.forEach((value, index) => {
      const x = padding + (index * graphWidth) / Math.max(displayData.length - 1, 1);
      const y = height - padding - (value / maxValue) * graphHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = lineColor;
      ctx.fill();
    });
    
    // 绘制标签
    ctx.fillStyle = themeColors.text;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, rect.width / 2, height - 5);
    
    // 绘制最大值
    ctx.textAlign = 'right';
    ctx.fillText(`Max: ${Math.max(...displayData).toFixed(2)} Mbps`, rect.width - padding, padding - 5);
    
  }, [data, label, height, maxPoints]);
  
  const handleResize = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = height;
    }
  };
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [height]);
  
  return (
    <div className="w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full" 
        style={{ height: `${height}px` }}
      ></canvas>
    </div>
  );
};

export default SpeedGraph;