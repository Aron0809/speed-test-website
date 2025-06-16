import { useState } from 'react';
import { ArrowDown, ArrowUp, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SpeedTestResult, TestStatus } from '../types';
import { measurePing, measureDownloadSpeed, measureUploadSpeed } from '../utils/speedTest';
import SpeedGauge from './SpeedGauge';
import SpeedGraph from './SpeedGraph';
import TestResult from './TestResult';
import LoadingSpinner from './LoadingSpinner';
import ProgressBar from './ProgressBar';
import { GetStartedButton } from './ui/get-started-button';
import ISPInfoComponent from './ISPInfo';

interface SpeedTestProps {
  onTestComplete: (result: SpeedTestResult) => void;
}

// Test progress state interface
interface TestProgress {
  download: number[];
  upload: number[];
  ping: { ping: number; jitter: number } | null;
}

const SpeedTest = ({ onTestComplete }: SpeedTestProps) => {
  const { t } = useTranslation();
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [progress, setProgress] = useState<TestProgress>({ download: [], upload: [], ping: null });
  const [isLoading, setIsLoading] = useState(false);
  
  // Reset test data
  const resetTestData = () => {
    setProgress({ download: [], upload: [], ping: null });
    setCurrentResult(null);
  };
  
  // Execute complete speed test
  const runSpeedTest = async () => {
    resetTestData();
    setTestStatus('testing-ping');
    setIsLoading(true);
    
    try {
      // Step 1: Measure ping
      const pingData = await measurePing();
      setProgress(prev => ({ ...prev, ping: pingData }));
      
      // Step 2: Measure download speed
      setTestStatus('testing-download');
      const downloadSpeed = await measureDownloadSpeed((speed) => {
        setProgress(prev => ({ ...prev, download: [...prev.download, speed] }));
      });
      
      // Step 3: Measure upload speed
      setTestStatus('testing-upload');
      const uploadSpeed = await measureUploadSpeed((speed) => {
        setProgress(prev => ({ ...prev, upload: [...prev.upload, speed] }));
      });
      
      // Create final result
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
  
  // Get status text based on current test state
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
  
  // Get latest progress value or return 0
  const getLatestValue = (data: number[]) => {
    return data.length > 0 ? data[data.length - 1] : 0;
  };
  
  // Calculate progress percentage
  const getProgressPercentage = () => {
    switch (testStatus) {
      case 'testing-ping':
        return 10;
      case 'testing-download':
        return 10 + (progress.download.length / 20) * 45; // 10-55%
      case 'testing-upload':
        return 55 + (progress.upload.length / 20) * 45; // 55-100%
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Speed Test</h2>
      
      {/* ISP信息显示 */}
      <ISPInfoComponent />
      
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
        <div 
          onClick={runSpeedTest}
          className={`inline-block ${testStatus !== 'idle' && testStatus !== 'completed' ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
        >
          <GetStartedButton />
        </div>
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
              ? getLatestValue(progress.download) 
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
              ? getLatestValue(progress.upload) 
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
            value={progress.ping?.ping || 0}
            label={`${t('speedTest.ping')} (${t('speedTest.ms')})`}
            max={200}
          />
        </div>
      </div>
      
      {/* Display speed charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(progress.download.length > 0 || progress.upload.length > 0) && (
          <>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <ArrowDown className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('speedTest.download')} {t('speedTest.fluctuation')}</h3>
              </div>
              <SpeedGraph data={progress.download} label={`${t('speedTest.download')} (${t('speedTest.mbps')})`} />
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <ArrowUp className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('speedTest.upload')} {t('speedTest.fluctuation')}</h3>
              </div>
              <SpeedGraph data={progress.upload} label={`${t('speedTest.upload')} (${t('speedTest.mbps')})`} />
            </div>
          </>
        )}
      </div>
      
      {/* Display final results */}
      {currentResult && <TestResult result={currentResult} />}
    </div>
  );
};

export default SpeedTest;