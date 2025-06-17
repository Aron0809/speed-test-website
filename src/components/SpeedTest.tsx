import { useState } from 'react';
import { ArrowDown, ArrowUp, Clock, Activity } from 'lucide-react';
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
      // Step 1: Measure ping and jitter
      console.log('Starting ping test...');
      const pingData = await measurePing();
      setProgress(prev => ({ ...prev, ping: pingData }));
      console.log('Ping test completed:', pingData);
      
      // Step 2: Measure download speed
      setTestStatus('testing-download');
      console.log('Starting download test...');
      const downloadSpeed = await measureDownloadSpeed((speed) => {
        setProgress(prev => ({ ...prev, download: [...prev.download, speed] }));
      });
      console.log('Download test completed:', downloadSpeed);
      
      // Step 3: Measure upload speed
      setTestStatus('testing-upload');
      console.log('Starting upload test...');
      const uploadSpeed = await measureUploadSpeed((speed) => {
        setProgress(prev => ({ ...prev, upload: [...prev.upload, speed] }));
      });
      console.log('Upload test completed:', uploadSpeed);
      
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
      console.log('Speed test completed:', result);
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
        return t('speedTest.testing') + ' ' + t('speedTest.ping').toLowerCase();
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
        return 25;
      case 'testing-download':
        return 25 + (progress.download.length / 30) * 37.5; // 25-62.5%
      case 'testing-upload':
        return 62.5 + (progress.upload.length / 30) * 37.5; // 62.5-100%
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };
  
  // 判断是否应该显示测试按钮
  const shouldShowButton = testStatus === 'idle' || testStatus === 'completed';
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Speed Test</h2>
      
      {/* ISP信息显示 */}
      <ISPInfoComponent />
      
      <div className="text-center mb-6">
        {/* Loading spinner for active tests */}
        {isLoading && testStatus !== 'completed' && (
          <div className="mb-4">
            <LoadingSpinner size="medium" />
          </div>
        )}
        
        {/* Progress bar */}
        {testStatus !== 'idle' && testStatus !== 'completed' && (
          <div className="mb-4">
            <ProgressBar
              progress={getProgressPercentage()}
              status={getStatusText()}
            />
          </div>
        )}
        
        {/* Test button - 只在空闲或完成状态显示 */}
        {shouldShowButton && (
          <div 
            onClick={runSpeedTest}
            className="inline-block cursor-pointer"
          >
            <GetStartedButton />
          </div>
        )}
        
        {/* 测试完成状态文字 */}
        {testStatus === 'completed' && (
          <div className="mt-4">
            <p className="text-lg font-medium text-green-600 dark:text-green-400">
              {t('speedTest.complete')}
            </p>
          </div>
        )}
      </div>
      
      {/* Gauges for real-time visualization - 现在包含4个仪表盘 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <ArrowDown className="h-4 w-4 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('speedTest.download')}</h3>
          </div>
          <SpeedGauge 
            value={testStatus === 'testing-download' || testStatus === 'testing-upload' || testStatus === 'completed' 
              ? getLatestValue(progress.download) 
              : currentResult?.downloadSpeed || 0}
            label=""
            max={100}
            showLabel={false}
          />
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <ArrowUp className="h-4 w-4 text-green-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('speedTest.upload')}</h3>
          </div>
          <SpeedGauge 
            value={testStatus === 'testing-upload' || testStatus === 'completed' 
              ? getLatestValue(progress.upload) 
              : currentResult?.uploadSpeed || 0}
            label=""
            max={50}
            showLabel={false}
          />
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-4 w-4 text-amber-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t('speedTest.ping')}</h3>
          </div>
          <SpeedGauge 
            value={progress.ping?.ping || currentResult?.ping || 0}
            label=""
            max={200}
            showLabel={false}
            isPing={true}
          />
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <Activity className="h-4 w-4 text-purple-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Jitter</h3>
          </div>
          <SpeedGauge 
            value={progress.ping?.jitter || currentResult?.jitter || 0}
            label=""
            max={100}
            showLabel={false}
            isPing={true}
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
      
      {/* Test results display */}
      {currentResult && testStatus === 'completed' && (
        <TestResult result={currentResult} />
      )}
    </div>
  );
};

export default SpeedTest;