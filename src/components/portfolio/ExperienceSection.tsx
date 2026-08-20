import React from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { Briefcase, GraduationCap, Calendar, Building } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { profile } = useProjects();

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Riwayat Karir & Studi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pengalaman & Pendidikan
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Perjalanan profesional saya dalam mengembangkan perangkat lunak dan arsitektur web modern.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          
          {/* Work Experience Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Pengalaman Kerja</h3>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-100 space-y-8">
              {profile.experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-600 group-hover:scale-125 transition-transform" />

                  <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 hover:bg-white hover:shadow-md hover:border-blue-200 transition-all space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {exp.company}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white border border-slate-200 text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Achievements Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Pendidikan & Sertifikasi</h3>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-100 space-y-8">
              {profile.education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-600 group-hover:scale-125 transition-transform" />

                  <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 hover:bg-white hover:shadow-md hover:border-blue-200 transition-all space-y-2.5">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 flex items-center gap-1 w-fit">
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </span>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {edu.institution}
                      </p>
                    </div>

                    {edu.description && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
