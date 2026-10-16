// Configuração central do site. Alterar aqui quando existir domínio próprio.
export const SITE_URL = 'https://learncode.vercel.app';
export const SITE_NAME = 'Learn Code';

export const CONTACT = {
  email: 'learncode.mz@gmail.com',
  whatsappNumber: '+258828376317',
  whatsappFormatted: '+258 82 837 6317',
  address: 'Marracuene, Maputo, Moçambique',
  city: 'Maputo',
  country: 'Moçambique',
  socials: {
    instagram: 'https://www.instagram.com/learncode.mz',
    facebook: 'https://www.facebook.com/share/1DQcdQZ6FL/',
  },
};

const WHATSAPP_DIGITS = CONTACT.whatsappNumber.replace(/[^0-9]/g, '');

/** Liga à conversa de WhatsApp da Learn Code, opcionalmente com mensagem pré-preenchida. */
export const whatsappHref = (text?: string): string =>
  text ? `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(text)}` : `https://wa.me/${WHATSAPP_DIGITS}`;

/** Liga ao email da Learn Code com assunto e corpo pré-preenchidos. */
export const mailtoHref = (subject?: string, body?: string): string => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${CONTACT.email}${query ? `?${query}` : ''}`;
};

/** Rotas públicas e respectivos metadados (título, descrição). */
export const ROUTES: Record<string, { path: string; title: string; description: string }> = {
  '': {
    path: '/',
    title: 'Learn Code — Websites, Apps, Sistemas e IA em Moçambique',
    description:
      'A Learn Code desenvolve websites, aplicações móveis, sistemas, APIs e soluções com inteligência artificial para empresas e instituições em Moçambique, e forma programadores em Maputo.',
  },
  sobre: {
    path: '/sobre',
    title: 'Sobre a Learn Code · Startup tecnológica moçambicana',
    description:
      'Conheça a Learn Code: startup tecnológica nascida em Moçambique, dedicada ao desenvolvimento de software, inteligência artificial e formação em programação. Sediada em Marracuene, Maputo.',
  },
  servicos: {
    path: '/servicos',
    title: 'Serviços · Learn Code',
    description:
      'Desenvolvimento de websites, aplicações móveis, sistemas web e desktop, APIs, soluções com IA e design gráfico em Moçambique. Vamos falar do seu projecto.',
  },
  projectos: {
    path: '/projectos',
    title: 'Projectos · Learn Code',
    description:
      'Projectos e produtos da Learn Code: Road MZ e Quiz Code na Google Play, a plataforma SisPoupa e iniciativas em desenvolvimento, criados em Moçambique.',
  },
  cursos: {
    path: '/cursos',
    title: 'Cursos de Programação · Learn Code',
    description:
      'Cursos práticos de programação em Maputo: HTML5 e CSS3, JavaScript, MySQL, Python, Python Avançado e Java Básico. Preços e durações claros em cada curso.',
  },
  contacto: {
    path: '/contacto',
    title: 'Contacto · Learn Code',
    description:
      'Fale com a Learn Code pelo WhatsApp +258 82 837 6317 ou por email. Conte-nos o que pretende construir, inscreva-se num curso ou proponha uma parceria.',
  },
};
