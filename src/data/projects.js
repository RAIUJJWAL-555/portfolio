import hostel from "../assets/hostel.png";
import todo from "../assets/todo.png";
import image from "../assets/image.png";
import admin from "../assets/admin.png";
import tictac from "../assets/tictac.png";
import p2 from "../assets/port2.png";
import rock from "../assets/rock.png";
import urlshort from "../assets/urlshort.png";

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce website built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
    image: image,
    github: "https://github.com/RAIUJJWAL-555/FullStack",
    demo: "https://forevershoping.vercel.app/"
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
  },
  {
    id: 7,
    title: "Only a portfolio samle",
    description: "Advance UI/UX",
    image: p2,
    github: "https://github.com/RAIUJJWAL-555/3dmodel",
    demo: "https://portfolllioo2.netlify.app/"
  },
  {
    id: 8,
    title: "Url Shortner",
    description: "Just for practice and fun",
    image:urlshort,
    github: "https://github.com/RAIUJJWAL-555?tab=repositories",
    demo: "https://url-shortner-eight-sable.vercel.app/login"
  },{
    id: 4,
    title: "Admin pannel of e-commerce",
    description: "To add and remove items from the e-commerce website.",
    image:admin ,
    github: "https://github.com/RAIUJJWAL-555/TO_DO_APP",
    demo: "https://full-stack-admin1.vercel.app/"
  }
  ,{
    id: 5,
    title: "Rock Paper Scessior",
    description: "Just for practice and fun",
    image:rock ,
    github: "https://github.com/RAIUJJWAL-555?tab=repositories",
    demo: "https://stone-paper-game-xi.vercel.app/"
  }
  ,{
    id: 6,
    title: "TIC TAC TOE",
    description: "Just for practice and fun",
    image:tictac,
    github: "https://github.com/RAIUJJWAL-555?tab=repositories",
    demo: "https://tic-tac-toe-vert-five-46.vercel.app/"
  }
  
];
