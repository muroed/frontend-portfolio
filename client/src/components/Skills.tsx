import { useInView } from "@/hooks/useInView";
import { useEffect, useState } from "react";

type Skill = {
  name: string;
  percentage: number;
};

type ProfessionalSkill = {
  name: string;
  icon: string;
  description: string;
};

export default function Skills() {
  const { ref: technicalRef, isVisible: isTechnicalVisible } = useInView();
  const { ref: professionalRef, isVisible: isProfessionalVisible } = useInView();
  
  const [technicalSkills] = useState<Skill[]>([
    { name: "JavaScript/ES6+", percentage: 95 },
    { name: "React", percentage: 90 },
    { name: "TypeScript", percentage: 85 },
    { name: "HTML5/CSS3", percentage: 95 },
    { name: "Redux", percentage: 80 },
  ]);
  
  const [professionalSkills] = useState<ProfessionalSkill[]>([
    { 
      name: "Clean Code", 
      icon: "fas fa-code", 
      description: "Writing maintainable, well-structured code following best practices" 
    },
    { 
      name: "Responsive Design", 
      icon: "fas fa-mobile-alt", 
      description: "Creating interfaces that work beautifully across all device sizes" 
    },
    { 
      name: "Performance", 
      icon: "fas fa-tachometer-alt", 
      description: "Optimizing applications for speed and efficiency" 
    },
    { 
      name: "Accessibility", 
      icon: "fas fa-universal-access", 
      description: "Building inclusive interfaces for all users" 
    },
    { 
      name: "Team Collaboration", 
      icon: "fas fa-users", 
      description: "Working effectively with designers, backend devs, and stakeholders" 
    },
    { 
      name: "Testing", 
      icon: "fas fa-vial", 
      description: "Creating robust unit and integration tests" 
    },
  ]);
  
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: boolean }>({});
  
  useEffect(() => {
    if (isTechnicalVisible) {
      const newAnimatedSkills = { ...animatedSkills };
      
      technicalSkills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedSkills(prevState => ({
            ...prevState,
            [skill.name]: true
          }));
        }, index * 200);
      });
    }
  }, [isTechnicalVisible]);
  
  return (
    <section id="skills" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div 
            ref={technicalRef} 
            className={`transition-all duration-1000 transform ${
              isTechnicalVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold text-primary mb-6">Technical Skills</h3>

            {technicalSkills.map((skill) => (
              <div className="mb-6" key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-slate-700">{skill.name}</span>
                  <span className="text-indigo-600">{skill.percentage}%</span>
                </div>
                <div className="relative h-[6px] bg-slate-200 rounded-[3px]">
                  <div 
                    className="absolute h-[6px] bg-indigo-600 rounded-[3px] transition-all duration-1000 ease-in-out"
                    style={{ width: animatedSkills[skill.name] ? `${skill.percentage}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div 
            ref={professionalRef}
            className={`transition-all duration-1000 transform ${
              isProfessionalVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold text-primary mb-6">Professional Skills</h3>
            <div className="grid grid-cols-2 gap-6">
              {professionalSkills.map((skill) => (
                <div className="bg-white p-6 rounded-lg shadow-md text-center" key={skill.name}>
                  <div className="text-indigo-600 text-4xl mb-2">
                    <i className={skill.icon}></i>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">{skill.name}</h4>
                  <p className="text-sm text-slate-600">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
