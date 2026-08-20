import React from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { Button } from '../ui/Button';
import {
  Sparkles,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  CheckCircle2,
  Send
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { profile } = useProjects();

  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white bg-grid-pattern">
      {/* Decorative Gradient Glows (Blue/White theme) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-blue-600 -ml-4"></span>
              <span>Tersedia untuk Pekerjaan Full-time & Proyek Freelance</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Membangun Aplikasi Web{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                Modern, Cepat,
              </span>{' '}
              & Berskala Besar.
            </h1>

            {/* Sub-headline / Intro */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {profile.short_intro ||
                'Fullstack Developer yang berfokus merancang pengalaman pengguna mulus dengan React, arsitektur data Supabase, dan desain UI yang elegan.'}
            </p>

            {/* Location & Key Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{profile.location || 'Indonesia (Remote / Hybrid)'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>React & Supabase Specialist</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              <Button
                size="lg"
                variant="blue-glow"
                onClick={() => handleScrollTo('projects')}
                className="gap-2 text-base px-6 shadow-md shadow-blue-500/25"
              >
                <span>Lihat Proyek Saya</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => handleScrollTo('contact')}
                className="gap-2 text-base px-6 border-slate-300 hover:border-blue-400"
              >
                <Send className="w-4 h-4 text-blue-600" />
                <span>Hubungi Saya</span>
              </Button>

              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex"
                >
                  <Button size="lg" variant="secondary" className="gap-2 text-base">
                    <Download className="w-4 h-4 text-slate-600" />
                    <span>Download CV</span>
                  </Button>
                </a>
              )}
            </div>

            {/* Social Media Link Icons */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-4 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-400">Temukan saya di:</span>
              {profile.social_links.github && (
                <a
                  href={profile.social_links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
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
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
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
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Visual / Avatar Card */}
          <div className="relative flex-shrink-0">
            {/* Outer Blue Ring & Decorative Blobs */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-400 to-sky-300 rotate-6 opacity-20 filter blur-xl animate-pulse-subtle"></div>
              
              {/* Card Container */}
              <div className="relative w-full h-full rounded-3xl bg-white p-3 shadow-2xl border border-slate-200/80 overflow-hidden group">
                <img
                  src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                  alt={profile.full_name}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Glass Badges */}
                <div className="absolute bottom-4 left-4 right-4 glass p-3 rounded-xl border border-white/80 shadow-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">{profile.full_name}</span>
                    <span className="text-[11px] text-blue-600 font-medium">{profile.title}</span>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
