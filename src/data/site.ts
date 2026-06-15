/**
 * Generando Ideas — site data.
 *
 * Ported verbatim from the Claude Design prototype's JSX sources
 * (shared.jsx, extras.jsx). Image URLs come from project/__metas.txt,
 * where the prototype mapped resource ids (img0…img41) to Unsplash URLs.
 */

// ---------------------------------------------------------------------------
// Image resource map (img0 … img41) — exact URLs from the design bundle.
// ---------------------------------------------------------------------------
export const IMAGES: Record<string, string> = {
  img0: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80',
  img1: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  img2: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600&q=80',
  img3: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80',
  img4: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  img5: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  img6: 'https://images.unsplash.com/photo-1608228088998-57828365d486?w=600&q=80',
  img7: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
  img8: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
  img9: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80',
  img10: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
  img11: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?w=500&q=80',
  img12: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=500&q=80',
  img13: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
  img14: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&q=80',
  img15: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
  img16: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
  img17: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&q=80',
  img18: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80',
  img19: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  img20: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80',
  img21: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  img22: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&q=80',
  img23: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  img24: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?w=600&q=80',
  img25: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?w=800&q=80',
  img26: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
  img27: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
  img28: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80',
  img29: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
  img30: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
  img31: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
  img32: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
  img33: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=80',
  img34: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
  img35: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  img36: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1400&q=80',
  img37: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1400&q=80',
  img38: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1400&q=80',
  img39: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1400&q=80',
  img40: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80',
  img41: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80',
};

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export const BRAND = {
  name: 'Generando Ideas',
  phone: '(55) 7098 8100',
  email: 'marketing@generandoideas.com',
};

// ---------------------------------------------------------------------------
// Navigation (canonical routes for the Astro multi-page build)
// ---------------------------------------------------------------------------
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Inicio', href: '/' },
  { id: 'about', label: 'Conócenos', href: '/conocenos' },
  { id: 'services', label: 'Servicios', href: '/servicios' },
  { id: 'catalog', label: 'Catálogo', href: '/catalogo' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contacto', href: '/contacto' },
];

export const ROUTES = {
  home: '/',
  about: '/conocenos',
  services: '/servicios',
  catalog: '/catalogo',
  blog: '/blog',
  contact: '/contacto',
  careers: '/bolsa-de-trabajo',
  privacy: '/legal/aviso-de-privacidad-esi-2026.pdf',
  service: (id: string) => `/servicios/${id}`,
};

// ---------------------------------------------------------------------------
// Catalogs
// ---------------------------------------------------------------------------
export interface Catalog {
  id: string;
  name: string;
  tag: string;
  img: string;
  flipbook: string;
}

export const CATALOGS: Catalog[] = [
  { id: 'maxema', name: 'Maxema', tag: 'Premium', img: '/catalogos/37_maxema.jpg', flipbook: 'https://online.flippingbook.com/view/30788643/' },
  { id: 'collection', name: 'Collection Brands', tag: 'Premium', img: '/catalogos/22_brands.jpg', flipbook: 'https://online.flippingbook.com/view/729100962/' },
  { id: 'pride', name: 'Pride', tag: 'Temporalidad', img: '/catalogos/41_pride.jpg', flipbook: 'https://online.flippingbook.com/view/378868073/' },
  { id: 'verano', name: 'Verano', tag: 'Temporalidad', img: '/catalogos/42_verano.jpg', flipbook: 'https://online.flippingbook.com/view/685265373/' },
  { id: 'padre', name: 'Día del Padre', tag: 'Temporalidad', img: '/catalogos/40_papa.jpg', flipbook: 'https://online.flippingbook.com/view/1013412702/' },
  { id: 'mundial', name: 'Mundial 2026', tag: 'Temporalidad', img: '/catalogos/34_mundial.jpg', flipbook: 'https://online.flippingbook.com/view/50161211/' },
  { id: 'gray', name: 'Gray', tag: 'De línea', img: '/catalogos/26_gray.jpg', flipbook: 'https://online.flippingbook.com/view/853887/' },
  { id: 'blue', name: 'Blue', tag: 'De línea', img: '/catalogos/19_blue.jpg', flipbook: 'https://online.flippingbook.com/view/218226174/' },
  { id: 'green', name: 'Green', tag: 'De línea', img: '/catalogos/01_green.jpg', flipbook: 'https://online.flippingbook.com/view/531357/' },
  { id: 'black', name: 'Black', tag: 'De línea', img: '/catalogos/18_black.jpg', flipbook: 'https://online.flippingbook.com/view/858261604/' },
  { id: 'agendas', name: 'Agendas', tag: 'De línea', img: '/catalogos/13_agendas.jpg', flipbook: 'https://online.flippingbook.com/view/128628634/' },
  { id: 'textiles', name: 'Textiles', tag: 'De línea', img: '/catalogos/07_textiles.png', flipbook: 'https://online.flippingbook.com/view/373069594/' },
];

