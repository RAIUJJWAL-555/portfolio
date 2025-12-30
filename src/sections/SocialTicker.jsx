import React from 'react';
import { LogoLoop } from '../components/LogoLoop';
import { SiGithub, SiInstagram, SiLinkedin, SiFiverr } from 'react-icons/si';
import { motion } from 'framer-motion';

// --- STYLES & FONTS ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap');
  .font-poppins { font-family: 'Poppins', sans-serif; }
`;

// Helper to add glow effect to icons
const GlowIcon = ({ Icon, color, shadowColor }) => (
  <div className="flex items-center justify-center transition-transform hover:scale-110 duration-300">
    <Icon 
      size={40} // Increased size for better visibility
      className={color} 
      style={{ filter: `drop-shadow(0 0 10px ${shadowColor})` }} 
    />
  </div>
);

const socialLogos = [
  { 
    node: <GlowIcon Icon={SiGithub} color="text-white" shadowColor="rgba(255,255,255,0.3)" />, 
    title: "GitHub", 
    href: "https://github.com/RAIUJJWAL-555" 
  },
  { 
    node: <GlowIcon Icon={SiInstagram} color="text-[#E4405F]" shadowColor="rgba(228, 64, 95, 0.4)" />, 
    title: "Instagram", 
    href: "https://www.instagram.com/devrai__001/" 
  },
  { 
    node: <GlowIcon Icon={SiLinkedin} color="text-[#0A66C2]" shadowColor="rgba(10, 102, 194, 0.4)" />, 
    title: "LinkedIn", 
    href: "https://www.linkedin.com/in/raiujjwal555/" 
  },
  { 
    node: <GlowIcon Icon={SiFiverr} color="text-[#1DBF73]" shadowColor="rgba(29, 191, 115, 0.4)" />, 
    title: "Fiverr", 
    href: "https://www.fiverr.com/users/mr_ujjwal_/seller_dashboard" 
  },
  // Duplicates for seamless loop (if needed by your logic, though usually LogoLoop handles it)
  { 
    node: <GlowIcon Icon={SiGithub} color="text-white" shadowColor="rgba(255,255,255,0.3)" />, 
    title: "GitHub", 
    href: "https://github.com/RAIUJJWAL-555" 
  },
  { 
    node: <GlowIcon Icon={SiInstagram} color="text-[#E4405F]" shadowColor="rgba(228, 64, 95, 0.4)" />, 
    title: "Instagram", 
    href: "https://www.instagram.com/devrai__001/" 
  },
  { 
    node: <GlowIcon Icon={SiLinkedin} color="text-[#0A66C2]" shadowColor="rgba(10, 102, 194, 0.4)" />, 
    title: "LinkedIn", 
    href: "https://www.linkedin.com/in/raiujjwal555/" 
  },
  { 
    node: <GlowIcon Icon={SiFiverr} color="text-[#1DBF73]" shadowColor="rgba(29, 191, 115, 0.4)" />, 
    title: "Fiverr", 
    href: "https://www.fiverr.com/users/mr_ujjwal_/seller_dashboard" 
  },
];

export default function SocialTicker() {
  return (
    <section className="py-16 bg-[#0a0a0a] w-full overflow-hidden relative border-t border-white/5">
      <style>{fontStyles}</style>

      {/* --- FLOATING BACKGROUND BLOBS (Subtle) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Animated Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white inline-block relative">
            Connect With Me
            {/* Underline decoration */}
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
          </h2>
        </motion.div>
        
        {/* Ticker Container */}
        <div 
            style={{ 
                height: '140px', 
                position: 'relative', 
                overflow: 'hidden',
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
        >
          <LogoLoop
            logos={socialLogos}
            speed={100} // Slightly faster for energy
            direction="left" // Usually left looks more natural for reading
            logoHeight={48}
            gap={80} // Increased gap for cleaner look
            hoverSpeed={0}
            scaleOnHover={true}
            fadeOut={false} // We handled fadeOut via CSS mask above for better smoothness
            ariaLabel="Social Media Handles"
          />
        </div>
      </div>
    </section>
  );
}