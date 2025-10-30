import hostel from "../assets/hostel.png";
import todo from "../assets/todo.png";

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce website built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
    image: "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=E-Commerce",
    github: "https://github.com/ujjwalrai/ecommerce-platform",
    demo: "https://ecommerce-demo.vercel.app"
  },
  {
    id: 2,
    title: "HOSTEL WEBSITE",
    description: "A responsive hostel application using React and nodejs(MERN). Displays record of students and feee status, application status, room status.",
    image : hostel,
    github: "https://github.com/RAIUJJWAL-555/hostel-frontend",
    demo: "https://myhosty.netlify.app/"
  },
  {
    id: 3,
    title: "Task Management Tool",
    description: "A collaborative task management application with real-time updates using React, Firebase, and Material-UI. Includes drag-and-drop functionality.",
    image: todo,
    github: "https://github.com/RAIUJJWAL-555/TO_DO_APP",
    demo: "https://myalltaskmanager.netlify.app/"
  }
];
