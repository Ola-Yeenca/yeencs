import React from 'react';
import { motion } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDocker,
  FaPython,
  FaGithub,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiDjango,
  SiReact,
  SiRubyonrails,
  SiExpo,
} from 'react-icons/si';

const Skills = () => {
  const mainSkills = [
    { 
      name: 'Python', 
      icon: <FaPython />, 
      color: 'hover:text-[#3776AB]', 
      size: 'md:col-span-2 md:row-span-2',
      description: 'Primary Language',
      details: 'Backend Development'
    },
    { 
      name: 'Django', 
      icon: <SiDjango />, 
      color: 'hover:text-[#092E20]', 
      size: 'md:col-span-1 md:row-span-2',
      description: 'Web Framework',
      details: 'REST APIs'
    },
    { 
      name: 'Expo', 
      icon: <SiExpo />, 
      color: 'hover:text-[#000020]', 
      size: 'md:col-span-3 md:row-span-1',
      description: 'Mobile Development',
      details: 'iOS & Android'
    },
  ];

  const infrastructureSkills = [
    { 
      name: 'Docker', 
      icon: <FaDocker />, 
      color: 'hover:text-[#2496ED]',
      group: 'Container'
    },
    { 
      name: 'PostgreSQL', 
      icon: <SiPostgresql />, 
      color: 'hover:text-[#4169E1]',
      group: 'Database'
    },
    { 
      name: 'GitHub', 
      icon: <FaGithub />, 
      color: 'hover:text-[#181717]',
      group: 'Version Control'
    },
  ];

  const otherSkills = [
    { 
      name: 'React', 
      icon: <SiReact />, 
      color: 'hover:text-[#61DAFB]',
      group: 'Frontend'
    },
    { 
      name: 'TypeScript', 
      icon: <SiTypescript />, 
      color: 'hover:text-[#3178C6]',
      group: 'Language'
    },
    { 
      name: 'Tailwind', 
      icon: <SiTailwindcss />, 
      color: 'hover:text-[#06B6D4]',
      group: 'Styling'
    },
    { 
      name: 'Ruby on Rails', 
      icon: <SiRubyonrails />, 
      color: 'hover:text-[#CC0000]',
      group: 'Backend'
    },
    { 
      name: 'Git', 
      icon: <FaGitAlt />, 
      color: 'hover:text-[#F05032]',
      group: 'DevOps'
    },
    { 
      name: 'HTML', 
      icon: <FaHtml5 />, 
      color: 'hover:text-[#E34F26]',
      group: 'Frontend'
    },
    { 
      name: 'CSS', 
      icon: <FaCss3Alt />, 
      color: 'hover:text-[#1572B6]',
      group: 'Styling'
    },
  ];

  return (
    <div id='skills' className='w-full min-h-screen bg-gradient-to-b from-japanese-shironezu/10 to-japanese-kinari/5 dark:from-dark-oxford/10 dark:to-dark-coffee/5'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='pb-8'
        >
          <p className='text-4xl font-bold inline border-b-4 border-japanese-asagi dark:border-japanese-sakura text-dark-obsidian dark:text-japanese-soshoku'>
            Skills
          </p>
          <p className='py-6 text-lg text-dark-obsidian/80 dark:text-japanese-soshoku/80'>
            Backend Development & Mobile Applications
          </p>
        </motion.div>

        {/* Primary Skills - Bento Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8'>
          {mainSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${skill.size} bg-gradient-to-br from-japanese-gofun/50 to-japanese-kinari/30 dark:from-dark-oxford/50 dark:to-dark-coffee/30 shadow-lg hover:shadow-2xl rounded-2xl p-6 md:p-8 cursor-pointer backdrop-blur-sm transition-all duration-300 group`}
            >
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className={`text-4xl md:text-6xl transition-all duration-300 ease-out group-hover:scale-110 ${skill.color}`}
                  >
                    {skill.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-dark-obsidian/60 dark:text-japanese-soshoku/60">
                      {skill.description}
                    </div>
                    <div className="text-xs text-dark-obsidian/40 dark:text-japanese-soshoku/40 mt-1">
                      {skill.details}
                    </div>
                  </div>
                </div>
                <p className='mt-auto text-xl md:text-2xl font-medium text-dark-obsidian dark:text-japanese-soshoku'>
                  {skill.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infrastructure & Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-lg font-medium text-dark-obsidian/60 dark:text-japanese-soshoku/60 mb-4">Infrastructure & Tools</h3>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {infrastructureSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='group relative bg-gradient-to-br from-japanese-gofun/50 to-japanese-kinari/30 dark:from-dark-oxford/50 dark:to-dark-coffee/30 shadow-md hover:shadow-xl rounded-xl p-6 cursor-pointer backdrop-blur-sm transition-all duration-300'
              >
                <div className="flex items-center justify-between">
                  <div 
                    className={`text-3xl md:text-4xl transition-all duration-300 ease-out group-hover:scale-110 ${skill.color}`}
                  >
                    {skill.icon}
                  </div>
                  <p className='text-sm font-medium text-dark-obsidian dark:text-japanese-soshoku'>
                    {skill.name}
                  </p>
                  <span className="text-xs text-dark-obsidian/40 dark:text-japanese-soshoku/40">
                    {skill.group}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-medium text-dark-obsidian/60 dark:text-japanese-soshoku/60 mb-4">Additional Technologies</h3>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            {otherSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='group relative bg-gradient-to-br from-japanese-gofun/50 to-japanese-kinari/30 dark:from-dark-oxford/50 dark:to-dark-coffee/30 shadow-md hover:shadow-xl rounded-xl p-4 cursor-pointer backdrop-blur-sm transition-all duration-300'
              >
                <div className="flex flex-col items-center">
                  <div 
                    className={`text-2xl md:text-3xl transition-all duration-300 ease-out group-hover:scale-110 ${skill.color}`}
                  >
                    {skill.icon}
                  </div>
                  <p className='mt-3 text-sm font-medium text-dark-obsidian dark:text-japanese-soshoku'>
                    {skill.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className='mt-12 bg-japanese-gofun/50 dark:bg-dark-oxford/50 rounded-lg p-8 shadow-lg backdrop-blur-sm'
        >
          <h3 className='text-2xl font-bold text-japanese-asagi dark:text-japanese-sakura mb-4'>
            Development Approach
          </h3>
          <div className='grid md:grid-cols-2 gap-6 text-dark-obsidian/80 dark:text-japanese-soshoku/80'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <h4 className='text-xl font-semibold mb-2 text-dark-obsidian dark:text-japanese-soshoku'>Backend Development</h4>
              <p className='text-lg'>
                Building robust and scalable server-side applications using Python, Django, and PostgreSQL.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className='text-xl font-semibold mb-2 text-dark-obsidian dark:text-japanese-soshoku'>Mobile & Frontend</h4>
              <p className='text-lg'>
                Creating responsive and intuitive applications with React, Expo, and TypeScript.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
