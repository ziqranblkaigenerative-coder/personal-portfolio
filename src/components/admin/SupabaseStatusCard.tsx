import React, { useState } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Code2,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../ui/Toast';

export const SupabaseStatusCard: React.FC = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const sqlSchemaSnippet = `-- Run this in your Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT 'Web App',
    description TEXT NOT NULL,
    content TEXT,
    image_url TEXT NOT NULL,
    demo_url TEXT,
    github_url TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON public.projects FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.projects FOR ALL USING (auth.role() = 'authenticated');`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSchemaSnippet);
    setCopied(true);
    toast({
      title: 'SQL Script Disalin!',
      description: 'Tempelkan di tab SQL Editor dashboard Supabase Anda.',
      type: 'success'
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Integrasi Backend Supabase</h3>
            <p className="text-xs text-slate-500">
              Koneksi database PostgreSQL, Auth, dan Storage cloud
            </p>
          </div>
        </div>

        <Badge
          variant={isSupabaseConfigured ? 'success' : 'warning'}
          className="text-xs px-3 py-1 self-start sm:self-auto"
        >
          {isSupabaseConfigured ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Supabase Terhubung (Live)
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              Mode Demo Local Storage
            </span>
          )}
        </Badge>
      </div>

      {/* Guide details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Step 1: Environment Variables */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Terminal className="w-4 h-4 text-blue-600" />
            <span>1. Konfigurasi File .env.local</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Buat file <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[11px]">.env.local</code> di folder root proyek:
          </p>
          <pre className="p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto">
{`VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...`}
          </pre>
        </div>

        {/* Step 2: Supabase Auth & RLS */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>2. Buat Akun Admin di Supabase Auth</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Buka menu <strong>Authentication -&gt; Users</strong> di dashboard Supabase, lalu klik <strong>Add User</strong> untuk membuat akun admin pertama Anda.
          </p>
          <div className="pt-1">
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <span>Buka Dashboard Supabase</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* SQL Script Box */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-blue-600" />
            Skrip SQL Skema Database (Tabel Projects & RLS)
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={copySql}
            className="gap-1.5 text-xs h-8"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Disalin!' : 'Salin SQL'}</span>
          </Button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto max-h-48">
          {sqlSchemaSnippet}
        </pre>
      </div>
    </div>
  );
};
