import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaMobileAlt, FaServer, FaDatabase, FaCloud } from 'react-icons/fa';
import { getAbout, About as AboutType } from '../services/api';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000'
});

interface PortfolioData {
  name: string;
  role: string;
  skills: string[];
}

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await getAbout();
        setAboutData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('Failed to load about data');
      }
    };

    const fetchData = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/data');
        setPortfolioData(response.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    fetchAboutData();
    fetchData();
  }, []);

  return (
    <div id='about' className='w-full min-h-screen bg-gradient-to-b from-japanese-kinari/5 to-japanese-shironezu/10 dark:from-dark-coffee/5 dark:to-dark-oxford/10'>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className='max-w-[1000px] w-full grid grid-cols-1 gap-8 px-4 py-16'>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='pb-8'
          >
            <p className='text-4xl font-bold inline border-b-4 border-japanese-asagi dark:border-japanese-sakura text-dark-obsidian dark:text-japanese-soshoku'>
              About
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 gap-8'>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className='text-right'
            >
              <p className='text-3xl font-bold text-japanese-asagi dark:text-japanese-sakura mb-4'>
                {aboutData ? `Hi, I'm ${aboutData.title}` : 'Hi, I\'m Timothy'}
              </p>
              <p className='text-lg text-dark-obsidian/80 dark:text-japanese-soshoku/80'>
                {aboutData?.content || 'I am passionate about building excellent software that improves the lives of those around me.'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className='text-lg text-dark-obsidian/80 dark:text-japanese-soshoku/80'>
                I am passionate about building excellent software that improves
                the lives of those around me. I specialize in creating software
                for clients ranging from individuals and small-businesses all the
                way to large enterprise corporations. What would you do if you had
                a software expert available at your fingertips?
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className='md:col-span-2 bg-japanese-gofun/50 dark:bg-dark-oxford/50 rounded-lg p-8 shadow-lg backdrop-blur-sm'
            >
              <h3 className='text-2xl font-bold text-japanese-asagi dark:text-japanese-sakura mb-4'>
                My Approach
              </h3>
              <p className='text-lg text-dark-obsidian/80 dark:text-japanese-soshoku/80 mb-4'>
                I believe in creating software that not only functions flawlessly but also provides an exceptional user experience. My development philosophy centers around:
              </p>
              <ul className='grid md:grid-cols-2 gap-4 text-dark-obsidian/80 dark:text-japanese-soshoku/80'>
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className='flex items-center gap-2'
                >
                  <span className='text-japanese-asagi dark:text-japanese-sakura'>▹</span>
                  Clean, efficient code
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                  className='flex items-center gap-2'
                >
                  <span className='text-japanese-asagi dark:text-japanese-sakura'>▹</span>
                  Responsive design
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  viewport={{ once: true }}
                  className='flex items-center gap-2'
                >
                  <span className='text-japanese-asagi dark:text-japanese-sakura'>▹</span>
                  Performance optimization
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  viewport={{ once: true }}
                  className='flex items-center gap-2'
                >
                  <span className='text-japanese-asagi dark:text-japanese-sakura'>▹</span>
                  User-centered design
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
