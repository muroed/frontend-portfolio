import { useInView } from "@/hooks/useInView";

export default function Hero() {
  const { ref, isVisible } = useInView();
  
  return (
    <section className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Frontend Developer <br />
              <span className="text-indigo-500">With a Passion for UI</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-lg">
              Building beautiful, responsive, and user-friendly web applications with modern technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                View Projects
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Contact Me
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div ref={ref} className={`relative bg-slate-700 rounded-xl p-1 shadow-2xl w-full max-w-md transform transition-transform duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="font-mono text-xs md:text-sm overflow-x-auto bg-slate-900 rounded p-4 text-slate-300">
<span className="text-indigo-400">const</span> <span className="text-green-400">developer</span> <span className="text-white">=</span> <span className="text-orange-300">{'{'}</span>
  <span className="text-indigo-300">name</span><span className="text-white">:</span> <span className="text-green-300">'Frontend Developer'</span><span className="text-white">,</span>
  <span className="text-indigo-300">skills</span><span className="text-white">:</span> <span className="text-orange-300">[</span>
    <span className="text-green-300">'JavaScript'</span><span className="text-white">,</span> 
    <span className="text-green-300">'React'</span><span className="text-white">,</span> 
    <span className="text-green-300">'TypeScript'</span><span className="text-white">,</span>
    <span className="text-green-300">'HTML/CSS'</span>
  <span className="text-orange-300">]</span><span className="text-white">,</span>
  <span className="text-indigo-300">experience</span><span className="text-white">:</span> <span className="text-indigo-400">5</span><span className="text-white">,</span>
  <span className="text-indigo-300">seeking</span><span className="text-white">:</span> <span className="text-green-300">'1M ₽/sec'</span>
<span className="text-orange-300">{'}'}</span><span className="text-white">;</span>

<span className="text-indigo-400">function</span> <span className="text-blue-400">hire</span><span className="text-orange-300">(</span><span className="text-indigo-300">dev</span><span className="text-orange-300">)</span> <span className="text-orange-300">{'{'}</span>
  <span className="text-indigo-400">return</span> <span className="text-green-300">`Hired ${'{'}dev.name{'}'}`</span><span className="text-white">;</span>
<span className="text-orange-300">{'}'}</span>

<span className="text-indigo-300">hire</span><span className="text-orange-300">(</span><span className="text-indigo-300">developer</span><span className="text-orange-300">)</span><span className="text-white">;</span> <span className="text-slate-500">// Let's work together!</span>
</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-slate-50">
          <path d="M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,144C672,171,768,213,864,213.3C960,213,1056,171,1152,144C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}
