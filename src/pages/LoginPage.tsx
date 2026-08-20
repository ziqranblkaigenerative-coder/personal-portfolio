import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import {
  Lock,
  Mail,
  KeyRound,
  Code2,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { signInWithPassword, signInWithDemo } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const { error } = await signInWithPassword(email, password);

    if (error) {
      setErrorMessage(error.message || 'Email atau password salah.');
      toast({
        title: 'Login Gagal',
        description: error.message,
        type: 'error'
      });
      setIsSubmitting(false);
    } else {
      toast({
        title: 'Login Berhasil!',
        description: 'Mengarahkan ke Dashboard Admin...',
        type: 'success'
      });
      window.location.href = '/admin';
    }
  };

  const handleDemoLogin = () => {
    signInWithDemo();
    toast({
      title: 'Login Mode Demo',
      description: 'Masuk sebagai Demo Administrator...',
      type: 'success'
    });
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 bg-grid-pattern relative selection:bg-blue-500 selection:text-white">
      {/* Back to Home Link */}
      <a
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors p-2 rounded-lg bg-white border border-slate-200 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Portofolio</span>
      </a>

      {/* Decorative Blur */}
      <div className="w-[400px] h-[400px] bg-blue-100/60 rounded-full blur-3xl absolute pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-6">
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Admin Portal Login
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Masuk untuk mengelola daftar proyek, status publikasi, dan profil portofolio Anda.
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-200/90 shadow-xl shadow-slate-200/50">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Autentikasi Supabase</CardTitle>
              <Badge variant={isSupabaseConfigured ? 'blue' : 'warning'} className="text-[11px]">
                {isSupabaseConfigured ? 'Supabase Auth' : 'Demo Local Mode'}
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Gunakan email & password admin yang telah terdaftar di Supabase.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email Admin</label>
                <Input
                  required
                  type="email"
                  placeholder="admin@portfolio.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Kata Sandi</label>
                <Input
                  required
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<KeyRound className="w-4 h-4" />}
                />
              </div>

              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full justify-center gap-2 shadow-md shadow-blue-500/20 py-2.5 font-semibold"
              >
                <Lock className="w-4 h-4" />
                <span>Masuk ke Dashboard</span>
              </Button>
            </form>

            {/* Quick Demo Login Option */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium">Atau Coba Cepat</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleDemoLogin}
              className="w-full justify-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Login Instan (Demo Mode)</span>
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-center text-xs text-slate-400 border-t border-slate-100 pt-4">
            <span className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Dilindungi oleh Supabase Row Level Security (RLS)
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
