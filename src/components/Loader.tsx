import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-light-bg dark:bg-dark-bg"
    >
      <div className="relative">
        {/* Outer rotating circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 rounded-full"
        />
        {/* Inner rotating circle */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 border-4 border-t-primary-500 dark:border-t-primary-400 border-transparent rounded-full"
        />
        {/* Center dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 bg-primary-500 dark:bg-primary-400 rounded-full"
        />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute mt-24 text-xl font-heading text-light-text dark:text-dark-text"
      >
        Loading...
      </motion.h2>
    </motion.div>
  );
};

export default Loader;
