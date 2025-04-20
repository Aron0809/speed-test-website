import React, { useState, useEffect } from 'react';
import { Activity, ArrowDown, ArrowUp, Clock, RotateCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SpeedTestResult, TestStatus, HistoricalData } from '../types';
import { measurePing, measureDownloadSpeed, measureUploadSpeed } from '../utils/speedTest';
import SpeedGauge from './SpeedGauge';
import SpeedGraph from './SpeedGraph';
import TestResult from './TestResult';
import LoadingSpinner from './LoadingSpinner';
import ProgressBar from './ProgressBar';

interface SpeedTestProps {
  onTestComplete: (result: SpeedTestResult) => void;
}

const SpeedTest: React.FC<SpeedTestProps> = ({ onTestComplete }) => {
  const { t } = useTranslation();
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{ ping: number; jitter: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Reset test data when starting a new test
  const resetTestData = () => {
    setDownloadProgress([]);
    setUploadProgress([]);
    setPingResult(null);
    setCurrentResult(null);
  };
  
  // Run the complete speed test
  const runSpeedTest = async () => {
    resetTestData();
    setTestStatus('testing-ping');
    setIsPinging(true);
    setIsLoading(true);
    
    try {
      // Step 1: Measure ping
      const pingData = await measurePing();
      setPingResult(pingData);
      setIsPinging(false);
      
      // Step 2: Measure download speed
      setTestStatus('testing-download');
      const downloadSpeed = await measureDownloadSpeed((speed) => {
        setDownloadProgress((prev) => [...prev, speed]);
      });
      
      // Step 3: Measure upload speed
      setTestStatus('testing-upload');
      const uploadSpeed = await measureUploadSpeed((speed) => {
        setUploadProgress((prev) => [...prev, speed]);
      });
      
      // Create the final result
      const result: SpeedTestResult = {
        downloadSpeed,
        uploadSpeed,
        ping: pingData.ping,
        jitter: pingData.jitter,
        timestamp: new Date(),
      };
      
      setCurrentResult(result);
      setTestStatus('completed');
      onTestComplete(result);
    } catch (error) {
      console.error('Speed test failed:', error);
      setTestStatus('idle');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get status text based on current test status
  const getStatusText = () => {
    switch (testStatus) {
      case 'testing-ping':
        return t('speedTest.preparing');
      case 'testing-download':
        return t('speedTest.testing') + ' ' + t('speedTest.download').toLowerCase();
      case 'testing-upload':
        return t('speedTest.testing') + ' ' + t('speedTest.upload').toLowerCase();
      case 'completed':
        return t('speedTest.complete');
      default:
        return t('common.start');
    }
  };
  
  // Get the latest progress value or zero
  const getLatestValue = (data: number[]) => {
    return data.length > 0 ? data[data.length - 1] : 0;
  };
  
  // Calculate the progress percentage
  const getProgressPercentage = () => {
    switch (testStatus) {
      case 'testing-ping':
        return 10;
      case 'testing-download':
        return 10 + (downloadProgress.length / 20) * 45; // 10-55%
      case 'testing-upload':
        return 55 + (uploadProgress.length / 20) * 45; // 55-100%
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t('speedTest.title')}</h2>
      
      <div className="text-center mb-6">
        {isLoading && <LoadingSpinner size="medium" />}
        
        {/* Progress bar */}
        {testStatus !== 'idle' && testStatus !== 'completed' && (
          <ProgressBar
            progress={getProgressPercentage()}
            status={getStatusText()}
          />
        )}
        
        {/* Test button */}
        <button
          onClick={runSpeedTest}
          disabled={testStatus !== 'idle' && testStatus !== 'completed'}
          className={`px-6 py-3 rounded-lg shadow transition-colors flex items-center justify-center mx-auto space-x-2 
            ${testStatus === 'idle' || testStatus === 'completed' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
        >
          <RotateCw className={`h-5 w-5 ${testStatus !== 'idle' && testStatus !== 'completed' ? 'animate-spin' : ''}`} />
          <span>{testStatus === 'completed' ? t('common.start') : t('speedTest.testing')}</span>
        </button>
      </div>
      
      {/* Gauges for real-time visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <ArrowDown className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('speedTest.download')}</h3>
          </div>
          <SpeedGauge 
            value={testStatus === 'testing-download' || testStatus === 'testing-upload' || testStatus === 'completed' 
              ? getLatestValue(downloadProgress) 
              : currentResult?.downloadSpeed || 0}
            label={t('speedTest.download')}
            max={100}
          />
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <ArrowUp className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('speedTest.upload')}</h3>
          </div>
          <SpeedGauge 
            value={testStatus === 'testing-upload' || testStatus === 'completed' 
              ? getLatestValue(uploadProgress) 
              : currentResult?.uploadSpeed || 0}
            label={t('speedTest.upload')}
            max={50}
          />
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('speedTest.ping')}</h3>
          </div>
          <SpeedGauge 
            value={pingResult?.ping || 0}
            label={`${t('speedTest.ping')} (${t('speedTest.ms')})`}
            max={200}
          />
        </div>
      </div>
      
      {/* Graphs showing fluctuations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(downloadProgress.length > 0 || uploadProgress.length > 0) && (
          <>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <ArrowDown className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('speedTest.download')} {t('speedTest.fluctuation')}</h3>
              </div>
              <SpeedGraph data={downloadProgress} label={`${t('speedTest.download')} (${t('speedTest.mbps')})`} />
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <ArrowUp className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('speedTest.upload')} {t('speedTest.fluctuation')}</h3>
              </div>
              <SpeedGraph data={uploadProgress} label={`${t('speedTest.upload')} (${t('speedTest.mbps')})`} />
            </div>
          </>
        )}
      </div>
      
      {/* Display final results if available */}
      {currentResult && <TestResult result={currentResult} />}
    </div>
  );
};

export default SpeedTest;