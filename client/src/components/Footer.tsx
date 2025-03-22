export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="font-mono font-semibold text-xl">
              <span className="text-indigo-500">&lt;</span>
              Dev<span className="text-emerald-500">Portfolio</span>
              <span className="text-indigo-500">/&gt;</span>
            </span>
            <p className="text-slate-400 mt-2">
              Frontend Developer • Building the web of tomorrow
            </p>
          </div>
          <div className="flex flex-col mb-6 md:mb-0 md:text-right">
            <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
            <div className="flex space-x-4">
              <a href="#about" className="text-slate-300 hover:text-indigo-500 transition-colors">About</a>
              <a href="#skills" className="text-slate-300 hover:text-indigo-500 transition-colors">Skills</a>
              <a href="#projects" className="text-slate-300 hover:text-indigo-500 transition-colors">Projects</a>
              <a href="#contact" className="text-slate-300 hover:text-indigo-500 transition-colors">Contact</a>
            </div>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-300 hover:text-indigo-500 transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="#" className="text-slate-300 hover:text-indigo-500 transition-colors">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" className="text-slate-300 hover:text-indigo-500 transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-slate-300 hover:text-indigo-500 transition-colors">
              <i className="fab fa-codepen text-xl"></i>
            </a>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Frontend Developer Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
