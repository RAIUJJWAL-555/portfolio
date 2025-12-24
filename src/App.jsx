// import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import TechTicker from './sections/TechTicker';
import SocialTicker from './sections/SocialTicker';
import Contact from './sections/Contact';
import InfiniteMenu from './components/InfiniteMenu';


function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-gray-950">
     
      {/* <Navbar /> */}
     
     {/* <GooeyNav/> */}
      <Hero />
      <About />
      <TechTicker />
      <SocialTicker />
      <Projects />
      <InfiniteMenu/>
      <Contact />
    </div>
  );
}

export default App;
