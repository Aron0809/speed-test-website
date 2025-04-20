import React from 'react';
import { HistoricalData } from '../types';
import { formatSpeed } from '../utils/speedTest';

interface SpeedTestHistoryProps {
  history: HistoricalData[];
  onClearHistory: () => void;
}

const SpeedTestHistory: React.FC<SpeedTestHistoryProps> = ({ history, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div 
        id="history" 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Test History</h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400">No test history available. Run a speed test to see results here.</p>
      </div>
    );
  }

  return (
    <div 
      id="history" 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Test History</h2>
        <button
          onClick={onClearHistory}
          className="px-3 py-1 text-sm text-red-500 border border-red-500 rounded hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
        >
          Clear History
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Download
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Upload
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ping
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Jitter
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {history.slice().reverse().map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {formatSpeed(item.downloadSpeed)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {formatSpeed(item.uploadSpeed)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {item.ping} ms
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {item.jitter || 0} ms
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpeedTestHistory;