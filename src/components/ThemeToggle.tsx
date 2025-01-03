import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full 
                 bg-white dark:bg-dark-secondary
                 shadow-lg dark:shadow-black/30
                 transition-all duration-300
                 hover:shadow-xl dark:hover:shadow-black/50
                 border border-japanese-shironezu dark:border-dark-accent
                 group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-japanese-karakurenai dark:text-japanese-shiro"
      >
        {theme === 'light' ? (
          <FiMoon className="w-5 h-5 transform transition-transform group-hover:rotate-12" />
        ) : (
          <FiSun className="w-5 h-5 transform transition-transform group-hover:rotate-45" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
