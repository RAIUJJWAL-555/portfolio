import React from "react";
import { motion } from "framer-motion";
import MagicBento from "../components/magic/MagicBento.jsx";
import DecayCard from "../components/DecayCard.jsx";
import pic from "../../src/assets/react1.svg";
import htmlIcon from "../../src/assets/html.svg";
import cssIcon from "../../src/assets/css.svg";
import jsIcon from "../../src/assets/java-script.png";
import nodeIcon from "../../src/assets/node.svg";
import expressIcon from "../../src/assets/express.svg";
import mongoIcon from "../../src/assets/mongoDB.svg";
import storageIcon from "../../src/assets/database-storage.png";
import pythonIcon from "../../src/assets/python.png";
import cIcon from "../../src/assets/c-.png";
import gitIcon from "../../src/assets/git.svg";
import githubIcon from "../../src/assets/github.svg";
import reactIcon from "../../src/assets/react1.svg";

const Skill = () => {
  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-9100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            My Skills
          </h2>

          {/* Horizontal skill cards */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-8 mt-8">
  <DecayCard width={120} height={120} image={htmlIcon} />
  <DecayCard width={120} height={120} image={cssIcon} />
  <DecayCard width={120} height={120} image={jsIcon} />
  <DecayCard width={120} height={120} image={reactIcon} /> {/* Use 'reactIcon' or 'pic' */}
  <DecayCard width={120} height={120} image={nodeIcon} />
  <DecayCard width={120} height={120} image={expressIcon} />
  <DecayCard width={120} height={120} image={mongoIcon} />
  <DecayCard width={120} height={120} image={storageIcon} />
  <DecayCard width={120} height={120} image={pythonIcon} />
  <DecayCard width={120} height={120} image={cIcon} />
  <DecayCard width={120} height={120} image={gitIcon} />
  <DecayCard width={120} height={120} image={githubIcon} />
</div>

          <MagicBento
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={200}
            particleCount={12}
            glowColor="132, 0, 255"
          />
          
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>
      </div>
      {/* magic bent --------------------  */}
    </section>
  );
};

export default Skill;
