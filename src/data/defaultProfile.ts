import { ProfileSettings } from '../lib/types';

export const INITIAL_PROFILE: ProfileSettings = {
  full_name: 'Alex Pratama',
  title: 'Fullstack Developer & UI Engineer',
  short_intro: 'Membangun aplikasi web performa tinggi, berskala besar, dengan desain yang elegan dan pengalaman pengguna terbaik.',
  bio: 'Halo! Saya adalah seorang Fullstack Developer dengan pengalaman lebih dari 4 tahun dalam merancang dan mengembangkan aplikasi modern menggunakan ekosistem React, TypeScript, Node.js, dan Supabase. Saya berfokus pada arsitektur kode yang bersih, kecepatan render maksimal, dan antarmuka berstandar industri kelas dunia.',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  email: 'alex.pratama.dev@gmail.com',
  phone: '+62 812-3456-7890',
  location: 'Jakarta, Indonesia',
  resume_url: 'https://example.com/resume.pdf',
  social_links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    telegram: 'https://t.me',
    whatsapp: 'https://wa.me/6281234567890',
    website: 'https://alexpratama.dev'
  },
  stats: {
    years_experience: '4+',
    projects_completed: '28+',
    happy_clients: '15+',
    tech_masteries: '12+'
  },
  skills: [
    {
      category: 'Frontend Development',
      items: [
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS / Shadcn', level: 95 },
        { name: 'Vue.js / Nuxt', level: 80 },
        { name: 'Redux / Zustand', level: 88 },
        { name: 'HTML5 & Modern CSS3', level: 98 }
      ]
    },
    {
      category: 'Backend & Database',
      items: [
        { name: 'Supabase (BaaS & Auth)', level: 92 },
        { name: 'PostgreSQL / SQL', level: 88 },
        { name: 'Node.js / Express', level: 85 },
        { name: 'REST & GraphQL APIs', level: 90 },
        { name: 'Prisma ORM', level: 84 },
        { name: 'Redis Caching', level: 75 }
      ]
    },
    {
      category: 'Tools & DevOps',
      items: [
        { name: 'Git & GitHub Workflows', level: 92 },
        { name: 'Docker & Containers', level: 78 },
        { name: 'Vercel / Cloudflare', level: 90 },
        { name: 'Figma UI/UX Prototyping', level: 85 },
        { name: 'Vite & Webpack', level: 88 },
        { name: 'Vitest / Jest Testing', level: 80 }
      ]
    }
  ],
  experience: [
    {
      role: 'Senior Frontend Engineer',
      company: 'Tech Innovate Studio',
      period: '2023 - Sekarang',
      description: 'Memimpin tim pengembang dalam membangun arsitektur aplikasi SaaS fintech berbasis React, TypeScript, dan Supabase dengan 100k+ pengguna aktif bulanan.',
      skills: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Performance Tuning']
    },
    {
      role: 'Fullstack Web Developer',
      company: 'Digital Karya Nusantara',
      period: '2021 - 2023',
      description: 'Mengembangkan sistem e-commerce multi-vendor, integrasi payment gateway Midtrans, dan optimasi SEO serta load-time sebesar 40%.',
      skills: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Redis']
    },
    {
      role: 'Junior Web Developer',
      company: 'Creative Media Solusindo',
      period: '2020 - 2021',
      description: 'Membuat landing page interaktif, sistem dashboard admin internal, dan integrasi API pihak ketiga.',
      skills: ['React', 'JavaScript', 'CSS3', 'REST API']
    }
  ],
  education: [
    {
      degree: 'Sarjana Komputer (S.Kom) - Teknik Informatika',
      institution: 'Universitas Indonesia',
      period: '2016 - 2020',
      description: 'Fokus pada Rekayasa Perangkat Lunak, Basis Data Terdistribusi, dan Interaksi Manusia dan Komputer (HCI). Lulus dengan predikat Cum Laude.'
    }
  ],
  available_for_hire: true
};
