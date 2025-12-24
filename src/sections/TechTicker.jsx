import React from 'react';
import LogoLoop from '../components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiExpress, SiPython, SiCplusplus, SiGithub, SiGit } from 'react-icons/si';

const techLogos = [
  { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-white" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs className="text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiMongodb className="text-[#47A248]" />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiExpress className="text-white" />, title: "Express.js", href: "https://expressjs.com" },
  { node: <SiPython className="text-[#3776AB]" />, title: "Python", href: "https://www.python.org" },
  { node: <SiCplusplus className="text-[#00599C]" />, title: "C++", href: "https://cplusplus.com" },
  { node: <SiGit className="text-[#F05032]" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiGithub className="text-white" />, title: "GitHub", href: "https://github.com" },
];

function TechTicker() {
  return (
    <section className="py-10 bg-transparent w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
          Technologies I Work With
        </h2>
        
        <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
          {/* Basic horizontal loop */}
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={48}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#00000000" 
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </section>
  );
}

export default TechTicker;
