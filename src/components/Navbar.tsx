import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'blog', name: 'Blog' },
  { id: 'github', name: 'GitHub' },
  { id: 'testimonials', name: 'Testimonials' },
  { id: 'contact', name: 'Contact' },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme } = useTheme();
  
  const handleClick = () => setNav(!nav);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full h-[80px] flex justify-between items-center px-4 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-lg'
          : 'bg-light-bg dark:bg-dark-bg'
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <Link to="home" smooth duration={500} className="cursor-pointer">
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className='font-heading text-2xl font-bold text-light-text dark:text-dark-text'
        >
          Ola Yinka
        </motion.h1>
      </Link>

      {/* Desktop menu */}
      <ul className='hidden md:flex gap-6'>
        {navItems.map((item) => (
          <motion.li 
            key={item.id}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <Link
              to={item.id}
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              className={`nav-link cursor-pointer capitalize transition-colors relative
                ${activeSection === item.id 
                  ? 'text-japanese-asagi dark:text-japanese-sakura' 
                  : 'text-light-text dark:text-dark-text hover:text-japanese-asagi dark:hover:text-japanese-sakura'
                }`}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-japanese-asagi dark:bg-japanese-sakura"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Hamburger */}
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick} 
        className='md:hidden z-10 text-light-text dark:text-dark-text cursor-pointer'
      >
        {!nav ? <FaBars size={25} /> : <FaTimes size={25} />}
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {nav && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="fixed top-0 right-0 w-full h-screen bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-lg md:hidden"
          >
            <motion.ul
              className="h-full flex flex-col justify-center items-center gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { x: 20, opacity: 0 },
                    visible: { x: 0, opacity: 1 }
                  }}
                >
                  <Link
                    onClick={handleClick}
                    to={item.id}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className={`text-2xl capitalize cursor-pointer
                      ${activeSection === item.id 
                        ? 'text-japanese-asagi dark:text-japanese-sakura' 
                        : 'text-light-text dark:text-dark-text'
                      }`}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-japanese-asagi dark:bg-japanese-sakura"
        style={{
          width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
        }}
      />
    </motion.nav>
  );
};

export default Navbar;
function t(arg0: string) {
  throw new Error('Function not implemented.');
}

