import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProjects } from '../../contexts/ProjectContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Code2,
  LayoutDashboard,
  Menu,
  X,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  currentPage?: 'home' | 'login' | 'admin';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage = 'home' }) => {
  const { user } = useAuth();
  const { profile } = useProjects();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Proyek', id: 'projects' },
    { label: 'Keahlian', id: 'skills' },
    { label: 'Pengalaman', id: 'experience' },
    { label: 'Tentang', id: 'about' },
    { label: 'Kontak', id: 'contact' },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      window.location.href = `/#${id}`;
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigate) onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm shadow-slate-100'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-blue-600 transition-colors">
              {profile.full_name || 'Portofolio'}
            </span>
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {profile.available_for_hire ? 'Open to Work' : 'Software Engineer'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/70 shadow-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-white rounded-full transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA / Admin Access */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <a href="/admin">
              <Button size="sm" variant="outline" className="gap-2 border-blue-200 bg-blue-50/50 text-blue-700 hover:bg-blue-100">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Admin</span>
              </Button>
            </a>
          ) : (
            <a href="/login">
              <Button size="sm" variant="outline" className="gap-2 text-slate-700 hover:text-blue-600">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>Login Admin</span>
              </Button>
            </a>
          )}

          <button
            onClick={() => handleScrollTo('contact')}
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
          >
            <span>Hubungi Saya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <a href="/admin" className="w-full">
                <Button className="w-full justify-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard Admin
                </Button>
              </a>
            ) : (
              <a href="/login" className="w-full">
                <Button variant="outline" className="w-full justify-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Login Admin
                </Button>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
