import React from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile } = useProjects();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 text-slate-600 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Bio & Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 text-lg tracking-tight">
                {profile.full_name}
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              {profile.short_intro || 'Membangun aplikasi digital modern dengan arsitektur tangguh, performa tinggi, dan tampilan berkelas.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {profile.social_links.github && (
                <a
                  href={profile.social_links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.social_links.linkedin && (
                <a
                  href={profile.social_links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.social_links.twitter && (
                <a
                  href={profile.social_links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm transition-all"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm transition-all"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-3">Navigasi Cepat</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#projects" className="hover:text-blue-600 transition-colors">
                  Daftar Proyek
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-600 transition-colors">
                  Keahlian & Teknologi
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-blue-600 transition-colors">
                  Pengalaman Karir
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-600 transition-colors">
                  Tentang Saya
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600 transition-colors">
                  Hubungi Saya
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech Stack Info */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-3">Teknologi Web</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>React & TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Supabase PostgreSQL & Auth</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Tailwind CSS & Shadcn UI</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>High Performance Vite</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {profile.full_name}. Dibuat dengan React, Supabase & Shadcn UI Theme.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-white transition-all border border-transparent hover:border-slate-200"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
