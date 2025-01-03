import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogPost from './BlogPost';
import { getBlogPosts, BlogPost as BlogPostType } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import SEO from './SEO';
import { logBlogView, logPageView } from '../services/analytics';
import { FaCalendar, FaClock, FaTags } from 'react-icons/fa';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBlogPosts();
        setPosts(response.data || []);
        setError(null);
        logPageView('/blog');
      } catch (err: any) {
        console.error('Error fetching blog posts:', err);
        setError(err.message || 'Failed to load blog posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post: BlogPostType) => {
    setSelectedPost(post);
    logBlogView(post.title, post.slug);
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  if (loading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!posts?.length) return <div className="text-center">No blog posts available.</div>;

  return (
    <>
      <SEO 
        title={selectedPost ? selectedPost.title : "Blog"}
        description={selectedPost ? selectedPost.excerpt : "Read my latest blog posts about software development and technology."}
        keywords={selectedPost ? selectedPost.tags.join(', ') : "blog, software development, technology"}
        ogImage={selectedPost?.featured_image_og_url}
        type="article"
      />
      
      <div id="blog" className="w-full min-h-screen bg-gradient-to-b from-japanese-kinari/5 to-japanese-shironezu/10 dark:from-dark-coffee/5 dark:to-dark-oxford/10 py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-japanese-asagi dark:text-japanese-sakura mb-4">
              Blog Posts
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Thoughts, tutorials, and insights about software development
            </p>

            {/* Tags filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  onClick={(e) => handleTagClick(tag, e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-japanese-asagi text-white dark:bg-japanese-sakura'
                      : 'bg-japanese-karakurenai/10 text-japanese-karakurenai hover:bg-japanese-karakurenai/20'
                  }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-japanese-kurocha/90 rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                  onClick={() => handlePostClick(post)}
                >
                  {post.featured_image_thumbnail_url && (
                    <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                      <motion.img 
                        src={post.featured_image_thumbnail_url} 
                        alt={post.title}
                        className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  <div className="p-6">
                    <motion.h3 
                      className="text-xl font-bold mb-3 text-japanese-kurocha dark:text-japanese-shiro group-hover:text-japanese-asagi dark:group-hover:text-japanese-sakura transition-colors duration-300"
                    >
                      {post.title}
                    </motion.h3>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <FaCalendar className="mr-2" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-2" />
                        {post.readTime}
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-200 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <FaTags className="text-japanese-asagi dark:text-japanese-sakura" />
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          onClick={(e) => handleTagClick(tag, e)}
                          className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${
                            selectedTag === tag
                              ? 'bg-japanese-asagi text-white dark:bg-japanese-sakura'
                              : 'bg-japanese-karakurenai/10 text-japanese-karakurenai hover:bg-japanese-karakurenai/20'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <BlogPost post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Blog;
