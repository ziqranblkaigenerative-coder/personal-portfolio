import { Project } from '../lib/types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    title: 'Fintech Dashboard & Analytics SaaS',
    slug: 'fintech-dashboard-analytics-saas',
    category: 'Web App',
    description: 'Platform manajemen keuangan modern dengan visualisasi data interaktif, multi-currency wallet, dan real-time transaction streaming.',
    content: `## Ringkasan Proyek
Aplikasi analitik keuangan enterprise yang dirancang untuk membantu startup dan UMKM memantau arus kas, performa penjualan, serta prediksi pendapatan bulanan secara otomatis.

### Fitur Utama:
- 📊 **Real-time Data Visualization**: Grafik interaktif performa pendapatan & pengeluaran berbasis Recharts.
- 💳 **Multi-Currency Management**: Dukungan konversi mata uang otomatis menggunakan API Bank Indonesia & Fixer.
- ⚡ **Automated Invoicing & Export**: Cetak dan ekspor invoice ke PDF dan Excel dalam hitungan detik.
- 🔒 **Role-Based Access Control**: Pengaturan izin akses multi-level untuk akuntan, manajer, dan eksekutif.

### Tantangan & Solusi:
Mengoptimalkan rendering dataset transaksi dengan 50.000+ data baris menggunakan virtualized list dan caching query berbasis React Query & Supabase indexes.`,
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    demo_url: 'https://demo-fintech.example.com',
    github_url: 'https://github.com/username/fintech-dashboard',
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Recharts', 'PostgreSQL'],
    featured: true,
    status: 'published',
    sort_order: 1,
    created_at: '2026-01-15T08:00:00.000Z',
    updated_at: '2026-02-10T14:30:00.000Z'
  },
  {
    id: 'proj-002',
    title: 'E-Commerce Marketplace dengan AI Recommendation',
    slug: 'ecommerce-marketplace-ai-recommendation',
    category: 'Fullstack',
    description: 'Toko online terintegrasi payment gateway Midtrans, sistem inventori real-time, dan rekomendasi produk cerdas berbasis AI.',
    content: `## Ringkasan Proyek
E-commerce modern dengan arsitektur headless, performa load time di bawah 1 detik, serta checkout teroptimasi untuk konversi tinggi.

### Fitur Utama:
- 🛍️ **Katalog Produk Dinamis**: Filter multi-atribut (ukuran, warna, kategori, rentang harga).
- 🤖 **AI Smart Recommendation**: Rekomendasi produk serupa berdasarkan riwayat penjelajahan pengguna.
- 💳 **Integrasi Payment Gateway**: QRIS, Virtual Account (BCA, Mandiri, BRI), dan e-Wallet (GoPay, OVO).
- 📦 **Manajemen Stok Real-Time**: Sinkronisasi stok otomatis menggunakan Supabase Realtime Channels.`,
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    demo_url: 'https://shop-marketplace.example.com',
    github_url: 'https://github.com/username/ecommerce-ai-platform',
    tech_stack: ['Next.js', 'React', 'Supabase Auth', 'PostgreSQL', 'Stripe/Midtrans', 'Tailwind CSS'],
    featured: true,
    status: 'published',
    sort_order: 2,
    created_at: '2025-11-20T10:00:00.000Z',
    updated_at: '2026-01-05T09:15:00.000Z'
  },
  {
    id: 'proj-003',
    title: 'HealthTrack: Mobile Health & Workout Companion',
    slug: 'healthtrack-mobile-health-workout',
    category: 'Mobile App',
    description: 'Aplikasi pelacak kebugaran mobile dengan penghitung kalori otomatis, jadwal latihan personal, dan sinkronisasi smartwatch.',
    content: `## Ringkasan Proyek
Aplikasi cross-platform untuk pelacakan gaya hidup sehat harian, integrasi metrik detak jantung, dan program latihan berbasis AI coaching.

### Fitur Utama:
- 🏃 **GPS Workout Tracker**: Pelacak rute lari dan bersepeda dengan integrasi Mapbox.
- 🥗 **AI Food Scanner**: Deteksi nilai kalori makanan hanya dengan memotret piring makanan.
- 🏆 **Community Challenges & Leaderboard**: Bertanding poin kebugaran dengan teman secara mingguan.`,
    image_url: 'https://images.unsplash.com/photo-1510519138195-068d828884bb?auto=format&fit=crop&w=1200&q=80',
    demo_url: 'https://healthtrack.example.com',
    github_url: 'https://github.com/username/healthtrack-mobile',
    tech_stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    featured: true,
    status: 'published',
    sort_order: 3,
    created_at: '2025-09-10T12:00:00.000Z',
    updated_at: '2025-12-18T16:45:00.000Z'
  },
  {
    id: 'proj-004',
    title: 'Design System & UI Component Library',
    slug: 'design-system-ui-component-library',
    category: 'UI/UX Design',
    description: 'Sistem desain modular komprehensif berisi 60+ komponen accessible, token warna otomatis, dan dokumentasi interaktif Storybook.',
    content: `## Ringkasan Proyek
Design system terstandarisasi yang dibangun untuk mempercepat siklus pembuatan produk digital tim engineer dan desainer grafis.

### Fitur Utama:
- 🎨 **Figma to Code Tokens**: Sinkronisasi variabel warna, tipografi, dan spasi secara otomatis.
- ♿ **100% WCAG 2.1 AA Compliant**: Navigasi keyboard penuh dan dukungan screen reader.
- 📦 **NPM Package Ready**: Distribusi package siap pakai dengan zero-config bundling.`,
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    demo_url: 'https://ui-system.example.com',
    github_url: 'https://github.com/username/shadcn-custom-design-system',
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Figma', 'Radix UI'],
    featured: false,
    status: 'published',
    sort_order: 4,
    created_at: '2025-08-01T07:30:00.000Z',
    updated_at: '2025-10-12T11:20:00.000Z'
  },
  {
    id: 'proj-005',
    title: 'DocuMind: AI Document Summarizer & QA API',
    slug: 'documind-ai-document-summarizer',
    category: 'AI / Machine Learning',
    description: 'API & Microservice untuk ekstraksi wawasan cerdas, tanya-jawab dokumen PDF panjang dengan RAG (Retrieval-Augmented Generation).',
    content: `## Ringkasan Proyek
Solusi enterprise untuk membaca ribuan halaman kontrak hukum, laporan keuangan, dan riset ilmiah dalam hitungan detik dengan akurasi kutipan referensi.

### Fitur Utama:
- 📄 **Vector Search Engine**: Indexing dokumen menggunakan pgvector di PostgreSQL Supabase.
- 💬 **Interactive Chat with PDF**: Tanya jawab kontekstual dengan kutipan nomor halaman presisi.
- ⚡ **High-Throughput REST API**: Dokumentasi OpenAPI / Swagger dengan rate limiting terintegrasi.`,
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    demo_url: 'https://documind.example.com',
    github_url: 'https://github.com/username/documind-rag-service',
    tech_stack: ['Python', 'FastAPI', 'Supabase pgvector', 'OpenAI API', 'React', 'Docker'],
    featured: true,
    status: 'published',
    sort_order: 5,
    created_at: '2026-02-01T09:00:00.000Z',
    updated_at: '2026-02-18T10:00:00.000Z'
  },
  {
    id: 'proj-006',
    title: 'CloudOps Infrastructure Monitoring Tool',
    slug: 'cloudops-infrastructure-monitoring-tool',
    category: 'Backend & API',
    description: 'Dashboard pemantauan server, cluster Kubernetes, dan latensi endpoint dengan alert notifikasi otomatis via Telegram & Discord.',
    content: `## Ringkasan Proyek
Platform monitoring uptime dan throughput mikroservis berlatensi rendah untuk tim DevOps.

### Fitur Utama:
- 📈 **Ping & Heartbeat Monitor**: Pengecekan status server global setiap 30 detik.
- 🔔 **Multi-Channel Alerting**: Notifikasi instan ke Discord, Telegram, dan Slack saat terjadi lonjakan CPU atau downtime.
- 📊 **Historical Uptime SLA Reports**: Laporan persentase SLA bulanan untuk klien.`,
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    demo_url: 'https://cloudops.example.com',
    github_url: 'https://github.com/username/cloudops-monitor',
    tech_stack: ['Go', 'React', 'Supabase', 'Docker', 'Prometheus', 'Tailwind CSS'],
    featured: false,
    status: 'published',
    sort_order: 6,
    created_at: '2025-06-14T15:00:00.000Z',
    updated_at: '2025-09-02T13:40:00.000Z'
  }
];
