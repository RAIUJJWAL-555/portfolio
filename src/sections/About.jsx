import React, { useRef } from 'react'; // 👈 useRef import kiya gaya
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Example icons

const About = () => {
  const skills = [
    { name: 'HTML/CSS', level: 90 },
    { name: 'JavaScript', level: 70 },
    { name: 'React', level: 80 },
    { name: 'Express', level: 80 },
    { name: 'MongoDB', level: 80 },
    { name: 'SQL', level: 70 },
    { name: 'C Programming', level: 70 },
    { name: 'Python', level: 65 },
    { name: 'Git', level: 85 },
    { name: 'Framer Motion', level: 75 },
    { name: 'Tailwind CSS', level: 90 },
  ];

  // Ref for constraining drag area
  const dragConstraintsRef = useRef(null); 
  // Ref for the content we want to manually scroll
  const scrollContentRef = useRef(null); 
  
  // Amount by which we want to scroll on button click
  const SCROLL_AMOUNT = 300; 

  // 💡 NEW: Scroll function for buttons
  const scrollByAmount = (amount) => {
    if (scrollContentRef.current) {
      // scrollLeft property ka use karke smooth scroll karein
      scrollContentRef.current.scrollLeft += amount;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillBarItemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-white mb-6">
              Passionate Developer & Problem Solver
            </motion.h3>
            <motion.p variants={itemVariants} className="text-gray-300 text-lg leading-relaxed mb-6">
              I'm a future software engineer with a passion for creating innovative web applications.
              I love turning complex problems into simple, beautiful, and intuitive solutions.
              When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-300 text-lg leading-relaxed">
              My journey in tech started with curiosity, and it continues with dedication to learning
              and growing every day. I believe in the power of technology to make the world a better place.
            </motion.p>
          </motion.div>

          {/* Right Skills Column - HORIZONTAL SLIDER SETUP */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 relative" // 💡 Added 'relative' for absolute buttons
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Skills & Technologies (Drag or Click)</h3>

            {/* 💡 Dragging is replaced with simple horizontal scrolling and buttons */}
            <div 
              ref={dragConstraintsRef} 
              className="overflow-x-hidden w-full relative"
            >
              
              {/* 💡 SCROLL CONTENT - Removed Framer Motion drag to use native scroll behavior */}
              <motion.div 
                ref={scrollContentRef}
                className="flex gap-6 w-full py-2 overflow-x-scroll scrollbar-hide snap-x" // 💡 Added overflow-x-scroll and scrollbar-hide (Tailwind plugin needed)
                style={{ scrollBehavior: 'smooth' }} // Added smooth scrolling
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={skillBarItemVariants} 
                    className="bg-gray-800 rounded-lg p-4 flex-shrink-0 w-72 snap-center" // 💡 snap-center added
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.8 }} // 💡 Reduced amount for animation trigger
                        transition={{ duration: 1.2, delay: index * 0.1 }} 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* ---------------- SCROLL BUTTONS ---------------- */}
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none md:pointer-events-auto">
                {/* Right Button */}
                <button
                    onClick={() => scrollByAmount(SCROLL_AMOUNT)}
                    className="p-2 bg-gray-700/50 hover:bg-blue-600 text-white rounded-full transition-colors duration-200 shadow-lg ml-2 opacity-70 hover:opacity-100"
                    aria-label="Scroll right"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none md:pointer-events-auto">
                {/* Left Button */}
                <button
                    onClick={() => scrollByAmount(-SCROLL_AMOUNT)}
                    className="p-2 bg-gray-700/50 hover:bg-blue-600 text-white rounded-full transition-colors duration-200 shadow-lg mr-2 opacity-70 hover:opacity-100"
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;