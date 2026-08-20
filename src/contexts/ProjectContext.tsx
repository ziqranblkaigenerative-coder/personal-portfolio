import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Project, ProfileSettings, ProjectStatus } from '../lib/types';
import { projectService, profileService } from '../lib/supabase';
import { INITIAL_PROFILE } from '../data/defaultProfile';
import { useAuth } from './AuthContext';

interface ProjectContextType {
  projects: Project[];
  publicProjects: Project[];
  featuredProjects: Project[];
  loading: boolean;
  profile: ProfileSettings;
  activeCategory: string;
  searchQuery: string;
  selectedTech: string | null;
  selectedProjectForModal: Project | null;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTech: (tech: string | null) => void;
  setSelectedProjectForModal: (project: Project | null) => void;
  addProject: (project: Omit<Project, 'id' | 'created_at'>) => Promise<Project>;
  editProject: (id: string, updates: Partial<Project>) => Promise<Project>;
  removeProject: (id: string) => Promise<boolean>;
  toggleFeatured: (id: string) => Promise<void>;
  toggleStatus: (id: string, newStatus: ProjectStatus) => Promise<void>;
  updateProfileSettings: (settings: ProfileSettings) => Promise<void>;
  refreshProjects: () => Promise<void>;
  allTechTags: string[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<ProfileSettings>(INITIAL_PROFILE);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [fetchedProjects, fetchedProfile] = await Promise.all([
        projectService.getAllProjects(Boolean(user)),
        profileService.getProfile()
      ]);
      setProjects(fetchedProjects);
      setProfile(fetchedProfile);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [user]);

  const publicProjects = useMemo(() => {
    let list = projects.filter(p => p.status === 'published');

    if (activeCategory !== 'Semua') {
      list = list.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tech_stack.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedTech) {
      list = list.filter(p =>
        p.tech_stack.some(t => t.toLowerCase() === selectedTech.toLowerCase())
      );
    }

    return list;
  }, [projects, activeCategory, searchQuery, selectedTech]);

  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.status === 'published' && p.featured);
  }, [projects]);

  const allTechTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => {
      p.tech_stack.forEach(t => set.add(t));
    });
    return Array.from(set).sort();
  }, [projects]);

  const addProject = async (projectData: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
    const created = await projectService.createProject(projectData);
    setProjects(prev => [created, ...prev]);
    return created;
  };

  const editProject = async (id: string, updates: Partial<Project>): Promise<Project> => {
    const updated = await projectService.updateProject(id, updates);
    setProjects(prev => prev.map(p => (p.id === id ? updated : p)));
    return updated;
  };

  const removeProject = async (id: string): Promise<boolean> => {
    const success = await projectService.deleteProject(id);
    if (success) {
      setProjects(prev => prev.filter(p => p.id !== id));
      if (selectedProjectForModal?.id === id) {
        setSelectedProjectForModal(null);
      }
    }
    return success;
  };

  const toggleFeatured = async (id: string) => {
    const target = projects.find(p => p.id === id);
    if (!target) return;
    await editProject(id, { featured: !target.featured });
  };

  const toggleStatus = async (id: string, newStatus: ProjectStatus) => {
    await editProject(id, { status: newStatus });
  };

  const updateProfileSettings = async (settings: ProfileSettings) => {
    const updated = await profileService.updateProfile(settings);
    setProfile(updated);
  };

  const refreshProjects = async () => {
    await fetchAllData();
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        publicProjects,
        featuredProjects,
        loading,
        profile,
        activeCategory,
        searchQuery,
        selectedTech,
        selectedProjectForModal,
        setActiveCategory,
        setSearchQuery,
        setSelectedTech,
        setSelectedProjectForModal,
        addProject,
        editProject,
        removeProject,
        toggleFeatured,
        toggleStatus,
        updateProfileSettings,
        refreshProjects,
        allTechTags
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
