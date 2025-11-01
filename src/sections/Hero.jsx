import { motion } from "framer-motion";
import ProfileCard from "../components/profile/ProfileCard.jsx";
import SplashCursor from "../components/SplashCursor.jsx"; // Assuming this is the correct path
import myimg2 from "../assets/myimg2.png";
import PillNav from "../components/PillNav.jsx";
// Removed: import { div } from "framer-motion/client"; // (Not necessary here)
import Lightning from "../components/Lightning.jsx";

const Hero = () => {
  // ... (Variants and navItems remain the same)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
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
    <div>
      <PillNav
        logo={myimg2}
        logoAlt="Company Logo"
        items={navItems}
        activeHref="#hero" // Active link set to #hero (for home)
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#000000"
        pillTextColor="#000000"
      />
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-950 pt-16 pb-12"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* 💡 FIX: Lightning Component को background में ले जाने के लिए */}
        <div
          className="absolute inset-0 z-0"
          style={{ pointerEvents: "none" }} // Ensure clicks go through to content
        >
          <Lightning
            hue={220} // Blue/Violet hue
            xOffset={0}
            speed={1}
            intensity={1}
            size={1}
          />
        </div>

        {/* 2. SplashCursor (If you ever use it) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
        >
          <SplashCursor /> 
        </div>

        {/* Main Content Container (z-index 20) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center"
          style={{ position: "relative", zIndex: 20 }} // 👈 zIndex 20 ensure content is on top
        >
          {/* ... (H1, P, and Buttons content remains the same) ... */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Ujjwal Rai
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl"
          >
            Future Software Engineer | Web Developer | Tech Enthusiast
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              View My Work
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-200"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Profile Card Container */}
          <motion.div variants={itemVariants} className="mt-8 w-full max-w-sm">
            <ProfileCard
              name="Ujjwal Rai"
              title="Software Engineer"
              handle="RaiDev"
              status="Online"
              contactText="Instagram" // 💡 Changed text to fit Instagram/Social media action
              avatarUrl={myimg2}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                // 💡 यहाँ अपना Instagram URL डालें
                window.open(
                  "https://www.instagram.com/rrai__2005/",
                  "_blank"
                );
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16">
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
