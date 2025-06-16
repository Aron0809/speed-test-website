import { SpeedRating } from '../types';

/**
 * 根据速度评级获取对应的CSS类名
 */
export const getRatingClass = (rating: SpeedRating): string => {
  const ratingClasses: Record<SpeedRating, string> = {
    poor: 'text-red-500',
    fair: 'text-amber-500', 
    good: 'text-green-500',
    excellent: 'text-blue-500'
  };
  return ratingClasses[rating];
};

/**
 * 获取速度评级的显示文本
 */
export const getRatingLabel = (rating: SpeedRating): string => {
  return rating.charAt(0).toUpperCase() + rating.slice(1);
};

/**
 * 检查是否为暗色主题
 */
export const isDarkMode = (): boolean => {
  return document.documentElement.classList.contains('dark');
};

/**
 * 获取暗色主题对应的文本颜色
 */
export const getThemeTextColor = (): string => {
  return isDarkMode() ? '#fff' : '#374151';
};

/**
 * 合并CSS类名（来自clsx和tailwind-merge）
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 