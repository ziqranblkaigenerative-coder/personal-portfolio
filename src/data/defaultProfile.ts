import { ProfileSettings } from '../lib/types';

export const INITIAL_PROFILE: ProfileSettings = {
  full_name: 'Ziqran Elbeno',
  title: '2D Animator | 3D Animator | Video Editor | AI Generative',
  short_intro: 'Saya adalah kreator digital yang memiliki ketertarikan pada animasi 2D, animasi 3D, video editing, dan teknologi AI generatif. Saya senang mengembangkan ide kreatif menjadi karya visual yang menarik.',
  bio: 'Saya adalah kreator digital yang berlokasi di Banda Aceh, Indonesia. Saya memiliki ketertarikan pada animasi 2D, animasi 3D, video editing, dan teknologi AI generatif. Berbekal pendidikan di SMK Negeri 1 Banda Aceh jurusan Animasi dan pengalaman kerja di LPP TVRI Aceh, saya senang mengembangkan ide kreatif menjadi karya visual yang menarik dan profesional.',
  avatar_url: '/assets/profile.jpg',
  email: 'eziqran@gmail.com',
  phone: '+62 812-9753-0713',
  location: 'Banda Aceh, Indonesia',
  resume_url: '',
  social_links: {
    github: '',
    linkedin: '',
    twitter: '',
    telegram: '',
    whatsapp: 'https://wa.me/6281297530713',
    website: ''
  },
  stats: {
    years_experience: '3+',
    projects_completed: '10+',
    happy_clients: '5+',
    tech_masteries: '4+'
  },
  skills: [
    {
      category: 'Animation & Video',
      items: [
        { name: '2D Animation' },
        { name: '3D Animation' },
        { name: 'Video Editing' }
      ]
    },
    {
      category: 'AI & Content',
      items: [
        { name: 'AI Generative' },
        { name: 'Creative Content' }
      ]
    }
  ],
  experience: [
    {
      role: 'Video Editor & Animator',
      company: 'LPP TVRI Aceh',
      period: 'Pengalaman Kerja',
      description: 'Bertanggung jawab dalam proses produksi dan pasca-produksi konten media, termasuk pengeditan video dan pembuatan elemen animasi untuk program siaran televisi yang informatif dan menarik.',
      skills: ['Video Editing', '2D Animation', 'Motion Graphics', 'Media Production']
    }
  ],
  education: [
    {
      degree: 'Jurusan Animasi',
      institution: 'SMK Negeri 1 Banda Aceh',
      period: 'Pendidikan Terbaru',
      description: 'Mempelajari dasar-dasar dan teknik lanjutan pembuatan animasi 2D dan 3D, serta proses produksi media kreatif.'
    },
    {
      degree: 'Pendidikan Menengah Pertama',
      institution: 'SMP Negeri 1 Darul Imarah',
      period: '',
      description: ''
    },
    {
      degree: 'Pendidikan Dasar',
      institution: 'SD Negeri 50 Banda Aceh',
      period: '',
      description: ''
    }
  ],
  available_for_hire: true
};
