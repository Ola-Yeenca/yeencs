import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import GitHubActivity from './components/GitHubActivity';
import Contact from './components/Contact';
import SocialLinks from './components/SocialLinks';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Loader from './components/Loader';
import SEO from './components/SEO';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <div className="min-h-screen font-sans bg-white dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
          <SEO />
          <AnimatePresence mode="wait">
            {loading ? (
              <Loader key="loader" />
            ) : (
              <>
                <ThemeToggle />
                <Navbar />
                <SocialLinks />
                <Home />
                <About />
                <Skills />
                <Projects />
                <Blog />
                <GitHubActivity />
                <Testimonials />
                <Contact />
              </>
            )}
          </AnimatePresence>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
