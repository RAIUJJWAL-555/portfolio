import React from "react";
import { motion } from "framer-motion";
import MagicBento from "../components/magic/MagicBento.jsx";
import DecayCard from "../components/DecayCard.jsx";
import pic from "../../src/assets/react1.svg";

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
  <DecayCard width={120} height={120} image="../../src/assets/html.svg" />
  <DecayCard width={120} height={120} image="../../src/assets/css.svg" />
  <DecayCard width={120} height={120} image="../../src/assets/java-script.png" />
  <DecayCard width={120} height={120} image={pic} />
  <DecayCard width={120} height={120} image="../../src/assets/node.svg" />
  <DecayCard width={120} height={120} image="../../src/assets/express.svg" />
  <DecayCard width={120} height={120} image="../../src/assets/mongoDB.svg" />
  <DecayCard width={120} height={120} image="../../src/assets/database-storage.png" />
  <DecayCard width={120} height={120} image="../../src/assets/python.png" />
  <DecayCard width={120} height={120} image="../../src/assets/c-.png" />
  <DecayCard width={120} height={120} image="../../src/assets/git.svg" />
  <DecayCard width={120} height={120} image="../../src/assets/github.svg" />
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
