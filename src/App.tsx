import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SpeedTest from './components/SpeedTest';
import SpeedTestHistory from './components/SpeedTestHistory';
import AboutSection from './components/AboutSection';
import { SpeedTestResult, HistoricalData } from './types';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'speedtest_history';

function App() {
  const [history, setHistory] = useState<HistoricalData[]>([]);
  
  // Load history from local storage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Convert string timestamps back to Date objects
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
  
  // Save history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);
  
  // Handle test completion
  const handleTestComplete = (result: SpeedTestResult) => {
    const newHistoryItem: HistoricalData = {
      ...result,
      id: uuidv4()
    };
    
    setHistory(prevHistory => [...prevHistory, newHistoryItem]);
  };
  
  // Clear all history
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all test history? This action cannot be undone.')) {
      setHistory([]);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <SpeedTest onTestComplete={handleTestComplete} />
        <SpeedTestHistory history={history} onClearHistory={handleClearHistory} />
        <AboutSection />
      </div>
    </Layout>
  );
}

export default App;