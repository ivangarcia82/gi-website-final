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
}

export const CATALOGS: Catalog[] = [
  { id: 'maxema', name: 'Maxema', tag: 'Premium', img: IMAGES.img0 },
  { id: 'collection', name: 'Collection Brands', tag: 'Colección 2026', img: IMAGES.img1 },
  { id: 'mundial', name: 'Mundial 2026', tag: 'Edición Especial', img: IMAGES.img2 },
  { id: 'nino', name: 'Día del Niño', tag: 'Estacional', img: IMAGES.img3 },
  { id: 'mama', name: 'Mamá', tag: 'Estacional', img: IMAGES.img4 },
  { id: 'gray', name: 'Gray', tag: 'Clásicos', img: IMAGES.img5 },
  { id: 'blue', name: 'Blue', tag: 'Clásicos', img: IMAGES.img6 },
  { id: 'green', name: 'Green', tag: 'Eco', img: IMAGES.img7 },
  { id: 'black', name: 'Black', tag: 'Ejecutivo', img: IMAGES.img8 },
  { id: 'agendas', name: 'Agendas', tag: 'Corporativo', img: IMAGES.img9 },
  { id: 'textiles', name: 'Textiles', tag: 'Uniformes', img: IMAGES.img10 },
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
  { id: 'promo', num: '01', title: 'Promocionales', desc: 'El core de nuestro negocio: miles de productos personalizables para amplificar tu marca — desde plumas y tazas hasta gadgets tech.', tone: 'hero' },
  { id: 'fulfillment', num: '02', title: 'Fulfillment', desc: 'Almacenamiento, empaque y envío a la medida. Tú enfócate en tu marca, nosotros en logística.', tone: 'a' },
  { id: 'proyectos', num: '03', title: 'Proyectos Especiales', desc: 'Desarrollos 100% a medida para campañas únicas. Si te lo imaginas, lo producimos.', tone: 'b' },
  { id: 'talleres', num: '04', title: 'Talleres de Personalizado', desc: 'Experiencias en vivo: eventos donde tus clientes personalizan su producto en el momento.', tone: 'c' },
  { id: 'textiles', num: '05', title: 'Textil y Talabartería', desc: 'Fabricación propia de uniformes, bolsos y accesorios en piel y tela, con control total de calidad.', tone: 'd' },
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
  { id: 'cdmx', name: 'CDMX', state: 'Ciudad de México', address: 'Av. Insurgentes Sur 1234, Col. Del Valle', phone: '(55) 7098 8100', mx: 470, my: 290 },
  { id: 'bcs', name: 'BCS', state: 'La Paz, Baja California Sur', address: 'Blvd. Forjadores 450', phone: '(612) 123 4500', mx: 150, my: 210 },
  { id: 'sonora', name: 'Sonora', state: 'Hermosillo, Sonora', address: 'Blvd. Navarrete 201, Col. Valle Verde', phone: '(662) 789 0012', mx: 255, my: 160 },
  { id: 'yucatan', name: 'Yucatán', state: 'Mérida, Yucatán', address: 'Calle 60 Norte 299-E, Col. Residencial', phone: '(999) 456 7890', mx: 680, my: 310 },
];

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
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  promo: {
    num: '01',
    title: 'Promocionales',
    tagline: 'Miles de productos, un solo aliado.',
    hero: IMAGES.img36,
    intro: 'El corazón de Generando Ideas. Desde artículos básicos hasta ediciones especiales, ofrecemos la curaduría más amplia de promocionales en México — todos personalizables, todos con control de calidad propio.',
    color: 'var(--orange-500)',
    features: [
      { t: 'Catálogo de +5,000 productos', d: 'Desde plumas hasta drones. Si existe, probablemente lo tenemos o lo producimos.' },
      { t: 'Pedidos desde 50 piezas', d: 'No te obligamos a órdenes gigantes. Empezamos donde empiezas tú.' },
      { t: 'Técnicas de decorado propias', d: 'Serigrafía, bordado, sublimación, láser, UV digital — todo bajo un solo techo.' },
      { t: 'Producción en México', d: 'Menor tiempo de entrega, menor huella de carbono, mayor control.' },
    ],
    examples: ['Plumas metálicas', 'Tazas cerámicas', 'Mochilas eco', 'Power banks', 'Agendas piel', 'Gorras bordadas'],
  },
  fulfillment: {
    num: '02',
    title: 'Fulfillment',
    tagline: 'Tú diseñas. Nosotros entregamos.',
    hero: IMAGES.img37,
    intro: 'Almacenamiento, empaque, pick & pack, y envío a escala nacional. Perfecto para programas de loyalty, onboardings masivos y kits corporativos recurrentes.',
    color: 'var(--blue-700)',
    features: [
      { t: 'Bodegas en 4 puntos de MX', d: 'CDMX, Sonora, Yucatán y BCS — reduce tiempos y costos de envío.' },
      { t: 'Integración con tus sistemas', d: 'APIs para que tu plataforma dispare órdenes automáticamente.' },
      { t: 'Dashboard en tiempo real', d: 'Inventario, envíos en tránsito y reportes, 24/7.' },
      { t: 'Kits personalizados', d: 'Onboarding kits, welcome packs, rewards — armados a tu especificación.' },
    ],
    examples: ['Kits onboarding', 'Programas loyalty', 'Welcome packs', 'Rewards fulfillment', 'Gifting B2B'],
  },
  proyectos: {
    num: '03',
    title: 'Proyectos Especiales',
    tagline: 'Si te lo imaginas, lo producimos.',
    hero: IMAGES.img38,
    intro: 'Para cuando el catálogo no basta. Desarrollamos productos 100% a medida: empaques, piezas únicas, ediciones limitadas, activaciones especiales.',
    color: 'var(--magenta)',
    features: [
      { t: 'Diseño industrial a medida', d: 'Co-creamos producto desde el sketch hasta la producción.' },
      { t: 'Prototipado rápido', d: 'Impresión 3D, CNC y muestras físicas en menos de 2 semanas.' },
      { t: 'Materiales exóticos', d: 'Maderas, metales, textiles técnicos, acabados únicos.' },
      { t: 'Producción boutique', d: 'Tiradas pequeñas con calidad de alta gama.' },
    ],
    examples: ['Empaques a medida', 'Ediciones limitadas', 'Activaciones BTL', 'Corporate gifting premium'],
  },
  talleres: {
    num: '04',
    title: 'Talleres de Personalizado',
    tagline: 'Experiencias en vivo, marca en acción.',
    hero: IMAGES.img39,
    intro: 'Eventos donde tus clientes, empleados o prospectos personalizan su producto en el momento. Serigrafía en vivo, bordado in-situ, grabado láser. Amplifica el engagement de tu activación.',
    color: 'var(--mint)',
    features: [
      { t: 'Equipo portátil profesional', d: 'Llevamos la producción completa a tu evento, trade show o pop-up.' },
      { t: 'Operadores capacitados', d: 'Nuestro equipo — no tú — opera todo el día.' },
      { t: 'Materiales incluidos', d: 'Productos, tintas, hilos, paneles. Tú solo pones el lugar.' },
      { t: 'Branding total', d: 'Diseñamos stand, señalética y brief del operador a tu marca.' },
    ],
    examples: ['Trade shows', 'Pop-up stores', 'Activaciones BTL', 'Team building', 'Eventos corporativos'],
  },
  textiles: {
    num: '05',
    title: 'Textil y Talabartería',
    tagline: 'Fabricación propia, calidad garantizada.',
    hero: IMAGES.img40,
    intro: 'Producimos uniformes, bolsos, mochilas y accesorios en piel y tela desde nuestro taller. Control total del proceso: patronaje, corte, costura, acabado y QC.',
    color: 'var(--blue-700)',
    features: [
      { t: 'Taller propio en MX', d: 'Patronistas, cortadores y costureras con 10+ años de experiencia.' },
      { t: 'Pedidos desde 100 piezas', d: 'Mínimos accesibles incluso para marcas pequeñas.' },
      { t: 'Piel auténtica y vegana', d: 'Trabajamos cuero, piel sintética, lona, nylon 1680D y más.' },
      { t: 'Tech packs a medida', d: 'Entregamos fichas técnicas completas para cada diseño.' },
    ],
    examples: ['Uniformes corporativos', 'Mochilas a medida', 'Portafolios en piel', 'Bolsos de mano', 'Accesorios de viaje'],
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
