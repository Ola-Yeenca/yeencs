import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';

const SocialLinks: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'fixed', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}
      className="hidden lg:block"
    >
      <div className="flex flex-col gap-4">
        <motion.a
          href="/"
          target="_blank"
          rel="noreferrer"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ x: 110, scale: 1.02 }}
          className="flex items-center w-[160px] h-[50px] ml-[-110px] px-4 rounded-r-lg bg-gradient-to-r from-[#0077B5] to-[#00A0DC] text-japanese-kinari shadow-lg hover:shadow-xl"
        >
          <span className="flex-grow">LinkedIn</span>
          <FaLinkedin size={25} />
        </motion.a>

        <motion.a
          href="/"
          target="_blank"
          rel="noreferrer"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ x: 110, scale: 1.02 }}
          className="flex items-center w-[160px] h-[50px] ml-[-110px] px-4 rounded-r-lg bg-gradient-to-r from-[#333333] to-[#171515] text-japanese-kinari shadow-lg hover:shadow-xl"
        >
          <span className="flex-grow">GitHub</span>
          <FaGithub size={25} />
        </motion.a>

        <motion.a
          href="/"
          target="_blank"
          rel="noreferrer"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ x: 110, scale: 1.02 }}
          className="flex items-center w-[160px] h-[50px] ml-[-110px] px-4 rounded-r-lg bg-gradient-to-r from-[#EA4335] to-[#DB4437] text-japanese-kinari shadow-lg hover:shadow-xl"
        >
          <span className="flex-grow">Email</span>
          <HiOutlineMail size={25} />
        </motion.a>

        <motion.a
          href="/"
          target="_blank"
          rel="noreferrer"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          whileHover={{ x: 110, scale: 1.02 }}
          className="flex items-center w-[160px] h-[50px] ml-[-110px] px-4 rounded-r-lg bg-gradient-to-r from-japanese-sakura to-japanese-asagi text-dark-obsidian shadow-lg hover:shadow-xl"
        >
          <span className="flex-grow">Resume</span>
          <BsFillPersonLinesFill size={25} />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default SocialLinks;
