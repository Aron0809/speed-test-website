import { useState, useEffect } from 'react';
import { HistoricalData, SpeedTestResult } from '../types';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'speedtest_history';

/**
 * 管理速度测试历史数据的自定义hook
 */
export const useTestHistory = () => {
  const [history, setHistory] = useState<HistoricalData[]>([]);
  
  // 从本地存储加载历史数据
  useEffect(() => {
    const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // 将字符串时间戳转换回Date对象
        const processedHistory = parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(processedHistory);
      } catch (error) {
        console.error('Failed to parse history:', error);
      }
    }
  }, []);
  
  // 保存历史数据到本地存储
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);
  
  // 添加新的测试结果
  const addTestResult = (result: SpeedTestResult) => {
    const newHistoryItem: HistoricalData = {
      ...result,
      id: uuidv4()
    };
    setHistory(prevHistory => [...prevHistory, newHistoryItem]);
  };
  
  // 清空历史数据
  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all test history? This action cannot be undone.')) {
      setHistory([]);
    }
  };
  
  return {
    history,
    addTestResult,
    clearHistory
  };
}; 