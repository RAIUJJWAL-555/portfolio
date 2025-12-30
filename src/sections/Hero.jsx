import { motion } from "framer-motion";
import { useState, useEffect, Suspense, lazy } from "react";
import ProfileCard from "../components/profile/ProfileCard.jsx";
import SplashCursor from "../components/SplashCursor.jsx";
import myimg2 from "../assets/myimg2.png";
import PillNav from "../components/PillNav.jsx";

const Lightning = lazy(() => import("../components/Lightning.jsx"));

// --- CUSTOM FONTS & ANIMATIONS ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Poppins:wght@500;700;800&display=swap');
  
  .font-poppins { font-family: 'Poppins', sans-serif; }
  .font-inter { font-family: 'Inter', sans-serif; }

  /* Blinking Cursor for Typing Effect */
  .cursor-blink::after {
    content: '|';
    display: inline-block;
    margin-left: 4px;
    animation: blink 1s step-end infinite;
    color: #3b82f6; /* Blue color */
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const Hero = () => {
  // --- TYPING EFFECT LOGIC ---
  const [text, setText] = useState("");
  const fullText = "Future Software Engineer | Web Developer | Tech Enthusiast";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 80); // Typing speed (ms)
    return () => clearInterval(timer);
  }, []);

  // --- VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const navItems = [
    { label: "Home", href: "#hero", scroll: true },
    { label: "About", href: "#about", scroll: true },
    { label: "Projects", href: "#projects", scroll: true },
    { label: "Contact", href: "#contact", scroll: true },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-[#0a0a0a] overflow-hidden">
      <style>{styles}</style>
      
      <PillNav
        logo={myimg2}
        logoAlt="Ujjwal Rai"
        items={navItems}
        activeHref="#hero"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="rgba(20, 20, 20, 0.6)" // Glass style nav
        pillColor="#1a1a1a" // Dark pill
        hoveredPillTextColor="#ffffff"
        pillTextColor="#ffffff"
      />

      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center pt-20 pb-12 relative"
      >
        {/* --- LAYER 1: LIGHTNING BACKGROUND --- */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <Suspense fallback={null}>
            <Lightning hue={210} xOffset={0} speed={1} intensity={1} size={1} />
          </Suspense>
        </div>

        {/* --- LAYER 2: FLOATING BLOBS (Matching other pages) --- */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           <motion.div 
             animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" 
           />
           <motion.div 
             animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" 
           />
        </div>

        {/* --- LAYER 3: SPLASH CURSOR --- */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* <SplashCursor />  */}
        </div>

        {/* --- LAYER 4: MAIN CONTENT --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-4">
             <span className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-inter font-medium tracking-wide">
                Welcome to my portfolio
             </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold font-poppins text-white mb-6 leading-tight"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Ujjwal Rai
            </span>
          </motion.h1>

          {/* Typing Effect Subtitle */}
          <motion.div variants={itemVariants} className="h-8 sm:h-10 mb-8">
            <p className="text-lg sm:text-2xl text-gray-300 font-inter font-light">
              <span className="cursor-blink">{text}</span>
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3.5 bg-blue-600 text-white font-poppins font-medium rounded-lg transition-all"
            >
              View My Work
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3.5 border border-white/20 text-white font-poppins font-medium rounded-lg backdrop-blur-sm transition-all"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Profile Card */}
          <motion.div 
            variants={itemVariants} 
            className="w-full max-w-sm relative group perspective-1000"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            
            <ProfileCard
              name="Ujjwal Rai"
              title="Full Stack Developer"
              handle="@RaiDev"
              status="Coding..."
              contactText="Instagram"
              avatarUrl={myimg2}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={true}
              onContactClick={() => {
                window.open("https://www.instagram.com/rrai__2005/", "_blank");
              }}
            />
          </motion.div>

          {/* Scroll Down Arrow */}
          <motion.div 
            variants={itemVariants} 
            className="mt-16 animate-bounce cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <svg
              className="w-6 h-6 text-gray-500 hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>

        </motion.div>
      </section>
    </div>
  );
};

export default Hero;