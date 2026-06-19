export default function AboutSection() {
  return (
    <div className="flex flex-col h-full space-y-4 p-2 text-sm">
      <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
        <div className="w-16 h-16 bg-gray-200 border-2 border-gray-400 border-inset flex items-center justify-center">
          {/* Add a profile picture here later */}
          <span className="text-2xl">👨‍💻</span>
        </div>
        <div>
          <h2 className="font-bold text-lg">Hello, World!</h2>
          <p className="text-gray-600">Full-Stack Developer</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <p className="mb-3">
          I am a developer who loves building highly interactive and scalable web applications. 
          I specialize in the MERN Stack (MongoDB, Express, ReactJS, Node.js) to craft robust backends and dynamic frontends.
        </p>
        <p className="mb-3">
          When I'm not writing code, I'm usually exploring seamless deployment pipelines and setting up infrastructure using Google Cloud Platform and Render to bring projects to life on the web.
        </p>
        
        <h3 className="font-bold mt-4 mb-2 underline">Tech Stack</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>ReactJS & Tailwind CSS</li>
          <li>Node.js & Express</li>
          <li>MongoDB Atlas</li>
          <li>GCP & Render</li>
        </ul>
      </div>
    </div>
  );
}