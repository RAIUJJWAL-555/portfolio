import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import LogoLoop from '../components/LogoLoop';
import { motion } from 'framer-motion';

// --- STYLES ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap');
  .font-poppins { font-family: 'Poppins', sans-serif; }
`;

function TechTicker() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const skillsRef = ref(db, 'skills');
    const unsubscribe = onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Map to array
        const skillList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        }));
        // Map to LogoLoop format
        const formattedSkills = skillList.map(skill => ({
            // Creating a custom node with image
            node: (
                <div className="flex flex-col items-center justify-center gap-2 group transition-transform hover:scale-110 duration-300">
                    <img 
                        src={skill.image} 
                        alt={skill.title} 
                        className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all"
                    />
                    {/* Optional: Show title on hover or always if desired, but ticker usually just logos */}
                </div>
            ),
            title: skill.title, 
            href: "#" 
        }));
        setSkills(formattedSkills);
      } else {
        setSkills([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // Or skeleton

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
        
        {skills.length > 0 ? (
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
                logos={skills}
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
        ) : (
            <p className="text-center text-gray-500">No skills added yet.</p>
        )}
      </div>
    </section>
  );
}

export default TechTicker;