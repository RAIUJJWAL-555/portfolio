import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2, Globe, Cpu, Database, Terminal, GitBranch,
  Braces, Wrench, Cloud, FileJson, Boxes, Layers,
  Server, Shield, Settings, AppWindow, Zap
} from "lucide-react";

// --- CUSTOM FONTS & STYLES ---
// Is style tag ko production me index.css me daal sakte hain
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Poppins:wght@500;700&display=swap');
  
  .font-poppins { font-family: 'Poppins', sans-serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
`;

const skills = [
  // --- Frontend ---
  { name: "HTML5", level: "Advanced", icon: Globe, color: "#E34F26", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS3", level: "Advanced", icon: Code2, color: "#1572B6", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript", level: "Advanced", icon: Zap, color: "#F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "React.js", level: "Intermediate", icon: AppWindow, color: "#61DAFB", url: "https://react.dev/" },
  { name: "Tailwind", level: "Intermediate", icon: Layers, color: "#38B2AC", url: "https://tailwindcss.com/" },
  // --- Backend & DB ---
  { name: "Node.js", level: "Intermediate", icon: Server, color: "#339933", url: "https://nodejs.org/" },
  { name: "Express.js", level: "Intermediate", icon: Terminal, color: "#000000", url: "https://expressjs.com/" },
  { name: "MongoDB", level: "Intermediate", icon: Database, color: "#47A248", url: "https://www.mongodb.com/" },
  { name: "MySQL", level: "Beginner", icon: Database, color: "#4479A1", url: "https://www.mysql.com/" },
  // --- Tools ---
  { name: "Git & GitHub", level: "Intermediate", icon: GitBranch, color: "#F05032", url: "https://git-scm.com/" },
  { name: "Python", level: "Intermediate", icon: Cpu, color: "#3776AB", url: "https://www.python.org/" },
  { name: "C/C++", level: "Intermediate", icon: Braces, color: "#00599C", url: "https://isocpp.org/" },
];

// --- 3D CARD COMPONENT ---
const SkillCard = ({ skill, index }) => {
  return (
    <motion.a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateX: 10, 
        rotateY: 10, 
        zIndex: 10,
        boxShadow: "0px 15px 30px rgba(88, 166, 255, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden group cursor-pointer block"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* Hover Gradient Background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
        style={{ background: `linear-gradient(135deg, ${skill.color}, transparent)` }}
      />
      
      <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
        <skill.icon size={32} style={{ color: skill.color }} />
      </div>
      
      <h3 className="text-white font-poppins font-semibold text-sm tracking-wide">{skill.name}</h3>
      <span className="text-xs text-gray-400 font-inter">{skill.level}</span>
    </motion.a>
  );
};

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-screen bg-[#0a0a0a] text-white py-20 px-6 md:px-12 overflow-hidden">
      <style>{fontStyles}</style>

      {/* --- FLOATING BACKGROUND SHAPES --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          
          <div className="glass-card max-w-3xl mx-auto p-8 rounded-2xl">
            <p className="text-lg md:text-xl text-gray-300 font-inter leading-relaxed">
              Hello! I'm <span className="text-blue-400 font-bold">Ujjwal Rai</span>, 
              a passionate <span className="text-purple-400 font-semibold">MERN Stack Developer</span> and student at 
              Government Polytechnic Ghaziabad.
              <br /><br />
              I love building modern, interactive web apps using <span className="text-white font-medium">React, Node.js, and Python</span>. 
              My goal is to craft seamless digital experiences that solve real-world problems.
            </p>
          </div>
        </motion.div>

        {/* --- SKILLS GRID --- */}
        <div className="mt-12">
          <motion.h3 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-poppins font-bold mb-8 text-center md:text-left pl-2 border-l-4 border-blue-500"
          >
            Technical Arsenal
          </motion.h3>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}