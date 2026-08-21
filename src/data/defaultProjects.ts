import { Project } from '../lib/types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    title: 'Character Animation Showcase',
    slug: 'character-animation-showcase',
    category: '2D Animation',
    description: 'Koleksi animasi karakter 2D dengan pergerakan yang halus dan ekspresif, dibuat untuk keperluan komersial dan hiburan.',
    content: `## Ringkasan Proyek
Menampilkan berbagai teknik animasi karakter, mulai dari pergerakan dasar hingga ekspresi emosional yang kompleks.`,
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['Toon Boom Harmony', 'Adobe After Effects', 'Photoshop'],
    featured: true,
    status: 'published',
    sort_order: 1,
    created_at: '2024-01-15T08:00:00.000Z'
  },
  {
    id: 'proj-002',
    title: 'Product Visualization 3D',
    slug: 'product-visualization-3d',
    category: '3D Animation',
    description: 'Visualisasi produk 3D realistis untuk iklan komersial dengan pencahayaan dan tekstur material yang detail.',
    content: `## Ringkasan Proyek
Pembuatan model 3D dan animasi untuk produk komersial, berfokus pada detail material dan pencahayaan studio.`,
    image_url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['Blender', 'Cinema 4D', 'Octane Render'],
    featured: true,
    status: 'published',
    sort_order: 2,
    created_at: '2024-02-10T14:30:00.000Z'
  },
  {
    id: 'proj-003',
    title: 'Cinematic Travel Vlog Editing',
    slug: 'cinematic-travel-vlog-editing',
    category: 'Video Editing',
    description: 'Pengeditan video travel cinematic dengan transisi dinamis, color grading, dan sound design yang mendalam.',
    content: `## Ringkasan Proyek
Editing video dokumenter perjalanan dengan teknik cut-to-the-beat, stabilisasi, dan perbaikan warna.`,
    image_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    featured: true,
    status: 'published',
    sort_order: 3,
    created_at: '2024-03-20T10:00:00.000Z'
  },
  {
    id: 'proj-004',
    title: 'AI Generated Concept Art',
    slug: 'ai-generated-concept-art',
    category: 'AI Generative',
    description: 'Eksplorasi konsep seni menggunakan teknologi AI generatif (Midjourney & Stable Diffusion) untuk inspirasi karakter dan environment.',
    content: `## Ringkasan Proyek
Penggunaan prompt engineering untuk menghasilkan iterasi desain karakter dan latar belakang dunia fantasi secara cepat.`,
    image_url: 'https://images.unsplash.com/photo-1678887856488-75c136f01df2?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['Midjourney', 'Stable Diffusion', 'Photoshop'],
    featured: true,
    status: 'published',
    sort_order: 4,
    created_at: '2024-04-05T09:15:00.000Z'
  }
];
