import React from 'react';
import { Project } from '../../lib/types';
import { Badge } from '../ui/Badge';
import { ExternalLink, Github, ArrowUpRight, Star } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 cursor-pointer"
    >
      {/* Image Thumbnail Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={project.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-semibold flex items-center gap-1.5 bg-blue-600/90 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-md">
            <span>Buka Detail Studi Kasus</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Category & Featured Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge variant="blue" className="bg-white/95 backdrop-blur-md shadow-sm border-blue-200/80 text-blue-700">
            {project.category}
          </Badge>
          {project.featured && (
            <Badge variant="warning" className="bg-amber-500 text-white border-none shadow-sm gap-1">
              <Star className="w-3 h-3 fill-current" />
              <span>Unggulan</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
          {project.tech_stack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-600">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        {/* Action Links Bar */}
        <div className="mt-4 pt-3 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-3">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
          </div>

          <span className="text-slate-400 group-hover:text-blue-600 transition-colors flex items-center gap-0.5">
            <span>Detail</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};
