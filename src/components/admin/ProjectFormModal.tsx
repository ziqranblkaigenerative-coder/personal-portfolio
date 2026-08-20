import React, { useState, useEffect } from 'react';
import { Project, ProjectStatus, PROJECT_CATEGORIES } from '../../lib/types';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { generateSlug } from '../../lib/utils';
import { projectService } from '../../lib/supabase';
import {
  Upload,
  Image as ImageIcon,
  Plus,
  X,
  Sparkles,
  Github,
  Globe,
  Tag
} from 'lucide-react';
import { useToast } from '../ui/Toast';

interface ProjectFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectToEdit?: Project | null;
  onSave: (projectData: Omit<Project, 'id' | 'created_at'>, id?: string) => Promise<void>;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  open,
  onOpenChange,
  projectToEdit,
  onSave
}) => {
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Web App');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<ProjectStatus>('published');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setSlug(projectToEdit.slug);
      setCategory(projectToEdit.category);
      setDescription(projectToEdit.description);
      setContent(projectToEdit.content || '');
      setImageUrl(projectToEdit.image_url);
      setDemoUrl(projectToEdit.demo_url || '');
      setGithubUrl(projectToEdit.github_url || '');
      setTechStack(projectToEdit.tech_stack || []);
      setFeatured(projectToEdit.featured);
      setStatus(projectToEdit.status);
      setSortOrder(projectToEdit.sort_order || 1);
    } else {
      // Defaults for new project
      setTitle('');
      setSlug('');
      setCategory('Web App');
      setDescription('');
      setContent('');
      setImageUrl('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80');
      setDemoUrl('');
      setGithubUrl('');
      setTechStack(['React', 'TypeScript', 'Supabase', 'Tailwind CSS']);
      setFeatured(false);
      setStatus('published');
      setSortOrder(1);
    }
  }, [projectToEdit, open]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!projectToEdit) {
      setSlug(generateSlug(val));
    }
  };

  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tag: string) => {
    setTechStack(techStack.filter((t) => t !== tag));
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadedUrl = await projectService.uploadImage(file);
      setImageUrl(uploadedUrl);
      toast({
        title: 'Gambar Berhasil Diunggah',
        type: 'success'
      });
    } catch (err) {
      toast({
        title: 'Gagal mengunggah gambar',
        type: 'error'
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imageUrl) {
      toast({
        title: 'Data belum lengkap',
        description: 'Pastikan Judul, Deskripsi Singkat, dan URL Gambar telah diisi.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(
        {
          title,
          slug: slug || generateSlug(title),
          category,
          description,
          content,
          image_url: imageUrl,
          demo_url: demoUrl || undefined,
          github_url: githubUrl || undefined,
          tech_stack: techStack,
          featured,
          status,
          sort_order: Number(sortOrder)
        },
        projectToEdit?.id
      );

      toast({
        title: projectToEdit ? 'Proyek Berhasil Diperbarui!' : 'Proyek Berhasil Ditambahkan!',
        type: 'success'
      });
      onOpenChange(false);
    } catch (err) {
      toast({
        title: 'Terjadi kesalahan saat menyimpan',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = PROJECT_CATEGORIES.filter((c) => c !== 'Semua').map((c) => ({
    label: c,
    value: c
  }));

  const statusOptions = [
    { label: 'Published (Tampil di Publik)', value: 'published' },
    { label: 'Draft (Disembunyikan)', value: 'draft' },
    { label: 'Archived (Arsip)', value: 'archived' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange} maxWidth="2xl">
      <DialogHeader>
        <DialogTitle>
          {projectToEdit ? 'Edit Proyek' : 'Tambah Proyek Baru'}
        </DialogTitle>
        <DialogDescription>
          Kelola informasi detail proyek untuk ditampilkan di halaman portofolio publik.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Judul Proyek *</label>
            <Input
              required
              placeholder="Contoh: SaaS Analytics Dashboard"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">URL Slug *</label>
            <Input
              required
              placeholder="saas-analytics-dashboard"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Kategori Proyek</label>
            <Select
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Status Publikasi</label>
            <Select
              options={statusOptions}
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Deskripsi Singkat (Ringkasan di Kartu) *
          </label>
          <Textarea
            required
            rows={2}
            placeholder="Ringkasan singkat tentang tujuan dan fungsi utama proyek..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Image URL & File Upload */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Gambar Cover / Thumbnail *</label>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com/cover.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              icon={<ImageIcon className="w-4 h-4" />}
            />
            <label className="flex-shrink-0">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageFileUpload}
                disabled={uploadingImage}
              />
              <Button
                type="button"
                variant="outline"
                loading={uploadingImage}
                className="cursor-pointer gap-2"
                onClick={(e) => {
                  const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                  input?.click();
                }}
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </Button>
            </label>
          </div>

          {/* Preview Image Thumbnail */}
          {imageUrl && (
            <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mt-2">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Live Demo & GitHub Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Live Demo URL</label>
            <Input
              placeholder="https://app.example.com"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              icon={<Globe className="w-4 h-4" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">GitHub Repository URL</label>
            <Input
              placeholder="https://github.com/user/repo"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              icon={<Github className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Tech Stack Multi Tag Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">
            Tech Stack / Tags (Tekan Enter atau Tambah)
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Contoh: React, TypeScript, Supabase..."
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTech();
                }
              }}
              icon={<Tag className="w-4 h-4" />}
            />
            <Button type="button" variant="secondary" onClick={handleAddTech}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {techStack.map((tech) => (
              <Badge key={tech} variant="blue" className="gap-1.5 py-1">
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="hover:text-red-600 focus:outline-none"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Case Study Long Content */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Detail Studi Kasus / Dokumentasi (Markdown didukung)
          </label>
          <Textarea
            rows={5}
            placeholder="Jelaskan tantangan teknis, arsitektur, dan fitur-fitur penting..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Featured Switch */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <Switch
            checked={featured}
            onCheckedChange={setFeatured}
            label="Tandai sebagai Proyek Unggulan (Featured)"
            description="Proyek ini akan mendapatkan badge bintang khusus dan disorot di galeri."
          />
        </div>

        {/* Footer Actions */}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button type="submit" loading={isSubmitting} className="shadow-md shadow-blue-500/20">
            {projectToEdit ? 'Simpan Perubahan' : 'Terbitkan Proyek'}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
