import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import CircularGallery from "../components/CircularGallery.jsx";
import { Github, ExternalLink, Layers } from "lucide-react";

// --- STYLES & FONTS ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Poppins:wght@500;700&display=swap');
  .font-poppins { font-family: 'Poppins', sans-serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
`;

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectsRef = ref(db, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const projectList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        // Sort by timestamp if available, descending
        projectList.sort((a, b) => b.timestamp - a.timestamp);
        setProjectsData(projectList);
      } else {
        setProjectsData([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen bg-[#0a0a0a] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <style>{fontStyles}</style>

      {/* --- FLOATING BACKGROUND BLOBS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-[-100px] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-blue-500 font-inter font-medium tracking-wider uppercase text-sm">
            My Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-poppins mt-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* --- PROJECTS GRID --- */}
        {loading ? (
             <div className="flex justify-center items-center h-40">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
        ) : (
            <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
            >
            {projectsData.length === 0 ? (
                <div className="col-span-full text-center text-gray-400">No projects added yet.</div>
            ) : (
                projectsData.map((project) => (
                    <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ 
                        y: -10, 
                        boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.2)",
                        borderColor: "rgba(59, 130, 246, 0.3)"
                    }}
                    className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full transition-all duration-300"
                    >
                    {/* Image Section */}
                    <div className="relative overflow-hidden h-52">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60 z-10" />
                        <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Floating Icon Overlay */}
                        <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/10">
                        <Layers size={18} className="text-blue-400" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold font-poppins text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-inter flex-grow line-clamp-3">
                        {project.description}
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-auto">
                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 px-4 rounded-lg transition-all text-sm font-medium font-inter"
                        >
                            <Github size={16} /> Code
                        </motion.a>
                        
                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-all text-sm font-medium font-inter shadow-lg shadow-blue-900/20"
                        >
                            <ExternalLink size={16} /> Live Demo
                        </motion.a>
                        </div>
                    </div>
                    </motion.div>
                ))
            )}
            </motion.div>
        )}

        {/* --- CIRCULAR GALLERY SECTION --- */}
        <div className="relative">
          <motion.h3 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-center text-xl font-poppins text-gray-400 mb-8"
          >
            Explore More
          </motion.h3>
          
          <div style={{ height: "600px", position: "relative" }} className="glass-card rounded-3xl overflow-hidden border-0">
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.05}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;