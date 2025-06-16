import { useState, useEffect } from 'react';
import { Globe, MapPin } from 'lucide-react';
import { getISPInfo, ISPInfo } from '../utils/ispInfo';

const ISPInfoComponent = () => {
  const [ispInfo, setIspInfo] = useState<ISPInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchISPInfo = async () => {
      try {
        const info = await getISPInfo();
        setIspInfo(info);
      } catch (error) {
        console.error('Failed to fetch ISP info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchISPInfo();
  }, []);

  if (loading) {
    return (
      <div className="mb-8">
                 {/* 加载状态 - 响应式并排居中显示 */}
         <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 mb-4">
          <div className="animate-pulse flex items-center space-x-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/30 dark:border-gray-700/30">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          </div>
          
          <div className="animate-pulse flex items-center space-x-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/30 dark:border-gray-700/30">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          </div>
        </div>
        
        {/* IP地址加载状态 */}
        <div className="flex justify-center">
          <div className="animate-pulse flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg px-4 py-2 border border-blue-200/50 dark:border-gray-600/50">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!ispInfo) {
    return null;
  }

  return (
    <div className="mb-8">
      {/* ISP和服务器信息并排居中显示 - 响应式设计 */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 text-sm text-gray-600 dark:text-gray-400 mb-4">
        {/* ISP信息 */}
        <div className="flex items-center space-x-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/30 dark:border-gray-700/30">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <Globe className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">ISP:</span>
          <span className="text-gray-900 dark:text-white font-medium">{ispInfo.isp}</span>
        </div>
        
        {/* 服务器信息 */}
        <div className="flex items-center space-x-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/30 dark:border-gray-700/30">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <MapPin className="h-4 w-4 text-green-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Server:</span>
          <span className="text-gray-900 dark:text-white font-medium">{ispInfo.serverLocation}</span>
        </div>
      </div>
      
      {/* IP地址居中显示 */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg px-4 py-2 border border-blue-200/50 dark:border-gray-600/50">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span className="font-medium text-gray-700 dark:text-gray-300">Your IP:</span>
          <span className="text-gray-900 dark:text-white font-mono font-medium">{ispInfo.ip}</span>
        </div>
      </div>
    </div>
  );
};

export default ISPInfoComponent; 