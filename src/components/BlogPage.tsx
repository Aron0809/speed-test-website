import { useState, useEffect } from 'react';
import { Rss, RefreshCw, AlertCircle, Globe } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types';
import { fetchAllBlogPosts } from '../utils/rssParser';
import BlogPost from './BlogPost';
import LoadingSpinner from './LoadingSpinner';

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Fetch blog posts
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);
    
    try {
      const allPosts = await fetchAllBlogPosts();
      setPosts(allPosts);
      setLastUpdated(new Date());
      
      // Check if we're using mock data (posts with mock GUIDs)
      const hasMockData = allPosts.some(post => post.guid?.startsWith('mock-'));
      setUsingMockData(hasMockData);
      
      if (hasMockData) {
        console.info('Using mock blog data due to RSS service unavailability');
      }
    } catch (err) {
      setError('Failed to fetch blog posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPosts();
  }, []);

  // Format last updated time
  const formatLastUpdated = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Network Tech Blog
            </h1>
          </div>
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Description */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Rss className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
              A curated feed of the latest in network performance and security from Cloudflare, to keep you informed about industry developments.
            </p>
          </div>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Last updated: {formatLastUpdated(lastUpdated)}
          </div>
        )}

        {/* Mock Data Warning */}
        {usingMockData && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-amber-800 dark:text-amber-200 font-medium text-sm">
                  Demo Mode Active
                </h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                  RSS services are temporarily unavailable. Showing sample blog posts for demonstration purposes.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="large" />
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Fetching latest blog posts...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3" />
            <div>
              <h3 className="text-red-800 dark:text-red-200 font-medium">
                Unable to Load Blog Posts
              </h3>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <BlogPost key={post.guid || `${post.source}-${index}`} post={post} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-12">
          <Globe className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Blog Posts Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We couldn't find any network-related posts at the moment. Try refreshing to check again.
          </p>
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">
            Content sourced from{' '}
            <a 
              href="https://blog.cloudflare.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Cloudflare Blog
            </a>
          </p>
          <p>
            All content remains the property of Cloudflare, Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 