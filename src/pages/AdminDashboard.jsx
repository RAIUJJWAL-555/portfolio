import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updatePassword } from 'firebase/auth';
import { ref, push, onValue, remove } from "firebase/database";
import { db } from '../firebase';
import { Trash2, Plus, Code, LogOut, User, Save, Database } from 'lucide-react';
import { motion } from 'framer-motion';

// --- INITIAL DATA FOR SEEDING ---
const initialSkills = [
  { title: "HTML5", level: "Advanced", image: "Globe", color: "#E34F26", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { title: "CSS3", level: "Advanced", image: "Code2", color: "#1572B6", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { title: "JavaScript", level: "Advanced", image: "Zap", color: "#F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { title: "React.js", level: "Intermediate", image: "AppWindow", color: "#61DAFB", url: "https://react.dev/" },
  { title: "Tailwind", level: "Intermediate", image: "Layers", color: "#38B2AC", url: "https://tailwindcss.com/" },
  { title: "Node.js", level: "Intermediate", image: "Server", color: "#339933", url: "https://nodejs.org/" },
  { title: "MongoDB", level: "Intermediate", image: "Database", color: "#47A248", url: "https://www.mongodb.com/" },
  { title: "Git & GitHub", level: "Intermediate", image: "GitBranch", color: "#F05032", url: "https://git-scm.com/" },
];

const initialProjects = [
    { title: "Hostel Management", description: "MERN Stack app with Admin Dashboard", image: "https://placehold.co/600x400/1a1a1a/FFF", github: "#", demo: "#" },
    { title: "Portfolio Website", description: "Personal portfolio with 3D animations", image: "https://placehold.co/600x400/1a1a1a/FFF", github: "#", demo: "#" },
];

// --- STYLES ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Poppins:wght@500;600;700&display=swap');
  .font-poppins { font-family: 'Poppins', sans-serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
  
  .glass-panel {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  }

  /* Custom Scrollbar */
  .custom-scroll::-webkit-scrollbar { width: 6px; }
  .custom-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
  .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
  .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
`;

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]); 
  
  // Refs
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const imageRef = useRef();
  const githubRef = useRef();
  const demoRef = useRef();
  const skillTitleRef = useRef();
  const skillImageRef = useRef();
  const skillLevelRef = useRef();
  const skillColorRef = useRef();
  const skillUrlRef = useRef();

  useEffect(() => {
    const projectsRef = ref(db, 'projects');
    const unsubProjects = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      setProjects(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []);
    });

    const skillsRef = ref(db, 'skills');
    const unsubSkills = onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      setSkills(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []);
    });

    return () => { unsubProjects(); unsubSkills(); };
  }, []);

  async function handleLogout() {
    try { await logout(); navigate('/login'); } catch { setError("Failed to log out"); }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setLoading(true); setError(""); setMessage("");
    const promises = [];
    if (nameRef.current.value !== currentUser.displayName) {
      promises.push(updateProfile(currentUser, { displayName: nameRef.current.value }));
    }
    if (passwordRef.current.value) {
        if (passwordRef.current.value !== passwordConfirmRef.current.value) return setError("Passwords do not match");
        promises.push(updatePassword(currentUser, passwordRef.current.value));
    }
    Promise.all(promises).then(() => setMessage("Profile updated successfully")).catch((err) => setError("Failed: " + err.message)).finally(() => setLoading(false));
  }

  async function handleAddProject(e) {
    e.preventDefault();
    setLoading(true); setError(""); setMessage("");
    try {
      await push(ref(db, 'projects'), {
        title: titleRef.current.value,
        description: descRef.current.value,
        image: imageRef.current.value,
        github: githubRef.current.value,
        demo: demoRef.current.value,
        timestamp: Date.now()
      });
      setMessage("Project added!"); e.target.reset();
    } catch (err) { setError("Error: " + err.message); }
    setLoading(false);
  }

  async function handleAddSkill(e) {
    e.preventDefault();
    setLoading(true); setError(""); setMessage("");
    try {
      await push(ref(db, 'skills'), {
        title: skillTitleRef.current.value,
        image: skillImageRef.current.value, // Stores Icon Name string (e.g. "React") or URL
        level: skillLevelRef.current.value,
        color: skillColorRef.current.value,
        url: skillUrlRef.current.value,
        timestamp: Date.now()
      });
      setMessage("Skill added!"); e.target.reset();
    } catch (err) { setError("Error: " + err.message); }
    setLoading(false);
  }

  const handleDelete = async (path, id) => {
    if (!window.confirm("Are you sure?")) return;
    try { await remove(ref(db, `${path}/${id}`)); setMessage("Deleted successfully"); } 
    catch { setError("Failed to delete"); }
  };

  const seedData = async (type) => {
    if (!window.confirm(`Seed default ${type}?`)) return;
    setLoading(true);
    try {
        const data = type === 'projects' ? initialProjects : initialSkills;
        const dbRef = ref(db, type);
        for (const item of data) await push(dbRef, { ...item, timestamp: Date.now() });
        setMessage(`${type} seeded!`);
    } catch (err) { setError("Seed failed: " + err.message); }
    setLoading(false);
  };

  // Helper component for input fields
  const Input = ({ r, p, type="text" }) => (
    <input ref={r} type={type} required placeholder={p} className="w-full px-4 py-3 bg-[#0d1117] border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-all outline-none font-inter text-sm" />
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      <style>{fontStyles}</style>
      
      {/* FLOATING BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-8 relative z-10">
        
        {/* HEADER */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-white/10 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm font-inter">Manage your portfolio content</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg transition-all font-medium text-sm">
            <LogOut size={16} /> Logout
          </button>
        </motion.header>

         {/* ALERTS */}
         {message && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg font-inter">{message}</motion.div>}
         {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg font-inter">{error}</motion.div>}

        {/* PROFILE SECTION */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-6 rounded-2xl mb-8">
            <h2 className="text-xl font-semibold mb-6 text-white font-poppins flex items-center gap-2"><User size={20} className="text-blue-400"/> Profile Settings</h2>
            <form onSubmit={handleUpdateProfile} className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-4">
                    <Input r={nameRef} p="Display Name" />
                    <div className="text-xs text-gray-500 px-1">Current: {currentUser.email}</div>
                </div>
                <div className="flex-1 space-y-4">
                    <Input r={passwordRef} type="password" p="New Password (leave blank to keep)" />
                    <Input r={passwordConfirmRef} type="password" p="Confirm Password" />
                </div>
                <button disabled={loading} type="submit" className="h-fit px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center">
                    <Save size={18} /> Update
                </button>
            </form>
        </motion.section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* LEFT COL: FORMS */}
          <div className="space-y-8">
            
            {/* ADD SKILL FORM */}
             <motion.section initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-6 text-white font-poppins flex items-center gap-2">
                 <Code size={20} className="text-purple-400"/> Add Skill
              </h2>
              <form onSubmit={handleAddSkill} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input r={skillTitleRef} p="Skill Name (e.g. React)" />
                    <select ref={skillLevelRef} className="w-full px-4 py-3 bg-[#0d1117] border border-gray-700 rounded-lg text-white outline-none focus:border-purple-500 text-sm">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <Input r={skillImageRef} p="Icon Name (e.g. 'React') or URL" />
                <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                     <Input r={skillUrlRef} p="Documentation URL" />
                     <div className="flex items-center gap-2 bg-[#0d1117] border border-gray-700 rounded-lg px-2 h-full">
                        <input ref={skillColorRef} type="color" defaultValue="#61DAFB" className="w-8 h-8 bg-transparent border-none cursor-pointer" title="Glow Color" />
                     </div>
                </div>
                <button disabled={loading} type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-all shadow-lg shadow-purple-900/20">Add Skill</button>
              </form>
            </motion.section>

            {/* ADD PROJECT FORM */}
            <motion.section initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-6 text-white font-poppins flex items-center gap-2">
                 <Plus size={20} className="text-green-400"/> Add Project
              </h2>
              <form onSubmit={handleAddProject} className="space-y-4">
                <Input r={titleRef} p="Project Title" />
                <textarea ref={descRef} required rows="3" placeholder="Description" className="w-full px-4 py-3 bg-[#0d1117] border border-gray-700 rounded-lg focus:border-green-500 text-white placeholder-gray-500 outline-none text-sm resize-none" />
                <Input r={imageRef} p="Image URL (cover)" />
                <div className="grid grid-cols-2 gap-4">
                    <Input r={githubRef} p="GitHub URL" />
                    <Input r={demoRef} p="Live Demo URL" />
                </div>
                <button disabled={loading} type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-all shadow-lg shadow-green-900/20">Add Project</button>
              </form>
            </motion.section>

          </div>

          {/* RIGHT COL: LISTS */}
          <div className="space-y-8">
            
            {/* SKILLS LIST */}
            <motion.section initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-2xl h-[450px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white font-poppins">Technical Arsenal <span className="text-gray-500 text-sm font-normal">({skills.length})</span></h2>
                    <button onClick={() => seedData('skills')} className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition"><Database size={12}/> Seed Defaults</button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto custom-scroll pr-2">
                    {skills.map(s => (
                        <div key={s.id} className="relative group p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col items-center gap-2 hover:bg-white/10 transition-colors">
                             <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 text-xs font-bold text-gray-400">
                                {/* Since we store string names mostly, we just show first letter if standard icon fails, or img if url */}
                                {s.image.startsWith('http') ? <img src={s.image} className="w-full h-full rounded-full object-cover"/> : s.image[0]}
                             </div>
                            <span className="text-sm font-medium text-white truncate w-full text-center">{s.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-gray-400 border border-white/5">{s.level}</span>
                            <div className="w-full h-1 rounded-full mt-1" style={{ background: s.color || '#555' }}></div>
                            
                            <button onClick={() => handleDelete('skills', s.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-400 hover:bg-red-400/20 p-1.5 rounded transition-all">
                                <Trash2 size={14}/>
                            </button>
                        </div>
                    ))}
                    {skills.length === 0 && <div className="col-span-full h-full flex items-center justify-center text-gray-500 text-sm">No skills found. Use Seed button.</div>}
                </div>
            </motion.section>

            {/* PROJECTS LIST */}
            <motion.section initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-2xl h-[450px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white font-poppins">Projects <span className="text-gray-500 text-sm font-normal">({projects.length})</span></h2>
                    <button onClick={() => seedData('projects')} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition"><Database size={12}/> Seed Defaults</button>
                </div>

                <div className="space-y-3 overflow-y-auto custom-scroll pr-2">
                    {projects.map(p => (
                        <div key={p.id} className="group flex gap-4 p-3 bg-white/5 border border-white/5 rounded-xl items-center hover:bg-white/10 transition-colors">
                            <img src={p.image} alt={p.title} className="w-16 h-12 rounded-lg object-cover bg-gray-800" />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-white truncate font-poppins text-sm">{p.title}</h4>
                                <p className="text-xs text-gray-400 truncate">{p.description}</p>
                            </div>
                            <button onClick={() => handleDelete('projects', p.id)} className="text-red-400 p-2 hover:bg-red-400/20 rounded-lg transition opacity-50 group-hover:opacity-100"><Trash2 size={16}/></button>
                        </div>
                    ))}
                    {projects.length === 0 && <div className="h-full flex items-center justify-center text-gray-500 text-sm">No projects found. Use Seed button.</div>}
                </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
}