// ---------------------------------------------------------------------------
// Services (summary cards)
// ---------------------------------------------------------------------------
export interface Service {
  id: string;
  num: string;
  title: string;
  desc: string;
  tone: string;
}

export const SERVICES: Service[] = [
  { id: 'promo', num: '01', title: 'Promocionales', desc: 'Amplio portafolio de productos promocionales diseñados para incrementar la visibilidad de tu marca.', tone: 'hero' },
  { id: 'print-shop', num: '02', title: 'Print Shop', desc: 'Soluciones de decorado de alta calidad para materiales promocionales y corporativos.', tone: 'a' },
  { id: 'promotional-workshop', num: '03', title: 'Promotional Workshop', desc: 'Showrooms interactivos y demostraciones en vivo para vivir la experiencia de tu marca.', tone: 'b' },
  { id: 'digital-evolution', num: '04', title: 'Digital Evolution', desc: 'Desarrollo e integración de APIs para conectar sistemas y optimizar procesos.', tone: 'c' },
  { id: 'importaciones', num: '05', title: 'Importaciones', desc: 'Gestión integral de importaciones para proyectos personalizados y a gran escala.', tone: 'd' },
];

// ---------------------------------------------------------------------------
// Products (catalog filter grid)
// ---------------------------------------------------------------------------
export interface Product {
  id: number;
  name: string;
  cat: string;
  img: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Pluma Metálica', cat: 'Oficina', img: IMAGES.img11 },
  { id: 2, name: 'Taza Cerámica', cat: 'Drinkware', img: IMAGES.img12 },
  { id: 3, name: 'Mochila Eco', cat: 'Bolsos', img: IMAGES.img13 },
  { id: 4, name: 'Cuaderno Kraft', cat: 'Oficina', img: IMAGES.img14 },
  { id: 5, name: 'Botella Térmica', cat: 'Drinkware', img: IMAGES.img15 },
  { id: 6, name: 'Playera', cat: 'Textiles', img: IMAGES.img16 },
  { id: 7, name: 'Power Bank', cat: 'Tech', img: IMAGES.img17 },
  { id: 8, name: 'Gorra', cat: 'Textiles', img: IMAGES.img18 },
  { id: 9, name: 'Audífonos', cat: 'Tech', img: IMAGES.img19 },
  { id: 10, name: 'Tote Bag', cat: 'Bolsos', img: IMAGES.img20 },
  { id: 11, name: 'Libreta Piel', cat: 'Oficina', img: IMAGES.img20 },
  { id: 12, name: 'Termo Acero', cat: 'Drinkware', img: IMAGES.img21 },
];

export const PRODUCT_CATEGORIES = ['Todos', 'Oficina', 'Drinkware', 'Textiles', 'Tech', 'Bolsos'];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { quote: 'Llevan 5 años siendo nuestros aliados en promocionales. Cada entrega impecable, siempre dentro de tiempo.', name: 'María López', role: 'Marketing Director, Grupo Alea' },
  { quote: 'El nivel de propuesta creativa es otro nivel. No venden productos, venden ideas que amplifican marcas.', name: 'Carlos Vera', role: 'CMO, Vivero Digital' },
  { quote: 'Producimos 15,000 kits corporativos con ellos en 3 semanas. Logística perfecta, calidad consistente.', name: 'Andrea Ruiz', role: 'HR Lead, Tech Nova' },
  { quote: 'Su fulfillment nos permitió escalar a 4 ciudades sin contratar un solo operador extra.', name: 'Jorge Mendoza', role: 'COO, Retail México' },
];

