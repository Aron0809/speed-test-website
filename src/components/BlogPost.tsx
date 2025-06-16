import { ExternalLink, Calendar } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost = ({ post }: BlogPostProps) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Get source badge color
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Cloudflare':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Google Cloud':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Source and Date */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSourceColor(post.source)}`}>
          {post.source} Blog
        </span>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(post.pubDate)}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-3 leading-tight">
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
        >
          {post.title}
          <ExternalLink className="inline-block h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </a>
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {post.description}
      </p>

      {/* Read More Link */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
        >
          Read full article
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </article>
  );
};

export default BlogPost; 