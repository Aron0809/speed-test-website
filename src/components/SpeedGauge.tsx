import React, { useEffect, useRef } from 'react';
import { getSpeedColor, getSpeedRating } from '../utils/speedTest';

interface SpeedGaugeProps {
  value: number;
  label: string;
  max?: number;
  animate?: boolean;
}

const SpeedGauge: React.FC<SpeedGaugeProps> = ({ 
  value, 
  label, 
  max = 100, 
  animate = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetValue = useRef<number>(value);
  const currentValue = useRef<number>(animate ? 0 : value);
  const animationRef = useRef<number>(0);
  
  const rating = getSpeedRating(value);
  const color = getSpeedColor(rating);
  
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.85;

    // Draw background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#e5e7eb'; // Light gray
    ctx.stroke();

    // Calculate percentage of the value
    const percentage = Math.min(currentValue.current, max) / max;
    const endAngle = Math.PI + percentage * Math.PI;

    // Draw value arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, endAngle, false);
    ctx.lineWidth = 15;
    ctx.strokeStyle = color;
    ctx.stroke();

    // Draw center text
    ctx.fillStyle = '#374151'; // Dark gray
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (document.documentElement.classList.contains('dark')) {
      ctx.fillStyle = '#fff'; // White text in dark mode
    }
    
    ctx.fillText(`${currentValue.current.toFixed(1)}`, centerX, centerY - 10);
    
    // Draw unit text
    ctx.font = '14px sans-serif';
    ctx.fillText('Mbps', centerX, centerY + 15);
    
    // Draw label text
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