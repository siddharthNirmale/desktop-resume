import { motion } from 'framer-motion';

export default function ProjectsSection() {
  const projects = [
    { id: 1, title: 'Distributed Systems', tech: 'Rust & gRPC', desc: 'A high-performance node architecture for distributed computing.' },
    { id: 2, title: 'Web OS Portfolio', tech: 'React & Tailwind', desc: 'A draggable, modern desktop interface mimicking a native OS.' },
    { id: 3, title: 'On-Chain Indexer', tech: 'Node.js & Postgres', desc: 'Real-time blockchain analytics and smart contract monitoring.' },
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-[#0c0c0c]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white tracking-wide">Selected Work</h2>
      </div>

      <div className="flex flex-col gap-4 overflow-auto custom-scrollbar pr-2 pb-4">
        {projects.map((project, i) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group border border-neutral-800/80 rounded-xl p-5 hover:bg-[#111111] transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-gray-200 font-medium tracking-wide">{project.title}</h3>
              <span className="text-[10px] px-2 py-1 bg-neutral-800/40 border border-neutral-800 rounded-md text-neutral-400 font-mono">
                {project.tech}
              </span>
            </div>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              {project.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}