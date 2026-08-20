# Portofolio Pribadi & Project Management System

Aplikasi web portofolio pribadi modern dan showcase proyek berbasis **React (Vite + TypeScript)** dengan backend **Supabase (PostgreSQL, Auth & Storage)** dan desain tema **Shadcn UI (Biru & Putih, dominan putih)**.

---

## ✨ Fitur Utama

### 1. Halaman Publik (`/`)
- **Hero Section**: Foto avatar dengan ring aksen biru bersinar, badge ketersediaan (*Open to Work*), bio singkat, dan tombol CTA.
- **Statistik Interaktif**: Metrik pengalaman kerja, jumlah proyek selesai, klien, dan teknologi yang dikuasai.
- **Showcase Proyek Dinamis**:
  - Filter kategori (*Web App, Fullstack, Mobile App, UI/UX, Backend & API, AI/ML*).
  - Kolom pencarian real-time & filter tag *tech stack*.
  - Kartu proyek dengan thumbnail, badge kategori, bintang unggulan (*Featured*), link Live Demo, dan link GitHub.
  - **Modal Detail Proyek (Case Study)**: Pratinjau gambar resolusi tinggi, ringkasan tantangan & solusi, daftar fitur, dan tag teknologi.
- **Keahlian & Kemampuan (Tech Stack)**: Dikelompokkan ke Frontend, Backend, dan DevOps dengan bilah persentase kemahiran.
- **Timeline Pengalaman & Pendidikan**: Riwayat karir dan latar belakang akademis yang interaktif.
- **Formulir Kontak**: Kirim pesan langsung serta tautan WhatsApp, Email, dan LinkedIn.

### 2. Autentikasi Supabase (`/login`)
- Login aman menggunakan **Supabase Auth** (Email + Kata Sandi).
- Dilengkapi **Mode Demo Instan** untuk pengujian langsung tanpa perlu menunggu setup backend.
- Proteksi route (`<ProtectedRoute>`) memastikan hanya admin terautentikasi yang dapat mengakses halaman manajemen.

### 3. Dashboard Admin (`/admin`)
- **Ringkasan Metrik**: Total proyek, Proyek terbit (*Published*), Draf (*Draft*), dan Proyek Unggulan (*Featured*).
- **CRUD Manajemen Proyek**:
  - Tambah proyek baru (Judul, auto-generate Slug, Kategori, Tech Stack multi-tags, Upload gambar cover / URL, Link Demo, Link GitHub, Konten Markdown studi kasus).
  - Edit dan update data proyek.
  - Hapus proyek dengan dialog konfirmasi aman.
  - *Toggle* status instan (Published/Draft & Featured) langsung dari tabel.
- **Pengaturan Profil (`/admin/profile`)**: Ubah nama, headline profesi, bio, tautan sosial media, dan CV resume.
- **Panduan Backend & SQL Helper**: Indikator status Supabase live dan skrip SQL migrasi siap salin 1-klik.

---

## 🚀 Cara Menjalankan Proyek

### 1. Instalasi Dependensi
Buka terminal pada direktori proyek:
```bash
cd "C:\Users\admin\.gemini\antigravity-ide\scratch\personal-portfolio"
npm install
```

### 2. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser di `http://localhost:5173`.

---

## 🗄️ Menghubungkan ke Supabase (Opsional / Siap Pakai)

Aplikasi sudah memiliki *fallback* lokal cerdas, sehingga dapat langsung dijalankan tanpa Supabase. Untuk menghubungkannya ke database cloud Supabase:

1. Buat proyek baru di [Supabase Dashboard](https://supabase.com/dashboard).
2. Buka menu **SQL Editor** di Supabase, lalu jalankan file SQL yang tersedia di `supabase/schema.sql` (atau salin langsung dari kartu Supabase di dashboard admin).
3. Buat file `.env.local` di root proyek:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```
4. Buka menu **Authentication -> Users** di Supabase dan buat akun admin pertama Anda.
5. Jalankan ulang server `npm run dev`.

---

## 📂 Struktur Direktori

```
personal-portfolio/
├── supabase/
│   └── schema.sql              # Skrip skema database, RLS, dan storage
├── src/
│   ├── components/
│   │   ├── admin/              # Komponen tabel, form modal, dan profil admin
│   │   ├── layout/             # Navbar, Footer, AdminLayout
│   │   ├── portfolio/          # Hero, Projects, Skills, Timeline, Contact
│   │   └── ui/                 # Shadcn UI primitives (Button, Card, Dialog, Badge, Tabs, dll)
│   ├── contexts/
│   │   ├── AuthContext.tsx     # Supabase Auth Provider & Demo Session
│   │   └── ProjectContext.tsx  # Project CRUD state provider & filter
│   ├── data/
│   │   ├── defaultProjects.ts  # Data proyek bawaan
│   │   └── defaultProfile.ts   # Data profil bawaan
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client & fallback CRUD service
│   │   ├── types.ts            # TypeScript interfaces
│   │   └── utils.ts            # Class merging utility (cn)
│   ├── pages/
│   │   ├── HomePage.tsx        # Halaman publik portofolio
│   │   ├── LoginPage.tsx       # Halaman login admin
│   │   ├── AdminDashboard.tsx  # Halaman dashboard manajemen proyek
│   │   └── AdminProfilePage.tsx# Halaman editor profil
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tailwind.config.js
├── vite.config.ts
└── package.json
```
