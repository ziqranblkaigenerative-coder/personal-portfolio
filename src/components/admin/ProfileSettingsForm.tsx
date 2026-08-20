import React, { useState } from 'react';
import { ProfileSettings } from '../../lib/types';
import { useProjects } from '../../contexts/ProjectContext';
import { useToast } from '../ui/Toast';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Switch } from '../ui/Switch';
import { Button } from '../ui/Button';
import {
  User,
  Mail,
  MapPin,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Save,
  CheckCircle2,
  Phone
} from 'lucide-react';

export const ProfileSettingsForm: React.FC = () => {
  const { profile, updateProfileSettings } = useProjects();
  const { toast } = useToast();

  const [formData, setFormData] = useState<ProfileSettings>(profile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfileSettings(formData);
      toast({
        title: 'Profil Berhasil Disimpan',
        description: 'Informasi portofolio publik Anda telah diperbarui.',
        type: 'success'
      });
    } catch {
      toast({
        title: 'Gagal memperbarui profil',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Basic Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Informasi Utama Portofolio</h3>
          <p className="text-xs text-slate-500">
            Nama, headline profesional, dan bio yang tampil di hero section.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Nama Lengkap</label>
            <Input
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              icon={<User className="w-4 h-4" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Headline Profesi</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Ringkasan Hero (1 Kalimat)</label>
          <Input
            value={formData.short_intro}
            onChange={(e) => setFormData({ ...formData, short_intro: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Bio Lengkap</label>
          <Textarea
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">URL Avatar Foto</label>
            <Input
              value={formData.avatar_url}
              onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">URL File Resume / CV</label>
            <Input
              value={formData.resume_url || ''}
              placeholder="https://example.com/resume.pdf"
              onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
              icon={<FileText className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <Switch
            checked={formData.available_for_hire}
            onCheckedChange={(val) => setFormData({ ...formData, available_for_hire: val })}
            label="Status 'Available for Hire' Aktif"
            description="Menampilkan badge hijau bersinar 'Open to Work' di navbar dan hero section."
          />
        </div>
      </div>

      {/* Contact & Social Links */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Kontak & Tautan Sosial Media</h3>
          <p className="text-xs text-slate-500">
            Tautan akun publik untuk dihubungi oleh pengunjung atau recruiter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Email Utama</label>
            <Input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<Mail className="w-4 h-4" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Nomor WhatsApp / HP</label>
            <Input
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              icon={<Phone className="w-4 h-4" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Lokasi Domisili</label>
            <Input
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              icon={<MapPin className="w-4 h-4" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">GitHub Profile URL</label>
            <Input
              value={formData.social_links.github || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social_links: { ...formData.social_links, github: e.target.value }
                })
              }
              icon={<Github className="w-4 h-4" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">LinkedIn Profile URL</label>
            <Input
              value={formData.social_links.linkedin || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social_links: { ...formData.social_links, linkedin: e.target.value }
                })
              }
              icon={<Linkedin className="w-4 h-4" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Twitter / X URL</label>
            <Input
              value={formData.social_links.twitter || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social_links: { ...formData.social_links, twitter: e.target.value }
                })
              }
              icon={<Twitter className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          loading={isSaving}
          className="gap-2 shadow-md shadow-blue-500/20 px-8"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Pengaturan Profil</span>
        </Button>
      </div>
    </form>
  );
};
