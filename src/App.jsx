import { Suspense, lazy } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import { projects } from './data/projects';

// Lazy load heavy components
const Projects = lazy(() => import('./sections/Projects'));
const TechTicker = lazy(() => import('./sections/TechTicker'));
const SocialTicker = lazy(() => import('./sections/SocialTicker'));
const Contact = lazy(() => import('./sections/Contact'));
const InfiniteMenu = lazy(() => import('./components/InfiniteMenu'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// --- SOCIAL LINKS DATA ---
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

// Combine projects and social links for the 3D menu
const menuItems = [
  ...projects.map((project) => ({
    image: project.image,
    link: project.demo,
    title: project.title,
    description: project.description
  })),
  ...socialLinks
];

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-gray-950">
      {/* <Navbar /> */}
     {/* <GooeyNav/> */}
      <Hero />
      <About />
      <Suspense fallback={<LoadingSpinner />}>
        <SocialTicker />
        <Projects />
        <div className="h-[600px] w-full relative">
          <InfiniteMenu items={menuItems}/>
        </div>
        <Contact />
      </Suspense>
    </div>
  );
}
export default App;
