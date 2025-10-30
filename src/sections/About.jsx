import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Globe,
  Cpu,
  Database,
  Terminal,
  GitBranch,
  Braces,
  Wrench,
  Cloud,
  FileJson,
  Boxes,
  Layers,
  Settings,
  AppWindow,
  Zap,
  Server,
  Shield,
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function About() {
  const scrollRef = useRef(null);

  // Scroll for desktop arrows
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  // 🎯 All Skills with Icons
  const skills = [
    // --- Frontend ---
    { name: "HTML5", level: "Advanced", icon: Globe },
    { name: "CSS3", level: "Advanced", icon: Code2 },
    { name: "JavaScript (ES6+)", level: "Advanced", icon: Zap },
    { name: "React.js", level: "Intermediate", icon: AppWindow },
    { name: "Tailwind CSS", level: "Intermediate", icon: Layers },
    { name: "Bootstrap", level: "Intermediate", icon: Boxes },

    // --- Backend ---
    { name: "Node.js", level: "Intermediate", icon: Server },
    { name: "Express.js", level: "Intermediate", icon: Terminal },
    // { name: "RESTful APIs", level: "Intermediate", icon: Braces },

    // --- Database ---
    { name: "MongoDB", level: "Intermediate", icon: Database },
    { name: "MySQL", level: "Beginner", icon: Database },

    // --- Tools & Version Control ---
    { name: "Git & GitHub", level: "Intermediate", icon: GitBranch },
    { name: "VS Code", level: "Advanced", icon: Wrench },
    { name: "Postman", level: "Intermediate", icon: FileJson },
    { name: "Vercel", level: "Intermediate", icon: Cloud },

    // --- Programming Languages ---
    { name: "Python", level: "Intermediate", icon: Cpu },
    { name: "C", level: "Intermediate", icon: Braces },
    { name: "C++", level: "Intermediate", icon: Braces },

    // --- Security / Others ---
    { name: "Information Security", level: "Beginner", icon: Shield },
    { name: "IoT Basics", level: "Beginner", icon: Settings },
  ];

  return (
    <section id="about" className="w-full bg-gray-950 text-white py-16 px-6 md:px-12 overflow-x-hidden">
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      {/* About Description */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12 text-gray-300 leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-lg">
          Hello! I'm <span className="text-blue-400 font-semibold">Ujjwal Rai</span>,
          a passionate <span className="text-blue-400">Software Engineer</span> in training at
          Government Polytechnic Ghaziabad.  
          I enjoy building modern, interactive, and responsive web apps using
          technologies like React, Node.js, and Python.  
          My goal is to become an <span className="text-blue-400">industry-ready full-stack developer</span>
          capable of solving real-world problems through technology.
        </p>
      </motion.div>

      {/* Skills Section */}
      <div className="relative max-w-6xl mx-auto">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-700 text-white rounded-full p-2 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-700 text-white rounded-full p-2 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Skills */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto overflow-y-hidden px-4 py-4 snap-x snap-mandatory touch-pan-x scrollbar-hide"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="min-w-[160px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center snap-start hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 180, damping: 10 }}
            >
              <skill.icon className="w-10 h-10 mb-3 text-blue-400" />
              <h3 className="text-lg font-semibold">{skill.name}</h3>
              <p className="text-sm text-gray-300 mt-1">{skill.level}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
