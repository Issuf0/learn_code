import { ServiceItem, ProjectItem, CourseItem, PartnerItem } from '../types';
import { CONTACT } from '../config/site';

export const COMPANY_INFO = {
  name: 'Learn Code',
  tagline: 'Transformamos ideias em soluções digitais.',
  subheadline:
    'A Learn Code desenvolve websites, aplicações, sistemas, APIs e soluções com inteligência artificial para empresas, instituições e pessoas em Moçambique.',
  ...CONTACT,
  slogan: 'Dignidade, compromisso e humildade em cada linha.',
  aboutBrief:
    'A Learn Code é uma startup tecnológica moçambicana dedicada ao desenvolvimento de software, à inteligência artificial e à formação em programação, com a ambição de crescer de Moçambique para o mundo.',
  mission: 'Criar soluções digitais que resolvem problemas reais.',
  vision: 'Tornar-se uma das startups de tecnologia de referência em Moçambique e em África.',
  values: [
    { title: 'Dignidade', description: 'Trabalhar com integridade, ética e respeito em cada projecto e relação profissional.' },
    { title: 'Compromisso', description: 'Honrar prazos e expectativas e entregar soluções eficientes e duradouras.' },
    { title: 'Dedicação', description: 'Empenho contínuo na procura da excelência técnica e na superação dos desafios.' },
    { title: 'Responsabilidade', description: 'Assumir com seriedade o impacto das nossas soluções na sociedade e nos negócios.' },
    { title: 'Humildade', description: 'Aprender continuamente, escutar o cliente e evoluir com a comunidade.' },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Desenvolvimento de Websites',
    shortDesc: 'Sites modernos, responsivos e optimizados para fortalecer a presença digital.',
    fullDesc:
      'Criamos plataformas web à medida, desde páginas institucionais a portais com área reservada, com foco em velocidade, segurança, SEO e boa experiência de utilização.',
    iconName: 'Globe',
    benefits: ['Design responsivo e mobile-first', 'Optimização para motores de busca', 'Painel de gestão de conteúdos', 'Integração com redes sociais e WhatsApp'],
    category: 'dev',
  },
  {
    id: 'mobile-apps',
    title: 'Aplicações Móveis',
    shortDesc: 'Apps Android e iOS com boa experiência de utilização.',
    fullDesc:
      'Desenvolvemos aplicações nativas e híbridas, preparadas para funcionamento offline e para integração com serviços de pagamento usados em Moçambique.',
    iconName: 'Smartphone',
    benefits: ['Compatibilidade Android e iOS', 'Interface fluida e moderna', 'Funcionamento offline', 'Notificações push'],
    category: 'mobile',
  },
  {
    id: 'systems',
    title: 'Sistemas Web e Desktop',
    shortDesc: 'Soluções para automatizar processos e melhorar a gestão.',
    fullDesc:
      'Software de gestão empresarial, facturação, controlo de stock, recursos humanos e processos operacionais, adaptado às necessidades de cada organização.',
    iconName: 'Monitor',
    benefits: ['Automação de processos internos', 'Relatórios e estatísticas', 'Permissões de acesso por perfil', 'Versão desktop sem dependência contínua de internet'],
    category: 'dev',
  },
  {
    id: 'api-dev',
    title: 'Desenvolvimento de APIs',
    shortDesc: 'Serviços e integrações que ligam os seus sistemas entre si.',
    fullDesc:
      'Desenhamos e implementamos APIs REST seguras e documentadas, para ligar aplicações móveis, websites, sistemas internos e serviços de terceiros.',
    iconName: 'Plug',
    benefits: ['APIs REST documentadas', 'Autenticação e controlo de acesso', 'Integração com serviços externos', 'Preparadas para crescer com o negócio'],
    category: 'api',
  },
  {
    id: 'ai-solutions',
    title: 'Soluções com Inteligência Artificial',
    shortDesc: 'Assistentes inteligentes, automação e análise de dados.',
    fullDesc:
      'Implementamos assistentes conversacionais, extracção de informação de documentos, automação de tarefas repetitivas e análise de dados com modelos de IA.',
    iconName: 'Bot',
    benefits: ['Assistentes para WhatsApp e web', 'Processamento de linguagem natural', 'Análise inteligente de documentos', 'Integração via API'],
    category: 'ai',
  },
  {
    id: 'graphic-design',
    title: 'Design Gráfico e Identidade Digital',
    shortDesc: 'Identidade visual, banners, flyers, posts e materiais digitais.',
    fullDesc:
      'Construção de marcas através de identidades visuais completas, manuais de marca, peças para redes sociais e material de apresentação.',
    iconName: 'Palette',
    benefits: ['Logótipos e identidade corporativa', 'Kit para redes sociais', 'Apresentações e propostas comerciais', 'Materiais para impressão'],
    category: 'design',
  },
  {
    id: 'tech-education',
    title: 'Formação em Programação',
    shortDesc: 'Cursos práticos em tecnologias actuais.',
    fullDesc:
      'Formamos jovens, estudantes e profissionais com metodologia prática, orientada a projectos, do básico ao avançado.',
    iconName: 'GraduationCap',
    benefits: ['Projectos práticos', 'Turmas pequenas', 'Do básico ao avançado', 'Preços e durações claros'],
    category: 'education',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'roadmz',
    name: 'Road MZ',
    kind: 'Produto Learn Code',
    category: 'Mobilidade & IA',
    status: 'Disponível',
    iconName: 'Car',
    summary:
      'Aplicação Android de preparação para o exame de condução em Moçambique, com simulador de exames e assistente de IA sobre o Código da Estrada.',
    problem:
      'Quem se prepara para a carta de condução estuda com materiais dispersos e pouco práticos, sem forma rápida de esclarecer dúvidas sobre o Código da Estrada.',
    solution:
      'Uma app móvel com simulador de exames temporizado, sinalização explicada e um assistente com inteligência artificial que responde a perguntas sobre o Código da Estrada moçambicano.',
    features: ['Simulador de exames com temporizador', 'Assistente com IA sobre o Código da Estrada', 'Sinalização rodoviária explicada', 'Histórico de desempenho do candidato'],
    techStack: ['React Native', 'FastAPI', 'Gemini API'],
    targetAudience: 'Candidatos à carta de condução, escolas de condução e condutores em actualização.',
    link: 'https://play.google.com/store/apps/details?id=com.karimo02.codigoestrada',
    linkLabel: 'Ver na Google Play',
  },
  {
    id: 'quiz-code',
    name: 'Quiz Code',
    kind: 'Produto Learn Code',
    category: 'Educação & Mobile',
    status: 'Disponível',
    iconName: 'BookOpen',
    summary: 'Aplicação Android que ensina programação Java através de quizzes, para estudar no telemóvel ao ritmo de cada um.',
    problem:
      'Estudantes que querem aprender Java têm poucas opções práticas e acessíveis no telemóvel, sobretudo materiais pensados para quem estuda por conta própria.',
    solution:
      'Uma aplicação publicada na Google Play Store que ensina e testa conhecimentos de Java através de quizzes, directamente no dispositivo que os jovens mais usam.',
    features: ['Quizzes de Java por tema', 'Correcção imediata com explicação', 'Estudo offline no telemóvel', 'Progresso ao ritmo de cada um'],
    techStack: ['Android', 'Java'],
    targetAudience: 'Estudantes e autodidactas que querem iniciar-se em programação Java.',
    link: 'https://play.google.com/store/apps/details?id=com.karimo02.learnjava',
    linkLabel: 'Ver na Google Play',
  },
  {
    id: 'sispoupa',
    name: 'SisPoupa',
    kind: 'Projecto para cliente',
    category: 'FinTech & Inclusão Financeira',
    status: 'Em produção',
    iconName: 'PiggyBank',
    summary: 'Backend da plataforma de poupança rotativa (xitique digital), com gestão de grupos, ciclos, contribuições e multas.',
    problem:
      'Os grupos de poupança rotativa (xitique) dependem de registos manuais em cadernos: erros de contas, disputas sobre contribuições e multas e falta de transparência entre os membros.',
    solution:
      'A Learn Code desenvolveu a API da plataforma SisPoupa: gestão de grupos, ciclos de distribuição, contribuições e multas, com autenticação por número de telefone e PIN, pensada para o utilizador móvel moçambicano.',
    features: ['Gestão de grupos e ciclos de distribuição', 'Registo de contribuições e multas', 'Autenticação por telefone (+258) e PIN', 'Ligação encriptada (TLS)'],
    techStack: ['API REST', 'Autenticação por PIN', 'TLS'],
    targetAudience: 'Grupos de xitique e os seus membros.',
    link: 'https://clientes.poupancarotativa.co.mz/',
    linkLabel: 'Visitar plataforma',
  },
  {
    id: 'yela-corporation',
    name: 'YELA Corporation',
    kind: 'Projecto para cliente',
    category: 'Website institucional',
    status: 'Em produção',
    iconName: 'Building2',
    summary:
      'Website institucional da YELA Corporation, SA, sociedade de arquitectura, creative studio e construções sediada em Maputo e parceira estratégica da Learn Code.',
    problem:
      'A YELA precisava de uma presença digital que apresentasse as suas três áreas de actuação e a parceria com a Learn Code a organizações em todo o Moçambique, com um canal de contacto directo.',
    solution:
      'Website institucional com páginas sobre a empresa, áreas de actuação, parceria estratégica e contacto, com identidade visual sóbria, navegação clara e chamadas à acção para WhatsApp e email.',
    features: ['Áreas de actuação: Arquitectura, Creative Studio e Construções', 'Página da parceria YELA Corporation × Learn Code', 'Contacto directo por WhatsApp e email', 'Metadados para partilha em redes sociais'],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Vercel'],
    targetAudience: 'Organizações, empresas e instituições em Moçambique com desafios em arquitectura, comunicação, obra ou tecnologia.',
    link: 'https://yela-corporation.vercel.app/',
    linkLabel: 'Visitar website',
  },
  {
    id: 'ecomaputo',
    name: 'EcoMaputo',
    kind: 'Produto Learn Code',
    category: 'Cidades Inteligentes & Ambiente',
    status: 'Protótipo',
    iconName: 'Leaf',
    summary: 'Protótipo de plataforma para mapear ecopontos e organizar a recolha selectiva de resíduos na cidade de Maputo.',
    problem:
      'Falta informação centralizada sobre pontos de deposição selectiva de lixo, e o descarte inadequado de resíduos é frequente nas zonas urbanas de Maputo.',
    solution:
      'Um sistema web e móvel de geolocalização que mapeia ecopontos, permite pedir recolhas e gera dados úteis para quem gere a limpeza urbana.',
    features: ['Mapa de ecopontos', 'Pedido de recolha selectiva', 'Painel para o município', 'Incentivos à reciclagem'],
    techStack: ['React Native', 'Angular', 'FastAPI', 'MySQL'],
    targetAudience: 'Municípios, empresas de gestão ambiental, catadores e moradores da região de Maputo.',
  },
  {
    id: 'codigo-civil-mz',
    name: 'Código Civil Moçambicano',
    kind: 'Produto Learn Code',
    category: 'LegalTech & IA',
    status: 'Em desenvolvimento',
    iconName: 'Scale',
    summary: 'Assistente com IA e API para consultar o Código Civil moçambicano em linguagem natural.',
    problem:
      'Consultar a legislação civil exige folhear tomos extensos ou PDFs não pesquisáveis, o que dificulta o trabalho de juristas e o acesso do cidadão aos seus direitos.',
    solution:
      'Uma plataforma que estrutura o Código Civil e o liga a um assistente com inteligência artificial, capaz de interpretar perguntas em linguagem natural e devolver o artigo relevante com uma explicação simplificada.',
    features: ['Pesquisa em linguagem natural', 'Citação do artigo exacto', 'Resumos simplificados', 'API REST para integração'],
    techStack: ['Python', 'FastAPI', 'Gemini API', 'RAG'],
    targetAudience: 'Advogados, estudantes de direito, empresas, ONGs e cidadãos.',
  },
];

