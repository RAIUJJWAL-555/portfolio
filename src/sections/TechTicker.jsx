import React from 'react';
import LogoLoop from '../components/LogoLoop';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiNodedotjs, SiMongodb, SiExpress, SiPython, 
  SiCplusplus, SiGithub, SiGit 
} from 'react-icons/si';
import { motion } from 'framer-motion';

// --- STYLES ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap');
  .font-poppins { font-family: 'Poppins', sans-serif; }
`;

// Helper for Neon Glow Effect
const GlowIcon = ({ Icon, color, shadowColor }) => (
  <div className="flex items-center justify-center transition-transform hover:scale-110 duration-300">
    <Icon 
      size={48} 
      className={color} 
      style={{ filter: `drop-shadow(0 0 10px ${shadowColor})` }} 
    />
  </div>
);

const techLogos = [
  { node: <GlowIcon Icon={SiReact} color="text-[#61DAFB]" shadowColor="rgba(97, 218, 251, 0.4)" />, title: "React", href: "https://react.dev" },
  { node: <GlowIcon Icon={SiNextdotjs} color="text-white" shadowColor="rgba(255, 255, 255, 0.3)" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <GlowIcon Icon={SiTypescript} color="text-[#3178C6]" shadowColor="rgba(49, 120, 198, 0.4)" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <GlowIcon Icon={SiTailwindcss} color="text-[#06B6D4]" shadowColor="rgba(6, 182, 212, 0.4)" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <GlowIcon Icon={SiNodedotjs} color="text-[#339933]" shadowColor="rgba(51, 153, 51, 0.4)" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <GlowIcon Icon={SiMongodb} color="text-[#47A248]" shadowColor="rgba(71, 162, 72, 0.4)" />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <GlowIcon Icon={SiExpress} color="text-white" shadowColor="rgba(255, 255, 255, 0.3)" />, title: "Express.js", href: "https://expressjs.com" },
  { node: <GlowIcon Icon={SiPython} color="text-[#3776AB]" shadowColor="rgba(55, 118, 171, 0.4)" />, title: "Python", href: "https://www.python.org" },
  { node: <GlowIcon Icon={SiCplusplus} color="text-[#00599C]" shadowColor="rgba(0, 89, 156, 0.4)" />, title: "C++", href: "https://cplusplus.com" },
  { node: <GlowIcon Icon={SiGit} color="text-[#F05032]" shadowColor="rgba(240, 80, 50, 0.4)" />, title: "Git", href: "https://git-scm.com" },
  { node: <GlowIcon Icon={SiGithub} color="text-white" shadowColor="rgba(255, 255, 255, 0.3)" />, title: "GitHub", href: "https://github.com" },
];

function TechTicker() {
  return (
    <section className="py-16 bg-[#0a0a0a] w-full overflow-hidden relative">
      <style>{fontStyles}</style>

      {/* --- FLOATING BLOBS (To match other sections) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-[90px]" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-purple-600/10 rounded-full blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white inline-block relative">
            Technologies I Work With
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
          </h2>
        </motion.div>
        
        <div 
          style={{ 
            height: '140px', 
            position: 'relative', 
            overflow: 'hidden',
            // CSS Mask for smooth fade out on edges
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <LogoLoop
            logos={techLogos}
            speed={100} // Same speed as social ticker
            direction="left"
            logoHeight={48}
            gap={80} // Consistent spacing
            hoverSpeed={0}
            scaleOnHover
            fadeOut={false} // Handled by CSS mask above
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </section>
  );
}

export default TechTicker;