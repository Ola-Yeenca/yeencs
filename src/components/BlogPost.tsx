import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost as BlogPostType } from '../services/api';
import { logBlogView } from '../services/analytics';
import DOMPurify from 'isomorphic-dompurify';

interface BlogPostProps {
  post: BlogPostType;
  onClose: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onClose }) => {
  React.useEffect(() => {
    logBlogView(post.title, post.slug);
  }, [post]);

  const renderContent = () => {
    const cleanHtml = DOMPurify.sanitize(post.content);
    return { __html: cleanHtml };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white dark:bg-japanese-kurocha/90 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {post.featured_image_large_url && (
          <img
            src={post.featured_image_large_url}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg mb-6"
          />
        )}
        
        <h2 className="text-3xl font-bold mb-2 text-japanese-kurocha dark:text-japanese-shiro">
          {post.title}
        </h2>
        
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {post.date} · {post.readTime}
          </p>
          <div className="flex gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-japanese-karakurenai/10 text-japanese-karakurenai rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div 
          className="prose dark:prose-invert max-w-none mb-6"
          dangerouslySetInnerHTML={renderContent()}
        />

        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-japanese-karakurenai text-white rounded hover:bg-japanese-karakurenai/80 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default BlogPost;