// ---------------------------------------------------------------------------
// Offices (map + contact)
// ---------------------------------------------------------------------------
export interface Office {
  id: string;
  name: string;
  state: string;
  address: string;
  phone: string;
  mx: number;
  my: number;
}

export const OFFICES: Office[] = [
  { id: 'cdmx', name: 'CDMX', state: 'Ciudad de México', address: 'Cda. Antonio Maceo 67, Col. Escandón I Secc, Alc. Miguel Hidalgo, CP 11800', phone: '(55) 7098 8100', mx: 605, my: 672 },
  { id: 'morelos', name: 'Morelos', state: 'Cuernavaca, Morelos', address: 'Morelos', phone: '(55) 7098 8100', mx: 590, my: 712 },
  { id: 'sonora', name: 'Sonora', state: 'Hermosillo, Sonora', address: 'Blvd. Navarrete 201, Col. Valle Verde', phone: '(662) 789 0012', mx: 210, my: 300 },
  { id: 'yucatan', name: 'Yucatán', state: 'Mérida, Yucatán', address: 'Calle 60 Norte 299-E, Col. Residencial', phone: '(999) 456 7890', mx: 920, my: 612 },
];

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/generandoideasgi/',
  facebook: 'https://www.facebook.com/generandoideasesi/',
  linkedin: 'https://www.linkedin.com/company/generandoideasesi/',
  whatsapp: 'https://wa.me/message/EJKZVVRVSYWLD1',
};

export const BUSINESS_HOURS = 'Lunes a viernes · 8:30 a 18:00 h';

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------
export interface BlogPost {
  id: string;
  cat: string;
  title: string;
  excerpt: string;
  img: string;
  date: string;
  iso: string;
  read: string;
}

export const BLOG_POSTS: BlogPost[] = [
  { id: 'tendencias-2026', cat: 'Tendencias', title: '10 artículos promocionales que dominarán 2026', excerpt: 'De los wearables sustentables a los gadgets IoT personalizados. Esto es lo que veremos en el próximo año.', img: IMAGES.img30, date: 'Ene 15, 2026', iso: '2026-01-15', read: '6 min' },
  { id: 'fulfillment-escala', cat: 'Operaciones', title: 'Cómo escalamos fulfillment para 4 ciudades sin contratar un operador más', excerpt: 'Un caso real: operamos 15,000 kits corporativos mensuales con el mismo equipo de 2023.', img: IMAGES.img31, date: 'Ene 8, 2026', iso: '2026-01-08', read: '8 min' },
  { id: 'textiles-sustentables', cat: 'Sustentabilidad', title: 'Textiles sustentables: más allá del algodón orgánico', excerpt: 'rPET, tencel, cáñamo y bambú. Guía práctica para elegir el material correcto según tu marca.', img: IMAGES.img32, date: 'Dic 20, 2025', iso: '2025-12-20', read: '5 min' },
  { id: 'mundial-2026', cat: 'Casos de estudio', title: 'Kits promocionales para el Mundial 2026: qué funciona y qué no', excerpt: 'Colaboramos con marcas locales en activaciones durante el Mundial. Lo que aprendimos.', img: IMAGES.img33, date: 'Dic 10, 2025', iso: '2025-12-10', read: '7 min' },
  { id: 'impresion-tecnicas', cat: 'Técnicas', title: 'Serigrafía vs sublimación vs DTF: cuándo usar cada una', excerpt: 'Las tres técnicas más comunes en textil promocional, comparadas por costo, durabilidad y volumen.', img: IMAGES.img34, date: 'Nov 28, 2025', iso: '2025-11-28', read: '9 min' },
  { id: 'roi-promocionales', cat: 'Estrategia', title: 'El ROI real de los artículos promocionales (con datos)', excerpt: '¿Cuánto retorno genera cada peso invertido en promocionales? Lo medimos con 8 clientes.', img: IMAGES.img35, date: 'Nov 15, 2025', iso: '2025-11-15', read: '6 min' },
];

