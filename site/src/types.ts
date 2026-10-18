export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  benefits: string[];
  category: 'dev' | 'mobile' | 'api' | 'ai' | 'design' | 'education';
}

/** Estados possíveis de um projecto. Usar apenas o que corresponde à realidade. */
export type ProjectStatus =
  | 'Disponível'
  | 'Em produção'
  | 'Em desenvolvimento'
  | 'Protótipo'
  | 'Caso de estudo'
  | 'Em breve';

export interface ProjectItem {
  id: string;
  name: string;
  /** Produto próprio da Learn Code ou projecto desenvolvido para um cliente. */
  kind: 'Produto Learn Code' | 'Projecto para cliente';
  category: string;
  status: ProjectStatus;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  targetAudience: string;
  link?: string;
  linkLabel?: string;
  /** Captura de ecrã real (caminho em /public). Ainda não existem para nenhum projecto. */
  image?: string;
  iconName: 'Car' | 'BookOpen' | 'PiggyBank' | 'Leaf' | 'Scale' | 'Building2';
}

export interface PartnerItem {
  id: string;
  name: string;
  /** Natureza da relação, ex.: "Parceiro estratégico". */
  role: string;
  since: string;
  location: string;
  summary: string;
  /** Como funciona a colaboração, por passos. */
  howItWorks: string[];
  areas: string[];
  link?: string;
  linkLabel?: string;
  /** Projecto relacionado em PROJECTS (ex.: o website desenvolvido). */
  projectRef?: string;
  iconName: 'Building2';
}

export interface CourseItem {
  id: string;
  title: string;
  duration: string;
  level: 'Iniciante' | 'Intermédio' | 'Avançado';
  prerequisites: string;
  summary: string;
  topics: string[];
  /** Preço do curso em meticais (sem taxa de inscrição). */
  price: number;
}

// Tema da plataforma: manual (light/dark) ou automático (segue o sistema operativo)
export type ThemeMode = 'light' | 'dark' | 'auto';
