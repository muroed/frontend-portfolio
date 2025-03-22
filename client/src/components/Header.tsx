import { useMobileMenu } from "@/hooks/useMobileMenu";

export default function Header() {
  const { isOpen, toggle } = useMobileMenu();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="font-mono font-semibold text-xl text-primary">
              <span className="text-indigo-600">&lt;</span>
              Dev<span className="text-emerald-500">Portfolio</span>
              <span className="text-indigo-600">/&gt;</span>
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-slate-600 hover:text-indigo-600 font-medium">About</a>
            <a href="#skills" className="text-slate-600 hover:text-indigo-600 font-medium">Skills</a>
            <a href="#projects" className="text-slate-600 hover:text-indigo-600 font-medium">Projects</a>
            <a href="#experience" className="text-slate-600 hover:text-indigo-600 font-medium">Experience</a>
            <a href="#contact" className="text-slate-600 hover:text-indigo-600 font-medium">Contact</a>
          </nav>
          <div className="md:hidden">
            <button 
              onClick={toggle}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-3">
            <a href="#about" className="text-slate-600 hover:text-indigo-600 font-medium">About</a>
            <a href="#skills" className="text-slate-600 hover:text-indigo-600 font-medium">Skills</a>
            <a href="#projects" className="text-slate-600 hover:text-indigo-600 font-medium">Projects</a>
            <a href="#experience" className="text-slate-600 hover:text-indigo-600 font-medium">Experience</a>
            <a href="#contact" className="text-slate-600 hover:text-indigo-600 font-medium">Contact</a>
          </div>
        </div>
      </div>
    </header>
  );
}
