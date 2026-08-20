import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Project, ProfileSettings } from './types';
import { INITIAL_PROJECTS } from '../data/defaultProjects';
import { INITIAL_PROFILE } from '../data/defaultProfile';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local Storage Fallback Keys
const STORAGE_PROJECTS_KEY = 'portfolio_projects_data';
const STORAGE_PROFILE_KEY = 'portfolio_profile_data';

// Helper for local mock storage
export const getLocalProjects = (): Project[] => {
  const data = localStorage.getItem(STORAGE_PROJECTS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_PROJECTS;
  }
};

export const saveLocalProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
};

export const getLocalProfile = (): ProfileSettings => {
  const data = localStorage.getItem(STORAGE_PROFILE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(INITIAL_PROFILE));
    return INITIAL_PROFILE;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_PROFILE;
  }
};

export const saveLocalProfile = (profile: ProfileSettings) => {
  localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
};

// =========================================================
// UNIFIED DATA SERVICE (Supabase with LocalStorage Fallback)
// =========================================================
export const projectService = {
  async getAllProjects(isAdmin = false): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('projects').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
        if (!isAdmin) {
          query = query.eq('status', 'published');
        }
        const { data, error } = await query;
        if (error) throw error;
        if (data && data.length > 0) return data as Project[];
      } catch (err) {
        console.warn('Supabase fetch failed or table empty, falling back to local data:', err);
      }
    }
    const local = getLocalProjects();
    return isAdmin ? local : local.filter(p => p.status === 'published');
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single();
        if (error) throw error;
        if (data) return data as Project;
      } catch (err) {
        console.warn('Supabase fetch by slug failed:', err);
      }
    }
    const local = getLocalProjects();
    return local.find(p => p.slug === slug) || null;
  },

  async createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: isSupabaseConfigured ? (crypto.randomUUID ? crypto.randomUUID() : `proj-${Date.now()}`) : `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .insert([newProject])
          .select()
          .single();
        if (error) throw error;
        if (data) return data as Project;
      } catch (err) {
        console.error('Failed to create in Supabase, saving to local state:', err);
      }
    }

    const current = getLocalProjects();
    const updated = [newProject, ...current];
    saveLocalProjects(updated);
    return newProject;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const updatedData = { ...updates, updated_at: new Date().toISOString() };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .update(updatedData)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        if (data) return data as Project;
      } catch (err) {
        console.error('Failed to update in Supabase, saving to local state:', err);
      }
    }

    const current = getLocalProjects();
    const index = current.findIndex(p => p.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...updatedData };
      saveLocalProjects(current);
      return current[index];
    }
    throw new Error('Project not found');
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Failed to delete in Supabase:', err);
      }
    }

    const current = getLocalProjects();
    const filtered = current.filter(p => p.id !== id);
    saveLocalProjects(filtered);
    return true;
  },

  async uploadImage(file: File): Promise<string> {
    if (isSupabaseConfigured && supabase) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('portfolio-assets')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('portfolio-assets')
          .getPublicUrl(filePath);

        return data.publicUrl;
      } catch (err) {
        console.error('Supabase storage upload failed, creating object URL:', err);
      }
    }

    // Local data URL fallback
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};

export const profileService = {
  async getProfile(): Promise<ProfileSettings> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('profile_settings')
          .select('*')
          .limit(1)
          .single();
        if (error && error.code !== 'PGRST116') throw error;
        if (data) return data as ProfileSettings;
      } catch (err) {
        console.warn('Supabase profile fetch failed, using local profile:', err);
      }
    }
    return getLocalProfile();
  },

  async updateProfile(profile: ProfileSettings): Promise<ProfileSettings> {
    const payload = { ...profile, updated_at: new Date().toISOString() };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data: existing } = await supabase.from('profile_settings').select('id').limit(1);
        
        let res;
        if (existing && existing.length > 0) {
          res = await supabase
            .from('profile_settings')
            .update(payload)
            .eq('id', existing[0].id)
            .select()
            .single();
        } else {
          res = await supabase
            .from('profile_settings')
            .insert([payload])
            .select()
            .single();
        }

        if (res.error) throw res.error;
        if (res.data) return res.data as ProfileSettings;
      } catch (err) {
        console.error('Supabase profile update failed, saving local profile:', err);
      }
    }

    saveLocalProfile(payload);
    return payload;
  }
};
