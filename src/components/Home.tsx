import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-scroll';
import ParticleBackground from './ParticleBackground';
import { TypeAnimation } from 'react-type-animation';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function AmbientParticles() {
  const points = useRef<THREE.Points>(null);
  const particlesCount = 800;
  
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  // Create particles in a spherical formation
  for (let i = 0; i < particlesCount; i++) {
    const radius = 2.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    
    // Blue-purple gradient colors
    colors[i * 3] = 0.4 + Math.random() * 0.2;     // R
    colors[i * 3 + 1] = 0.2 + Math.random() * 0.3; // G
    colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
  }

  useFrame(({ clock }) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      const time = clock.getElapsedTime();

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        // Gentle orbital motion
        const angle = time * 0.2;
        const radius = Math.sqrt(x * x + z * z);
        
        positions[i3] = Math.cos(angle + i * 0.01) * radius;
        positions[i3 + 2] = Math.sin(angle + i * 0.01) * radius;
        positions[i3 + 1] += Math.sin(time * 0.5 + i) * 0.002;
      }

      points.current.geometry.attributes.position.needsUpdate = true;
      points.current.rotation.y = time * 0.05;
    }
  });

  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function Scene() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#3d1c56"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0}
        />
      </Sphere>
      <AmbientParticles />
      <OrbitControls enableZoom={false} autoRotate />
    </>
  );
}

const LoadingSpinner = () => {
  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading of resources
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-transparent to-japanese-kinari/5 dark:to-dark-coffee/5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl text-japanese-asagi dark:text-japanese-sakura"
        >
          <LoadingSpinner />
        </motion.div>
      </div>
    );
  }

  return (
    <div id='home' className='w-full h-screen relative bg-gradient-to-b from-transparent to-japanese-kinari/5 dark:to-dark-coffee/5'>
      <ParticleBackground />
      
      <div className='max-w-screen-lg mx-auto flex flex-col-reverse md:flex-row items-center justify-center h-full px-4 relative z-10'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='flex flex-col justify-center h-full w-full'
        >
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-4xl sm:text-7xl font-bold text-japanese-asagi dark:text-japanese-sakura mb-2'
          >
            <TypeAnimation
              sequence={[
                'Hello, I\'m Timothy Ola',
                1000,
                'I\'m a Developer',
                1000,
                'I\'m a Designer',
                1000,
                'I Create Experiences',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
            />
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-2xl sm:text-4xl font-bold text-dark-obsidian dark:text-japanese-soshoku'
          >
            Full Stack Developer
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='text-dark-obsidian/80 dark:text-japanese-soshoku/80 py-4 max-w-[700px] text-lg'
          >
            I'm passionate about building exceptional digital experiences. 
            Currently, I'm focused on building responsive full-stack web applications 
            that solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='flex flex-col sm:flex-row gap-4'
          >
            <Link to='projects' smooth duration={500} aria-label="View my work">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='group w-full text-japanese-kinari bg-gradient-to-r from-japanese-asagi to-japanese-sakura px-6 py-3 my-2 flex items-center justify-center rounded-md hover:shadow-lg transition-all duration-300'
              >
                View Work
                <span className='group-hover:rotate-90 duration-300'>
                  <HiArrowNarrowRight className='ml-3' />
                </span>
              </motion.button>
            </Link>

            <Link to='contact' smooth duration={500} aria-label="Contact me">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='group w-full text-dark-obsidian dark:text-japanese-kinari border-2 border-dark-obsidian dark:border-japanese-kinari px-6 py-3 my-2 flex items-center justify-center rounded-md hover:bg-dark-obsidian hover:text-japanese-kinari dark:hover:bg-japanese-kinari dark:hover:text-dark-obsidian transition-all duration-300'
              >
                Contact Me
                <span className='group-hover:translate-x-2 duration-300'>
                  <HiArrowNarrowRight className='ml-3' />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='md:w-1/2 h-[300px] md:h-[500px]'
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Canvas>
              <Scene />
            </Canvas>
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
