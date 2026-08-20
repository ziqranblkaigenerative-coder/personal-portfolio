import React from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { Briefcase, CheckCircle2, Award, Cpu } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { profile, projects } = useProjects();

  const publishedCount = projects.filter(p => p.status === 'published').length;

  const statsData = [
    {
      label: 'Tahun Pengalaman',
      value: profile.stats?.years_experience || '4+',
      icon: Briefcase,
      description: 'Membangun aplikasi industri'
    },
    {
      label: 'Proyek Selesai',
      value: publishedCount ? `${publishedCount}+` : (profile.stats?.projects_completed || '25+'),
      icon: CheckCircle2,
      description: 'Web, mobile & SaaS'
    },
    {
      label: 'Klien & Partner Puas',
      value: profile.stats?.happy_clients || '15+',
      icon: Award,
      description: 'Startup & enterprise'
    },
    {
      label: 'Teknologi Dikuasai',
      value: profile.stats?.tech_masteries || '12+',
      icon: Cpu,
      description: 'Frontend & backend BaaS'
    }
  ];

  return (
    <section className="py-8 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {item.value}
                    </h3>
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-700">{item.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
