import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProjects } from '../../contexts/ProjectContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  FolderPlus,
  Database,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Code2,
  FolderGit2,
  Sliders,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeNav: 'projects' | 'profile' | 'supabase';
  onNewProjectClick?: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeNav,
  onNewProjectClick
}) => {
  const { user, signOut } = useAuth();
  const { profile } = useProjects();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-sm">Dashboard Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5">
          {/* Logo & Portfolio Title */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-slate-900 text-sm truncate">Admin Portal</span>
              <span className="text-xs text-slate-500 truncate">{profile.full_name}</span>
            </div>
          </div>

          {/* Quick Action: New Project Button */}
          {onNewProjectClick && (
            <div className="mt-5">
              <Button
                onClick={() => {
                  setSidebarOpen(false);
                  onNewProjectClick();
                }}
                className="w-full justify-center gap-2 shadow-md shadow-blue-500/20"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Tambah Proyek</span>
              </Button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            <a
              href="/admin"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === 'projects'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Kelola Proyek</span>
            </a>

            <a
              href="/admin/profile"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === 'profile'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Profil & Info Publik</span>
            </a>
          </nav>

          {/* Backend Status Indicator */}
          <div className="mt-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                Backend Status
              </span>
              <Badge variant={isSupabaseConfigured ? 'success' : 'warning'} className="text-[10px] px-2 py-0">
                {isSupabaseConfigured ? 'Supabase Live' : 'Demo Local'}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              {isSupabaseConfigured
                ? 'Terhubung ke database PostgreSQL Supabase Anda.'
                : 'Berjalan di mode local preview. Hubungkan .env untuk sinkronisasi cloud.'}
            </p>
          </div>
        </div>

        {/* User Session & Logout Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-white hover:text-blue-600 transition-colors border border-transparent hover:border-slate-200"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Lihat Web Publik
            </span>
          </a>

          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
            <div className="flex flex-col truncate pr-2">
              <span className="text-xs font-medium text-slate-900 truncate">
                {user?.email || 'admin@portfolio.dev'}
              </span>
              <span className="text-[10px] text-slate-400">Admin Authenticated</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};
