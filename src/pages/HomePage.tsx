import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/portfolio/HeroSection';
import { StatsSection } from '../components/portfolio/StatsSection';
import { ProjectsGrid } from '../components/portfolio/ProjectsGrid';
import { SkillsSection } from '../components/portfolio/SkillsSection';
import { ExperienceSection } from '../components/portfolio/ExperienceSection';
import { ContactSection } from '../components/portfolio/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar currentPage="home" />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <ProjectsGrid />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
