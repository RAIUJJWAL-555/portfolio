import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, MapPin, Linkedin, Github, ExternalLink } from "lucide-react";

// --- STYLES & FONTS ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Poppins:wght@500;600;700&display=swap');
  .font-poppins { font-family: 'Poppins', sans-serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      alert("Thank you! I will get back to you soon.");
    }, 1500);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-[#0a0a0a] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center">
      <style>{fontStyles}</style>

      {/* --- FLOATING BACKGROUND ANIMATION --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-400 font-inter text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* --- LEFT SIDE: CONTACT INFO (3D TILT) --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl h-full flex flex-col justify-between hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-shadow duration-300">
              <div>
                <h3 className="text-2xl font-poppins font-semibold mb-6 text-white">Let's collaborate</h3>
                
                <div className="space-y-6 font-inter">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400 font-medium">Email</h4>
                      <p className="text-lg text-white">raiujjwal555@gmail.com</p> {/* Updated based on your context if needed, or put dummy */}
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400 font-medium">Location</h4>
                      <p className="text-lg text-white">Ghaziabad, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h4 className="text-sm text-gray-400 font-medium mb-4 font-inter">Connect with me</h4>
                <div className="flex gap-4">
                  <SocialBtn href="https://www.linkedin.com/in/raiujjwal555/" icon={Linkedin} color="hover:bg-blue-600" />
                  <SocialBtn href="https://github.com" icon={Github} color="hover:bg-gray-700" />
                  <SocialBtn href="#" icon={ExternalLink} color="hover:bg-green-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: FORM (GLASS) --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl space-y-6 shadow-2xl">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 font-inter ml-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-inter"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 font-inter ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-inter"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 font-inter ml-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-inter resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg font-poppins"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* Admin Login Link */}
        <div className="mt-12 text-center">
          <a href="/login" className="text-gray-800 hover:text-gray-600 text-xs transition-colors duration-300">
            Admin Access
          </a>
        </div>
      </div>
    </section>
  );
};

// Helper Component for Social Buttons with Hover Effect
const SocialBtn = ({ href, icon: Icon, color }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5 }}
    className={`p-3 bg-white/5 border border-white/10 rounded-lg text-white transition-all duration-300 ${color}`}
  >
    <Icon size={20} />
  </motion.a>
);

export default Contact;