export const PARTNERS: PartnerItem[] = [
  {
    id: 'yela-corporation',
    name: 'YELA Corporation',
    role: 'Parceiro estratégico',
    since: 'Setembro de 2026',
    location: 'Maputo, Moçambique',
    summary:
      'A YELA Corporation, SA é uma sociedade moçambicana de arquitectura, creative studio e construções. Através da parceria com a Learn Code, leva soluções digitais às organizações que acompanha: websites, aplicações, sistemas e inteligência artificial.',
    howItWorks: [
      'A YELA identifica a oportunidade junto das organizações que acompanha.',
      'A Learn Code analisa o desafio, orça e executa a solução tecnológica.',
      'A YELA acompanha a relação com o cliente ao longo do projecto.',
    ],
    areas: ['Arquitectura', 'Creative Studio', 'Construções'],
    link: 'https://yela-corporation.vercel.app/',
    linkLabel: 'Visitar a YELA Corporation',
    projectRef: 'yela-corporation',
    iconName: 'Building2',
  },
];

export const COURSES: CourseItem[] = [
  {
    id: 'html-css',
    title: 'HTML5 + CSS3',
    duration: '6 semanas',
    level: 'Iniciante',
    prerequisites: 'Sem requisitos prévios.',
    summary: 'Aprenda a estruturar e estilizar páginas web do zero com as tecnologias fundamentais da web.',
    topics: ['Estrutura HTML5 semântica', 'CSS3, Flexbox e Grid', 'Design responsivo para telemóveis', 'Publicação do primeiro site online'],
    price: 3950,
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    duration: '4 semanas',
    level: 'Intermédio',
    prerequisites: 'Conhecimentos básicos de HTML e CSS.',
    summary: 'Adicione interactividade e dinamismo aos seus sites com a linguagem mais usada na web.',
    topics: ['Sintaxe moderna (ES6+)', 'Manipulação do DOM', 'Eventos e assincronismo (Promises, Fetch API)', 'Pequenas aplicações web interactivas'],
    price: 4100,
  },
  {
    id: 'mysql',
    title: 'MySQL',
    duration: '6 semanas',
    level: 'Intermédio',
    prerequisites: 'Lógica de programação básica.',
    summary: 'Desenhe, consulte e gira bases de dados relacionais para aplicações reais.',
    topics: ['Modelação de dados (DER)', 'Consultas SQL (joins, agregações)', 'Chaves primárias e estrangeiras', 'Integração com linguagens de programação'],
    price: 4500,
  },
  {
    id: 'python',
    title: 'Python',
    duration: '5 semanas',
    level: 'Iniciante',
    prerequisites: 'Sem requisitos prévios.',
    summary: 'Fundamentos de programação e lógica com Python, a base para automação, dados e inteligência artificial.',
    topics: ['Variáveis, tipos de dados e operadores', 'Estruturas de decisão e repetição', 'Funções e módulos', 'Manipulação de ficheiros e scripts úteis'],
    price: 4700,
  },
  {
    id: 'python-advanced',
    title: 'Python Avançado',
    duration: '6 semanas',
    level: 'Avançado',
    prerequisites: 'Domínio dos fundamentos de Python.',
    summary: 'Conteúdos avançados de Python, incluindo Programação Orientada a Objectos e construção de APIs.',
    topics: ['Programação Orientada a Objectos (POO)', 'Tratamento de erros e excepções', 'Criação de APIs REST com FastAPI', 'Testes automatizados e publicação'],
    price: 4900,
  },
  {
    id: 'java-basic',
    title: 'Java Básico',
    duration: '5 semanas',
    level: 'Iniciante',
    prerequisites: 'Lógica de programação básica (recomendado).',
    summary: 'Fundamentos de programação com Java, uma das linguagens mais usadas em sistemas empresariais.',
    topics: ['Sintaxe, variáveis e tipos de dados', 'Estruturas de decisão e ciclos', 'Métodos e arrays', 'Primeiros programas de consola'],
    price: 4600,
  },
];
