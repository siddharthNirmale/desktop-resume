import agent from "../assets/project/agent.webp";
import agentThumb from "../assets/project/agent-thumb.webp";
import thumbmax from "../assets/project/thumbmax.webp";
import thumbmaxThumb from "../assets/project/thumbmax-thumb.webp";
import portfolio from "../assets/project/portfolio.webp";
import portfolioThumb from "../assets/project/portfolio-thumb.webp";
import lekha from "../assets/project/lekha.webp";
import lekhaThumb from "../assets/project/lekha-thumb.webp";
import lekhaScratchpad from "../assets/project/lekha-scratchpad.webp";
import lekhaReceipt from "../assets/project/lekha-receipt.webp";

const projects = [
  {
    id: 1,
    year: "2026",
    title: "Lekha",
    badge: "Original Design",
    type: "Original Design",
    description:
      "An original landing page design for a premium pen brand, focused on tactile interactions, product storytelling, and an editorial-inspired visual experience.",
    tech: "React 19 • TypeScript • Tailwind CSS • Vite • Framer Motion • HTML5 Canvas • Web Audio API • Rough.js • Lenis • Lucide React",
    bullets: [
      "Designed and developed an editorial landing page with scroll-driven pen disassembly animations and immersive product storytelling.",
      "Engineered an interactive ink scratchpad featuring procedural drawing effects built with HTML5 Canvas and Rough.js.",
      "Implemented realistic tactile sound interactions with Web Audio API and ultra-smooth momentum scrolling powered by Lenis.",
      "Crafted responsive micro-interactions and high-performance animations using Framer Motion and Tailwind CSS v4.",
    ],
    thumbnail: lekhaThumb,
    image: lekha,
    images: [lekha, lekhaScratchpad, lekhaReceipt],
    live: "https://lekha-lilac.vercel.app/",
  },
  {
    id: 2,
    year: "2026",
    title: "Desktop Style Portfolio",
    tech: "React.js • Vite • Tailwind CSS • Framer Motion",
    bullets: [
      "Developed a Windows-inspired interactive desktop environment with draggable, resizable application windows.",
      "Implemented smooth animations and complex UI interactions using Framer Motion to optimize visual performance.",
      "Integrated GitHub and weather APIs to dynamically render live activity and data into the frontend interface.",
      "Built custom state management for seamless window utilities and responsive layout handling across devices.",
    ],
    thumbnail: portfolioThumb,
    image: portfolio,
    github: "https://github.com/siddharthNirmale/desktop-resume",
    live: "https://siddharthn-portfolio.vercel.app/",
  },
  {
    id: 3,
    year: "2026",
    title: "AI Refund Agent (Preview)",
    tech: "Next.js • TypeScript • Groq AI • Tailwind CSS",
    bullets: [
      "Developed an AI-powered customer service agent using Next.js and Groq AI for intelligent query understanding.",
      "Created a rule-based decision engine with Zustand state management to accurately validate refund eligibility.",
      "Built multi-step dynamic workflows to intelligently route customer queries based on configurable business logic.",
    ],
    thumbnail: agentThumb,
    image: agent,
    github: "https://github.com/siddharthNirmale/ai-refund-agent",
    live: "https://refundpilot-preview.vercel.app/",
  },
  {
    id: 4,
    year: "2025",
    title: "Thumbmax",
    tech: "Node.js • Express.js • Gemini API • Cloudinary",
    bullets: [
      "Developed a full-stack media platform leveraging Node.js, Express.js, and the Gemini API for thumbnail generation.",
      "Integrated Cloudinary for optimized image processing, scalable storage, and secure media delivery.",
      "Implemented JWT authentication for secure APIs, including request validation and rate limiting on Vercel.",
    ],
    thumbnail: thumbmaxThumb,
    image: thumbmax,
    github: "https://github.com/siddharthNirmale/Thumbnail",
    live: "https://thumbmax-psi.vercel.app/",
  },
];

export default projects;


