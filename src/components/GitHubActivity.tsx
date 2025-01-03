import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCode, FaStar, FaCodeBranch } from 'react-icons/fa';
import axios from 'axios';

interface Repository {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

const GitHubActivity: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/Ola-Yeenca/repos?sort=updated');
        const repositories = response.data.slice(0, 6).map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          url: repo.html_url,
        }));
        setRepos(repositories);
      } catch (err) {
        setError('Failed to fetch GitHub data');
        console.error('Error fetching GitHub data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const languageColors: { [key: string]: string } = {
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-500',
    Python: 'bg-green-500',
    HTML: 'bg-red-500',
    CSS: 'bg-purple-500',
  };

  return (
    <div id="github" className="w-full py-20 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-heading font-bold text-light-text dark:text-dark-text mb-4">
            GitHub Activity
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Recent contributions and projects
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-dark-secondary rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <FaGithub className="text-2xl text-light-text dark:text-dark-text mr-2" />
                  <h3 className="font-heading font-bold text-lg text-light-text dark:text-dark-text truncate">
                    {repo.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 h-12 line-clamp-2">
                  {repo.description || 'No description available'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${languageColors[repo.language] || 'bg-gray-400'} mr-2`}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{repo.language || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{repo.stars}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCodeBranch className="text-gray-500 dark:text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{repo.forks}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubActivity;
