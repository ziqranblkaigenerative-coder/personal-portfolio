import React, { useState } from 'react';
import { Project, ProjectStatus } from '../../lib/types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/Dialog';
import {
  Edit,
  Trash2,
  ExternalLink,
  Star,
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  Sparkles,
  Plus
} from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { useToast } from '../ui/Toast';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => Promise<boolean>;
  onToggleFeatured: (id: string) => Promise<void>;
  onToggleStatus: (id: string, status: ProjectStatus) => Promise<void>;
  onAddNew: () => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onEdit,
  onDelete,
  onToggleFeatured,
  onToggleStatus,
  onAddNew
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tech_stack.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      filterStatus === 'all' ? true : p.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      const success = await onDelete(projectToDelete.id);
      if (success) {
        toast({
          title: 'Proyek Dihapus',
          description: `Proyek "${projectToDelete.title}" telah dihapus.`,
          type: 'success'
        });
      }
    } catch {
      toast({
        title: 'Gagal menghapus proyek',
        type: 'error'
      });
    } finally {
      setIsDeleting(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Cari proyek berdasarkan judul, kategori, atau tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">Semua Status ({projects.length})</option>
            <option value="published">
              Published ({projects.filter((p) => p.status === 'published').length})
            </option>
            <option value="draft">
              Draft ({projects.filter((p) => p.status === 'draft').length})
            </option>
          </select>

          <Button onClick={onAddNew} className="gap-2 shadow-md shadow-blue-500/20 whitespace-nowrap">
            <Plus className="w-4 h-4" />
            <span>Tambah Proyek</span>
          </Button>
        </div>
      </div>

      {/* Projects Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-xs font-semibold uppercase text-slate-500 tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Proyek & Kategori</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Tech Stack</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Unggulan</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">Tanggal</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filtered.length > 0 ? (
                filtered.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-900 text-sm truncate max-w-[200px] sm:max-w-xs group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </span>
                          <span className="text-xs text-blue-600 font-medium mt-0.5">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Tech Stack */}
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.tech_stack.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech_stack.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-400">
                            +{project.tech_stack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() =>
                          onToggleStatus(
                            project.id,
                            project.status === 'published' ? 'draft' : 'published'
                          )
                        }
                        title="Klik untuk ubah status"
                        className="focus:outline-none"
                      >
                        {project.status === 'published' ? (
                          <Badge variant="success" className="cursor-pointer hover:opacity-80">
                            <Eye className="w-3 h-3 mr-1" />
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="cursor-pointer hover:opacity-80">
                            <EyeOff className="w-3 h-3 mr-1" />
                            Draft
                          </Badge>
                        )}
                      </button>
                    </td>

                    {/* Featured Star Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => onToggleFeatured(project.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          project.featured
                            ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                            : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                        }`}
                        title="Toggle status unggulan"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            project.featured ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-xs text-slate-400 hidden lg:table-cell">
                      {formatDate(project.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Buka Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        <button
                          onClick={() => onEdit(project)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Proyek"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setProjectToDelete(project)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Proyek"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Tidak ada proyek yang sesuai dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(projectToDelete)}
        onOpenChange={(open) => !open && setProjectToDelete(null)}
        maxWidth="sm"
      >
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <DialogTitle>Hapus Proyek Ini?</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus proyek "{projectToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setProjectToDelete(null)}
            disabled={isDeleting}
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            loading={isDeleting}
            onClick={handleDeleteConfirm}
          >
            Hapus Proyek
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
