import React from 'react';
import { Activity, Wifi, BarChart, Clock } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div id="about" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">About SpeedPulse</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">How It Works</h3>
          <p className="text-gray-600 dark:text-gray-400">
            SpeedPulse measures your internet connection performance by testing three key metrics:
          </p>
          
          <div className="space-y-3 mt-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Wifi className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Download Speed</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Measures how quickly your connection can retrieve data from the internet.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Activity className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Upload Speed</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Measures how quickly your connection can send data to the internet.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Ping & Jitter</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ping measures latency (delay) in milliseconds, while jitter shows consistency of your connection.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <BarChart className="h-5 w-5 text-purple-500" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Fluctuation Analysis</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our real-time graphs show how your connection speed varies during the test, helping identify stability issues.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tips for Accurate Testing</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc pl-5">
            <li>Close other applications and browser tabs that might be using your internet connection</li>
            <li>Disconnect other devices from your network temporarily during testing</li>
            <li>For wireless connections, position yourself closer to your router</li>
            <li>Try running the test at different times of day to get a complete picture</li>
            <li>Run multiple tests for more accurate results</li>
          </ul>
          
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6">Understanding Your Results</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p className="mb-2">Here's what your speed test results typically mean:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">0-5 Mbps:</span> Basic web browsing
              </div>
              <div>
                <span className="font-medium">5-25 Mbps:</span> HD video streaming
              </div>
              <div>
                <span className="font-medium">25-100 Mbps:</span> 4K streaming & gaming
              </div>
              <div>
                <span className="font-medium">100+ Mbps:</span> Multiple heavy users
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;