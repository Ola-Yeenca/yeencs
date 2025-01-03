import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { getProjects } from '../services/api';
import type { Project } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError(err.message || 'Failed to load projects');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!projects?.length) return <div className="text-center">No projects available.</div>;

  return (
    <div id='projects' className='w-full min-h-screen bg-gradient-to-b from-japanese-kinari/5 to-japanese-shironezu/10 dark:from-dark-coffee/5 dark:to-dark-oxford/10'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-japanese-asagi dark:border-japanese-sakura text-dark-obsidian dark:text-japanese-soshoku'>
            Projects
          </p>
          <p className='py-6 text-dark-obsidian/80 dark:text-japanese-soshoku/80'>
            Check out some of my recent work
          </p>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='relative shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div overflow-hidden bg-japanese-kinari/20 dark:bg-dark-coffee/20'
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className='absolute w-full h-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-10'
                />
              )}

              <div className='opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center h-full w-full px-4 text-center transition-opacity duration-300'>
                <span className='text-2xl font-bold text-dark-obsidian dark:text-japanese-soshoku tracking-wider'>
                  {project.title}
                </span>
                <p className='text-dark-obsidian/80 dark:text-japanese-soshoku/80 my-4'>
                  {project.description}
                </p>
                <div className='text-center'>
                  <p className='text-sm text-dark-obsidian/60 dark:text-japanese-soshoku/60 mb-2'>
                    {project.technologies.join(' • ')}
                  </p>
                  <div className='flex justify-center space-x-4 pt-2'>
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-dark-obsidian dark:text-japanese-soshoku hover:text-japanese-asagi dark:hover:text-japanese-sakura transition-colors duration-300'
                      >
                        <FaGithub size={24} />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-dark-obsidian dark:text-japanese-soshoku hover:text-japanese-asagi dark:hover:text-japanese-sakura transition-colors duration-300'
                      >
                        <FaExternalLinkAlt size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
