import React, { useState } from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { useToast } from '../ui/Toast';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import {
  Mail,
  Send,
  MessageSquare,
  MapPin,
  Clock,
  Phone,
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile } = useProjects();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Formulir belum lengkap',
        description: 'Mohon isi nama, email, dan pesan Anda.',
        type: 'error'
      });
      return;
    }

    setLoading(true);
    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: 'Pesan Terkirim!',
        description: 'Terima kasih telah menghubungi saya. Saya akan segera membalas pesan Anda.',
        type: 'success'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Mail className="w-3.5 h-3.5" />
            <span>Mari Berkolaborasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hubungi Saya
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Punya ide proyek, tawaran pekerjaan, atau ingin berkonsultasi? Kirim pesan dan mari kita bicarakan solusinya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Direct Contact Info Cards (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-900 text-lg">Kontak Langsung</h3>

              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Email Pribadi</span>
                    <p className="text-slate-800 font-semibold group-hover:text-blue-600 transition-colors">
                      {profile.email}
                    </p>
                  </div>
                </a>

                {profile.phone && (
                  <a
                    href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-medium">WhatsApp / Telepon</span>
                      <p className="text-slate-800 font-semibold group-hover:text-emerald-600 transition-colors">
                        {profile.phone}
                      </p>
                    </div>
                  </a>
                )}

                <div className="flex items-start gap-3.5 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Lokasi</span>
                    <p className="text-slate-800 font-semibold">{profile.location || 'Jakarta, Indonesia'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Waktu Respon</span>
                    <p className="text-slate-800 font-semibold">Biasanya dalam 1x24 jam</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Banner */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-100">Status Saat Ini</span>
              </div>
              <h4 className="text-lg font-bold">Siap Menerima Proyek Baru</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Terbuka untuk posisi Full-time, Kontrak Remote, maupun Konsultasi Arsitektur Web.
              </p>
            </div>
          </div>

          {/* Interactive Form Card (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="font-bold text-slate-900 text-xl mb-1">Kirim Pesan</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Isi detail berikut dan pesan akan langsung diteruskan ke inbox saya.
              </p>

              {submitted ? (
                <div className="text-center py-12 px-4 space-y-4 bg-emerald-50/50 rounded-xl border border-emerald-200 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">Pesan Berhasil Terkirim!</h4>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      Terima kasih sudah menghubungi. Saya akan menanggapi email Anda sesegera mungkin.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="border-emerald-300 text-emerald-700"
                  >
                    Kirim Pesan Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Nama Lengkap *</label>
                      <Input
                        required
                        placeholder="Contoh: Budi Pratama"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Alamat Email *</label>
                      <Input
                        required
                        type="email"
                        placeholder="budi@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Subjek Proyek</label>
                    <Input
                      placeholder="Contoh: Pembuatan Web App SaaS Fintech"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Pesan / Brief Proyek *</label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Jelaskan kebutuhan proyek, jadwal, dan budget perkiraan..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full justify-center gap-2 shadow-md shadow-blue-500/20 py-2.5 text-base font-semibold"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Sekarang</span>
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
