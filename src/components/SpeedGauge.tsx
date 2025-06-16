import { useEffect, useRef } from 'react';
import { getSpeedColor, getSpeedRating } from '../utils/speedTest';
import { clearCanvas, drawArc, getThemeColors } from '../utils/canvas-helpers';

interface SpeedGaugeProps {
  value: number;
  label: string;
  max?: number;
  animate?: boolean;
}

const SpeedGauge = ({ 
  value, 
  label, 
  max = 100, 
  animate = true 
}: SpeedGaugeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetValue = useRef<number>(value);
  const currentValue = useRef<number>(animate ? 0 : value);
  const animationRef = useRef<number>(0);
  
  const rating = getSpeedRating(value);
  const color = getSpeedColor(rating);
  
  // 绘制仪表盘
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const themeColors = getThemeColors();
    clearCanvas(ctx, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.85;

    // 绘制背景圆弧
    drawArc(ctx, centerX, centerY, radius, Math.PI, 2 * Math.PI, themeColors.background);

    // 计算值的百分比
    const percentage = Math.min(currentValue.current, max) / max;
    const endAngle = Math.PI + percentage * Math.PI;

    // 绘制数值圆弧
    drawArc(ctx, centerX, centerY, radius, Math.PI, endAngle, color);

    // 绘制中央文本
    ctx.fillStyle = themeColors.text;
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${currentValue.current.toFixed(1)}`, centerX, centerY - 10);
    
    // 绘制单位文本
    ctx.font = '14px sans-serif';
    ctx.fillText('Mbps', centerX, centerY + 15);
    
    // 绘制标签文本
    ctx.font = '16px sans-serif';
    ctx.fillText(label, centerX, centerY + 50);
  };

  const animateGauge = () => {
    if (Math.abs(currentValue.current - targetValue.current) < 0.1) {
      currentValue.current = targetValue.current;
      draw();
      return;
    }

    currentValue.current += (targetValue.current - currentValue.current) * 0.1;
    draw();
    animationRef.current = requestAnimationFrame(animateGauge);
  };

  useEffect(() => {
    targetValue.current = value;
    
    if (animate) {
      animationRef.current = requestAnimationFrame(animateGauge);
    } else {
      currentValue.current = value;
      draw();
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [value, animate]);

  useEffect(() => {
    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        draw();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-48">
      <canvas 
        ref={canvasRef} 
        width="200" 
        height="200" 
        className="w-full h-full"
      ></canvas>
    </div>
  );
};

export default SpeedGauge;