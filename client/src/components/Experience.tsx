import { useInView } from "@/hooks/useInView";
import { useState } from "react";

type JobExperience = {
  id: number;
  period: string;
  title: string;
  company: string;
  responsibilities: string[];
};

export default function Experience() {
  const [experiences] = useState<JobExperience[]>([
    {
      id: 1,
      period: "2021 - Present",
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      responsibilities: [
        "Lead frontend development for enterprise SaaS applications with React and TypeScript.",
        "Implemented performance optimizations resulting in 40% faster load times."
      ]
    },
    {
      id: 2,
      period: "2019 - 2021",
      title: "Frontend Developer",
      company: "InnovateSoft Inc.",
      responsibilities: [
        "Developed responsive web applications using React and Redux.",
        "Collaborated with UX/UI designers to implement pixel-perfect interfaces."
      ]
    },
    {
      id: 3,
      period: "2017 - 2019",
      title: "Junior Web Developer",
      company: "WebWorks Agency",
      responsibilities: [
        "Built client websites using JavaScript, HTML, and CSS.",
        "Maintained existing projects and implemented new features as required."
      ]
    }
  ]);

  return (
    <section id="experience" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">Work Experience</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => {
              const { ref, isVisible } = useInView();
              const isEven = index % 2 === 0;

              return (
                <div key={experience.id} className="flex flex-col md:flex-row md:justify-between items-center">
                  {isEven ? (
                    <>
                      <div 
                        ref={ref}
                        className={`md:w-5/12 mb-8 md:mb-0 md:text-right transition-all duration-1000 transform ${
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                      >
                        <span className="text-sm font-medium text-white bg-indigo-600 py-1 px-3 rounded-full">
                          {experience.period}
                        </span>
                        <h3 className="text-xl font-semibold text-primary mt-2">{experience.title}</h3>
                        <h4 className="text-emerald-500 font-medium">{experience.company}</h4>
                        <div className="mt-3 text-slate-600">
                          {experience.responsibilities.map((responsibility, i) => (
                            <p key={i} className={i > 0 ? 'mt-2' : ''}>
                              {responsibility}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="hidden md:block relative z-10">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <i className="fas fa-briefcase"></i>
                        </div>
                      </div>
                      <div className="md:w-5/12"></div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-5/12"></div>
                      <div className="hidden md:block relative z-10">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <i className="fas fa-briefcase"></i>
                        </div>
                      </div>
                      <div 
                        ref={ref}
                        className={`md:w-5/12 mb-8 md:mb-0 md:text-left transition-all duration-1000 transform ${
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                      >
                        <span className="text-sm font-medium text-white bg-indigo-600 py-1 px-3 rounded-full">
                          {experience.period}
                        </span>
                        <h3 className="text-xl font-semibold text-primary mt-2">{experience.title}</h3>
                        <h4 className="text-emerald-500 font-medium">{experience.company}</h4>
                        <div className="mt-3 text-slate-600">
                          {experience.responsibilities.map((responsibility, i) => (
                            <p key={i} className={i > 0 ? 'mt-2' : ''}>
                              {responsibility}
                            </p>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">Education</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <span className="font-medium text-white bg-indigo-600 py-1 px-3 rounded-full text-sm">2013 - 2017</span>
              </div>
              <div className="md:w-3/4">
                <h4 className="text-xl font-semibold text-primary">Bachelor of Science in Computer Science</h4>
                <h5 className="text-emerald-500 font-medium">University of Technology</h5>
                <p className="mt-3 text-slate-600">
                  Specialized in Web Development and Software Engineering. Graduated with honors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
