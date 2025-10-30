// import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import GooeyNav from './components/GooeyNav';
import Skill from './sections/Skill';



function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-gray-950">
     
      {/* <Navbar /> */}
     
     {/* <GooeyNav/> */}
      <Hero />
      <About />
      <Projects />
      <Skill/>
      <Contact />
    </div>
  );
}

export default App;
