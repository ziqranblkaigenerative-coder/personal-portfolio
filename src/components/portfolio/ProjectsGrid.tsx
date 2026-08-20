import React from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Tabs } from '../ui/Tabs';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PROJECT_CATEGORIES } from '../../lib/types';
import {
  Search,
  SlidersHorizontal,
  FolderX,
  X,
  Code2,
  Sparkles,
  Layers
} from 'lucide-react';

export const ProjectsGrid: React.FC = () => {
  const {
    publicProjects,
    projects,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedTech,
    setSelectedTech,
    allTechTags,
    selectedProjectForModal,
    setSelectedProjectForModal
  } = useProjects();

  const categoryTabs = PROJECT_CATEGORIES.map((cat) => {
    let count: number;
    if (cat === 'Semua') {
      count = projects.filter((p) => p.status === 'published').length;
    } else {
      count = projects.filter(
        (p) => p.status === 'published' && p.category.toLowerCase() === cat.toLowerCase()
      ).length;
    }
    return {
      id: cat,
      label: cat,
      count
    };
  });

  const clearAllFilters = () => {
    setActiveCategory('Semua');
    setSearchQuery('');
    setSelectedTech(null);
  };

  const hasActiveFilters = activeCategory !== 'Semua' || searchQuery.trim() !== '' || selectedTech !== null;

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Layers className="w-3.5 h-3.5" />
            <span>Showcase & Portofolio Karya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Proyek Pilihan & Studi Kasus
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Jelajahi berbagai aplikasi web, sistem enterprise, integrasi Supabase, dan desain antarmuka yang telah saya kembangkan.
          </p>
        </div>

        {/* Filter Bar: Category Tabs & Search */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="overflow-x-auto no-scrollbar py-1">
              <Tabs
                tabs={categoryTabs}
                activeTab={activeCategory}
                onChange={setActiveCategory}
                variant="pills"
              />
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-72">
              <Input
                placeholder="Cari nama proyek atau tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4 text-slate-400" />}
              />
            </div>
          </div>

          {/* Quick Tech Tag Filters */}
          {allTechTags.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
              <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                Filter Tech:
              </span>
              {allTechTags.slice(0, 8).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                  className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap font-medium ${
                    selectedTech === tech
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tech}
                </button>
              ))}

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-red-600 hover:bg-red-50 font-medium whitespace-nowrap"
                >
                  <X className="w-3 h-3" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Projects Cards Grid */}
        {publicProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {publicProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProjectForModal}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
              <FolderX className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">Tidak ada proyek yang cocok</h3>
              <p className="text-xs text-slate-500">
                Coba ubah kata kunci pencarian atau reset filter kategori.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Reset Semua Filter
            </Button>
          </div>
        )}

      </div>

      {/* Project Detail Modal Dialog */}
      <ProjectDetailModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
      />
    </section>
  );
};
