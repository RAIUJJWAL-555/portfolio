import React, { Suspense, lazy, useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

// Components imports
import Hero from '../sections/Hero';
import About from '../sections/About';

// Lazy load heavy components
const Projects = lazy(() => import('../sections/Projects'));
const TechTicker = lazy(() => import('../sections/TechTicker'));
const SocialTicker = lazy(() => import('../sections/SocialTicker'));
const Contact = lazy(() => import('../sections/Contact'));
const InfiniteMenu = lazy(() => import('../components/InfiniteMenu'));

// --- CUSTOM LOADING SPINNER ---
const LoadingSpinner = () => (
  <div className="w-full h-[300px] flex items-center justify-center bg-[#0a0a0a]">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);

// --- SOCIAL LINKS DATA (Fallback) ---
const socialLinks = [
  {
    image: 'https://cdn.simpleicons.org/github/white',
    link: 'https://github.com/RAIUJJWAL-555',
    title: 'GitHub',
    description: 'View my code'
  },
  {
    image: 'https://cdn.simpleicons.org/instagram/E4405F',
    link: 'https://www.instagram.com/devrai__001/',
    title: 'Instagram',
    description: 'Follow me'
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    link: 'https://www.linkedin.com/in/raiujjwal555/',
    title: 'LinkedIn',
    description: 'Connect with me'
  },
  {
    image: 'https://cdn.simpleicons.org/fiverr/1DBF73',
    link: 'https://www.fiverr.com/users/mr_ujjwal_/seller_dashboard',
    title: 'Fiverr',
    description: 'Hire me'
  }
];

function Home() {
  const [menuItems, setMenuItems] = useState(socialLinks);

  // --- FETCH PROJECTS FROM FIREBASE FOR INFINITE MENU ---
  useEffect(() => {
    const projectsRef = ref(db, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const projectList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        }));
        
        // Sort by timestamp (newest first)
        projectList.sort((a, b) => b.timestamp - a.timestamp);

        const projectItems = projectList.map((project) => ({
            image: project.image,
            link: project.demo || project.github, // Prefer demo link
            title: project.title,
            description: 'View Project'
        }));
        
        // Combine Projects & Socials
        setMenuItems([...projectItems, ...socialLinks]);
      } else {
        setMenuItems([...socialLinks]); 
      }
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* 1. HERO SECTION (Not Lazy Loaded for LCP) */}
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <About />
        <Projects />
        <SocialTicker />
        <section className="relative py-10 bg-gradient-to-b from-[#0a0a0a] to-black">
           <div className="text-center mb-8">
              <h3 className="text-xl font-poppins font-semibold text-gray-400">Quick Navigation</h3>
           </div>
           
           <div className="h-[600px] w-full relative z-10">
              <InfiniteMenu items={menuItems}/>
           </div>
        </section>

        {/* Contact Section */}
        <Contact />

      </Suspense>
    </div>
  );
}

export default Home;