import React from 'react';
import { Project } from '../../lib/types';
import { Dialog } from '../ui/Dialog';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  ExternalLink,
  Github,
  Calendar,
  Layers
} from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  if (!project) return null;

  return (
    <Dialog open={Boolean(project)} onOpenChange={(open) => !open && onClose()} maxWidth="4xl">
      <div className="space-y-6">
        {/* Modal Header */}
        <div className="space-y-3 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue">{project.category}</Badge>
            {project.featured && (
              <Badge variant="warning">⭐ Proyek Unggulan</Badge>
            )}
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(project.created_at)}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Project Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Links Buttons */}
        <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex"
            >
              <Button variant="default" className="gap-2 shadow-md shadow-blue-500/20">
                <ExternalLink className="w-4 h-4" />
                <span>Buka Live Demo Website</span>
              </Button>
            </a>
          )}

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex"
            >
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" />
                <span>Lihat Source Code di GitHub</span>
              </Button>
            </a>
          )}
        </div>

        {/* Tech Stack List */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            Teknologi & Tools yang Digunakan
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech, idx) => (
              <Badge key={idx} variant="secondary" className="px-3 py-1 text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Case Study Content / Markdown */}
        {project.content ? (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Tentang & Studi Kasus</h4>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3 whitespace-pre-line">
              {project.content}
            </div>
          </div>
        ) : null}

        {/* Close Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
