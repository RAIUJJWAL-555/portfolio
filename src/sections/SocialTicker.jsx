import React from 'react';
import { LogoLoop } from '../components/LogoLoop';
import { SiGithub, SiInstagram, SiLinkedin, SiFiverr } from 'react-icons/si';

const socialLogos = [
  { node: <SiGithub className="text-white" />, title: "GitHub", href: "https://github.com/RAIUJJWAL-555" },
  { node: <SiInstagram className="text-[#E4405F]" />, title: "Instagram", href: "https://www.instagram.com/devrai__001/" },
  { node: <SiLinkedin className="text-[#0A66C2]" />, title: "LinkedIn", href: "https://www.linkedin.com/in/raiujjwal555/" },
  { node: <SiFiverr className="text-[#1DBF73]" />, title: "Fiverr", href: "https://www.fiverr.com/users/mr_ujjwal_/seller_dashboard" },
  { node: <SiGithub className="text-white" />, title: "GitHub", href: "https://github.com/RAIUJJWAL-555" },
  { node: <SiInstagram className="text-[#E4405F]" />, title: "Instagram", href: "https://www.instagram.com/devrai__001/" },
  { node: <SiLinkedin className="text-[#0A66C2]" />, title: "LinkedIn", href: "https://www.linkedin.com/in/raiujjwal555/" },
  { node: <SiFiverr className="text-[#1DBF73]" />, title: "Fiverr", href: "https://www.fiverr.com/users/mr_ujjwal_/seller_dashboard" },
];

export default function SocialTicker() {
  return (
    <section className="py-10 bg-transparent w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
          Social Media Handles
        </h2>
        
        <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={socialLogos}
            speed={100}
            direction="right"
            logoHeight={48}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#00000000" 
            ariaLabel="Social Media Handles"
          />
        </div>
      </div>
    </section>
  );
}