export const BLOG_CATEGORIES = ['Todos', 'Tendencias', 'Operaciones', 'Sustentabilidad', 'Casos de estudio', 'Técnicas', 'Estrategia'];

// ---------------------------------------------------------------------------
// Service detail content
// ---------------------------------------------------------------------------
export interface ServiceFeature {
  t: string;
  d: string;
}

export interface ServiceDetail {
  num: string;
  title: string;
  tagline: string;
  hero: string;
  intro: string;
  color: string;
  features: ServiceFeature[];
  examples: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  promo: {
    num: '01',
    title: 'Promocionales',
    tagline: 'Productos que convierten marcas en experiencias.',
    hero: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1400&q=80',
    intro: 'Ofrecemos un amplio portafolio de artículos promocionales para fortalecer la conexión entre tu marca y tu audiencia. Seleccionamos soluciones innovadoras, funcionales y alineadas con los objetivos de cada campaña.',
    color: 'var(--orange-500)',
    features: [
      { t: 'Amplio catálogo', d: 'Miles de opciones para diferentes industrias y objetivos.' },
      { t: 'Personalización', d: 'Técnicas de decorado adaptadas a cada producto.' },
      { t: 'Asesoría especializada', d: 'Recomendaciones basadas en tu estrategia de marca.' },
      { t: 'Soluciones integrales', d: 'Desde la selección hasta la entrega de los productos.' },
    ],
    examples: ['Tecnología', 'Oficina', 'Bebidas', 'Bolsas y textiles', 'Regalos corporativos'],
    seoTitle: 'Productos Promocionales para Empresas | Generando Ideas',
    seoDescription: 'Artículos promocionales personalizados para campañas, eventos y estrategias de branding que generan impacto.',
  },
  'print-shop': {
    num: '02',
    title: 'Print Shop',
    tagline: 'Decorados que dan vida a tus ideas.',
    hero: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1400&q=80',
    intro: 'Convertimos conceptos en materiales impresos de alta calidad. Desde piezas promocionales hasta comunicación corporativa, ofrecemos soluciones de impresión que reflejan la identidad de tu marca con acabados profesionales y atención al detalle.',
    color: 'var(--orange-500)',
    features: [
      { t: 'Decorado comercial', d: 'Producción de materiales para campañas y comunicación corporativa.' },
      { t: 'Acabados especiales', d: 'Opciones que agregan valor y diferenciación a cada proyecto.' },
      { t: 'Personalización', d: 'Adaptamos cada pieza a las necesidades de tu marca.' },
      { t: 'Producción integral', d: 'Acompañamiento desde la preparación hasta la entrega final.' },
    ],
    examples: ['Folletos', 'Packaging', 'Material POP', 'Material corporativo'],
    seoTitle: 'Soluciones de Impresión para Empresas | Generando Ideas',
    seoDescription: 'Impresión comercial, materiales promocionales y acabados especiales para fortalecer la imagen de tu marca.',
  },
  'promotional-workshop': {
    num: '03',
    title: 'Promotional Workshop',
    tagline: 'Experiencias que conectan marcas y personas.',
    hero: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80',
    intro: 'Transformamos la presentación de productos promocionales en una experiencia interactiva. A través de showrooms, demostraciones en vivo y recorridos especializados, acercamos a tus colaboradores y clientes al universo de posibilidades que tu marca puede crear.',
    color: 'var(--orange-500)',
    features: [
      { t: 'Showrooms personalizados', d: 'Experiencias diseñadas según las necesidades y objetivos de cada cliente.' },
      { t: 'Activaciones en sitio', d: 'Llevamos la experiencia directamente a tus oficinas o eventos corporativos.' },
      { t: 'Personalización en vivo', d: 'Demostraciones con maquinaria de decorado para conocer el proceso en tiempo real.' },
      { t: 'Recorridos especializados', d: 'Visitas guiadas por nuestros talleres para conocer materiales y técnicas.' },
    ],
    examples: ['Showroom corporativo', 'Activaciones internas', 'Eventos para colaboradores', 'Demostraciones de personalización'],
    seoTitle: 'Showrooms y Experiencias de Marca | Generando Ideas',
    seoDescription: 'Creamos showrooms interactivos, activaciones y demostraciones en vivo para acercar tus productos promocionales a clientes y colaboradores.',
  },
  'digital-evolution': {
    num: '04',
    title: 'Digital Evolution',
    tagline: 'Conectamos sistemas, impulsamos resultados.',
    hero: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80',
    intro: 'Desarrollamos soluciones tecnológicas mediante API e integraciones que optimizan procesos, automatizan flujos de trabajo y mejoran la comunicación entre plataformas para impulsar la transformación digital de las empresas.',
    color: 'var(--orange-500)',
    features: [
      { t: 'Desarrollo de API', d: 'Soluciones personalizadas para conectar aplicaciones y plataformas.' },
      { t: 'Integraciones', d: 'Unificamos sistemas para optimizar el flujo de información.' },
      { t: 'Automatización', d: 'Reducimos tareas manuales y mejoramos la eficiencia operativa.' },
      { t: 'Escalabilidad', d: 'Soluciones preparadas para crecer junto con tu negocio.' },
    ],
    examples: ['Tiendas personalizadas', 'Consulta de catálogo', 'E-commerce B2B'],
    seoTitle: 'Desarrollo de API e Integraciones | Generando Ideas',
    seoDescription: 'Desarrollamos API e integraciones para automatizar procesos, conectar sistemas y acelerar la transformación digital de tu empresa.',
  },
  importaciones: {
    num: '05',
    title: 'Importaciones',
    tagline: 'Soluciones globales para proyectos únicos.',
    hero: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1400&q=80',
    intro: 'Gestionamos importaciones de productos personalizados y desarrollos especiales para satisfacer necesidades específicas. Supervisamos cada etapa del proceso para garantizar calidad, cumplimiento y entregas oportunas.',
    color: 'var(--orange-500)',
    features: [
      { t: 'Búsqueda internacional', d: 'Localizamos productos de acuerdo con tus requerimientos.' },
      { t: 'Desarrollo a medida', d: 'Creamos productos exclusivos para tu marca.' },
      { t: 'Gestión logística', d: 'Coordinamos el proceso de importación de principio a fin.' },
      { t: 'Control de calidad', d: 'Verificamos cada detalle antes de la entrega.' },
    ],
    examples: ['Productos exclusivos', 'Kits corporativos', 'Merchandising personalizado', 'Desarrollos especiales', 'Producción internacional'],
    seoTitle: 'Importación de Productos Promocionales | Generando Ideas',
    seoDescription: 'Gestionamos importaciones y desarrollos especiales para ofrecer productos personalizados con alcance global.',
  },
};

