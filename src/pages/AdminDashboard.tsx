import React, { useState } from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { Project } from '../../lib/types';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { ProjectTable } from '../../components/admin/ProjectTable';
import { ProjectFormModal } from '../../components/admin/ProjectFormModal';
import { SupabaseStatusCard } from '../../components/admin/SupabaseStatusCard';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  FolderGit2,
  CheckCircle2,
  EyeOff,
  Star,
  Plus,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    projects,
    addProject,
    editProject,
    removeProject,
    toggleFeatured,
    toggleStatus
  } = useProjects();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectToEdit, setSelectedProjectToEdit] = useState<Project | null>(null);

  const handleAddNew = () => {
    setSelectedProjectToEdit(null);
    setModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProjectToEdit(project);
    setModalOpen(true);
  };

  const handleSaveProject = async (
    projectData: Omit<Project, 'id' | 'created_at'>,
    id?: string
  ) => {
    if (id) {
      await editProject(id, projectData);
    } else {
      await addProject(projectData);
    }
  };

  const totalCount = projects.length;
  const publishedCount = projects.filter((p) => p.status === 'published').length;
  const draftCount = projects.filter((p) => p.status === 'draft').length;
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <AdminLayout activeNav="projects" onNewProjectClick={handleAddNew}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Manajemen Proyek Portofolio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kelola, publikasikan, dan atur detail proyek yang tampil di website publik.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Lihat Live</span>
              </Button>
            </a>
            <Button onClick={handleAddNew} className="gap-2 shadow-md shadow-blue-500/20">
              <Plus className="w-4 h-4" />
              <span>Proyek Baru</span>
            </Button>
          </div>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:border-blue-200 transition-colors">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Proyek</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalCount}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FolderGit2 className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-emerald-200 transition-colors">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Published (Publik)</p>
                <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{publishedCount}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-slate-300 transition-colors">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Draft (Tersimpan)</p>
                <h3 className="text-2xl font-extrabold text-slate-600 mt-1">{draftCount}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <EyeOff className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-amber-200 transition-colors">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Proyek Unggulan</p>
                <h3 className="text-2xl font-extrabold text-amber-500 mt-1">{featuredCount}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Data Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Daftar Semua Proyek</span>
            </h2>
          </div>

          <ProjectTable
            projects={projects}
            onEdit={handleEdit}
            onDelete={removeProject}
            onToggleFeatured={toggleFeatured}
            onToggleStatus={toggleStatus}
            onAddNew={handleAddNew}
          />
        </div>

        {/* Supabase Status & SQL Card */}
        <SupabaseStatusCard />
      </div>

      {/* Create / Edit Project Modal */}
      <ProjectFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        projectToEdit={selectedProjectToEdit}
        onSave={handleSaveProject}
      />
    </AdminLayout>
  );
};
