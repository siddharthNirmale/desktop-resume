import agent from "../assets/project/agent.png";
import thumbmax from "../assets/project/Thumbmax.png";
import portfolio from "../assets/project/Portfolio.png";


const projects = [
  {
    id: 1,
    year: "2026",
    title: "Desktop Style Portfolio",
    tech: "React.js • Vite • Tailwind CSS • Framer Motion",
    bullets: [
      "Developed a Windows-inspired interactive desktop environment with draggable, resizable application windows.",
      "Implemented smooth animations and complex UI interactions using Framer Motion to optimize visual performance.",
      "Integrated GitHub and weather APIs to dynamically render live activity and data into the frontend interface.",
      "Built custom state management for seamless window utilities and responsive layout handling across devices.",
    ],
    image: portfolio,
    github: "https://github.com/siddharthNirmale/desktop-resume",
    live: "https://siddharthn-portfolio.vercel.app/",
  },
  {
    id: 2,
    year: "2026",
    title: "AI Refund Agent (Preview)",
    tech: "Next.js • TypeScript • Groq AI • Tailwind CSS",
    bullets: [
      "Developed an AI-powered customer service agent using Next.js and Groq AI for intelligent query understanding.",
      "Created a rule-based decision engine with Zustand state management to accurately validate refund eligibility.",
      "Built multi-step dynamic workflows to intelligently route customer queries based on configurable business logic.",
    ],
    image: agent,
    github: "https://github.com/siddharthNirmale/ai-refund-agent",
    live: "https://refundpilot-preview.vercel.app/",
  },
  {
    id: 3,
    year: "2025",
    title: "Thumbmax",
    tech: "Node.js • Express.js • Gemini API • Cloudinary",
    bullets: [
      "Developed a full-stack media platform leveraging Node.js, Express.js, and the Gemini API for thumbnail generation.",
      "Integrated Cloudinary for optimized image processing, scalable storage, and secure media delivery.",
      "Implemented JWT authentication for secure APIs, including request validation and rate limiting on Vercel.",
    ],
    image: thumbmax,
    github: "https://github.com/siddharthNirmale/Thumbnail",
    live: "https://thumbmax-psi.vercel.app/",
  },
];

export default projects;