export const SERVICE_DETAIL_IDS = Object.keys(SERVICE_DETAILS);

// ---------------------------------------------------------------------------
// Job postings (careers)
// ---------------------------------------------------------------------------
export interface Job {
  id: number;
  title: string;
  dept: string;
  location: string;
  type: string;
}

export const JOBS: Job[] = [
  { id: 1, title: 'Ejecutivo(a) Comercial', dept: 'Ventas', location: 'CDMX · Presencial', type: 'Tiempo completo' },
  { id: 2, title: 'Diseñador(a) Gráfico Senior', dept: 'Diseño', location: 'Híbrido', type: 'Tiempo completo' },
  { id: 3, title: 'Operador(a) de Bordadora', dept: 'Producción', location: 'Sonora · Presencial', type: 'Tiempo completo' },
  { id: 4, title: 'Especialista Fulfillment', dept: 'Operaciones', location: 'Yucatán · Presencial', type: 'Tiempo completo' },
  { id: 5, title: 'Project Manager Proyectos Especiales', dept: 'PM', location: 'CDMX · Híbrido', type: 'Tiempo completo' },
  { id: 6, title: 'Becario(a) de Marketing', dept: 'Marketing', location: 'CDMX · Híbrido', type: 'Medio tiempo' },
];

// Ticker words (home)
export const TICKER_WORDS = ['Promotional Workshop', 'Print Shop', 'Digital Evolution', 'Promocionales', 'Importaciones'];
