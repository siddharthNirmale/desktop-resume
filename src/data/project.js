 const projects = [
  {
    id: 1,
    year:"2026",
    title: "Desktop Style Portfolio",
    tech: "React • Vite • Tailwind CSS • Framer Motion • Three.js",
    bullets: [
      "Designed a Windows-inspired desktop experience with draggable and resizable application windows.",
      "Built using React, Vite, Tailwind CSS, Framer Motion, React Three Fiber, and GSAP.",
      "Implemented smooth animations, custom desktop interactions, and responsive layouts.",
      "Integrated GitHub activity, weather widget, projects, resume, and interactive desktop utilities.",
    ],
    image:
      "src/assets/project/Portfolio.png",
    github: "https://github.com/siddharthNirmale/desktop-resume",
    live: "https://siddharthn-portfolio.vercel.app/",
  },
  {
    id: 2,
    year:"2026",
    title: "AI Refund Agent (preview only)",
    tech: "Next.js • Groq AI • TypeScript • Tailwind CSS • Zustand",
    bullets: [
      "Developed an AI-powered refund assistant using Groq AI for intelligent query understanding.",
      "Implemented a rule-based decision engine to validate refund eligibility before AI processing.",
      "Created a multi-step workflow that routes user requests based on business conditions.",
      "Built a modern responsive interface with Next.js, TypeScript, Tailwind CSS, and Zustand.",
    ],
    image:
      "src/assets/project/agent.png",
    github: "https://github.com/siddharthNirmale/ai-refund-agent",
    live: "https://refundpilot-preview.vercel.app/",
  },
  {
    id: 3,
    year:"2025",
    title: "Thumbmax",
    tech: "Node.js • Express.js • Gemini API • Cloudinary",
    bullets: [
      "Built an AI-powered thumbnail generation platform using Gemini API and Cloudinary.",
      "Implemented secure JWT authentication with protected API endpoints.",
      "Added API rate limiting and optimized backend image-processing workflows.",
      "Deployed the production-ready application on Vercel with scalable architecture.",
    ],
    image:
      "src/assets/project/thumbmax.png",
    github: "https://github.com/siddharthNirmale/Thumbnail",
    live: "https://thumbmax-psi.vercel.app/",
  },
];

export default projects;