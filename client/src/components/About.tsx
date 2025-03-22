import { useInView } from "@/hooks/useInView";

export default function About() {
  const { ref, isVisible } = useInView();
  
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">About Me</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Professional portrait of a developer" 
                  className="w-full h-auto" />
            </div>
          </div>
          <div 
            ref={ref}
            className={`md:w-2/3 transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Frontend Developer</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              I'm a passionate frontend developer with 5+ years of experience building modern, responsive web applications.
              Specializing in React, TypeScript, and modern JavaScript, I create clean, maintainable code with great user experiences.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              My approach combines technical expertise with an eye for design, ensuring that applications are not only functional
              but also visually appealing and intuitive to use. I stay current with the latest frontend technologies and best practices.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium text-sm">React</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium text-sm">HTML5</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium text-sm">CSS3/SASS</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium text-sm">Redux</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium text-sm">Tailwind CSS</span>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/" target="_blank" className="text-slate-700 hover:text-indigo-600 transition-colors" aria-label="GitHub profile">
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a href="https://linkedin.com/" target="_blank" className="text-slate-700 hover:text-indigo-600 transition-colors" aria-label="LinkedIn profile">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a href="https://twitter.com/" target="_blank" className="text-slate-700 hover:text-indigo-600 transition-colors" aria-label="Twitter profile">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                <span>Download Resume</span>
                <i className="fas fa-download ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
