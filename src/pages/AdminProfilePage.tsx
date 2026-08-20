import React from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { ProfileSettingsForm } from '../components/admin/ProfileSettingsForm';
import { ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AdminProfilePage: React.FC = () => {
  return (
    <AdminLayout activeNav="profile">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Profil & Informasi Portofolio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sesuaikan identitas, bio singkat, tautan sosial media, dan informasi kontak publik Anda.
            </p>
          </div>

          <a href="/" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Tampilan Publik</span>
            </Button>
          </a>
        </div>

        {/* Profile Settings Form */}
        <ProfileSettingsForm />
      </div>
    </AdminLayout>
  );
};
