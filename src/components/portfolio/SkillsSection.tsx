import React from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { Code, Server, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { profile } = useProjects();

  const categoryIcons: Record<string, React.ReactNode> = {
    'Frontend Development': <Code className="w-5 h-5 text-blue-600" />,
    'Backend & Database': <Server className="w-5 h-5 text-blue-600" />,
    'Tools & DevOps': <Wrench className="w-5 h-5 text-blue-600" />
  };

  return (
    <section id="skills" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Keahlian Teknis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tech Stack & Kemampuan
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Kombinasi perangkat lunak dan kemampuan yang saya gunakan dalam menciptakan karya visual dan animasi yang menarik.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {profile.skills.map((skillGroup, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all space-y-6"
            >
              {/* Group Title */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  {categoryIcons[skillGroup.category] || <Code className="w-5 h-5 text-blue-600" />}
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {skillGroup.category}
                </h3>
              </div>

              {/* Items List with Progress Bars */}
              <div className="space-y-4">
                {skillGroup.items.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                        {skill.name}
                      </span>
                      {skill.level && (
                        <span className="text-slate-400 font-mono">{skill.level}%</span>
                      )}
                    </div>

                    {skill.level && (
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
