import { Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isBlog = location.pathname === '/blog';

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">SpeedPulse</h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link 
                  to="/" 
                  className={`text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors ${
                    isHome ? 'text-blue-500 dark:text-blue-400' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className={`text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors ${
                    isBlog ? 'text-blue-500 dark:text-blue-400' : ''
                  }`}
                >
                  Blog
                </Link>
              </li>
              {isHome && (
                <>
                  <li>
                    <a href="#history" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                      History
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                      About
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;