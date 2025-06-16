import { SpeedTestResult } from '../types';
import { formatSpeed, getSpeedRating } from '../utils/speedTest';
import { getRatingClass, getRatingLabel } from '../utils/ui-helpers';

interface TestResultProps {
  result: SpeedTestResult | null;
}

const TestResult = ({ result }: TestResultProps) => {
  if (!result) return null;
  
  const { downloadSpeed, uploadSpeed, ping, jitter } = result;
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Test Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Download</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatSpeed(downloadSpeed)}</p>
          <p className={`text-sm font-medium mt-1 ${getRatingClass(getSpeedRating(downloadSpeed))}`}>
            {getRatingLabel(getSpeedRating(downloadSpeed))}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Upload</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatSpeed(uploadSpeed)}</p>
          <p className={`text-sm font-medium mt-1 ${getRatingClass(getSpeedRating(uploadSpeed))}`}>
            {getRatingLabel(getSpeedRating(uploadSpeed))}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ping</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{ping} ms</p>
          <p className={`text-sm font-medium mt-1 ${getRatingClass(getSpeedRating(100 - ping))}`}>
            {getRatingLabel(getSpeedRating(100 - ping))}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Jitter</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{jitter || 0} ms</p>
          <p className={`text-sm font-medium mt-1 ${getRatingClass(getSpeedRating(100 - (jitter || 0)))}`}>
            {getRatingLabel(getSpeedRating(100 - (jitter || 0)))}
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>Tested on: {result.timestamp.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TestResult;