import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CoursesSection } from './components/CoursesSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { HomeHighlightsSection } from './components/HomeHighlightsSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { NotFoundPage } from './components/NotFoundPage';
import { ThemeMode } from './types';
import { ROUTES, SITE_URL } from './config/site';

// Caminhos antigos que continuam a funcionar.
const REDIRECTS: Record<string, string> = {
  orcamento: 'contacto',
  produtos: 'projectos',
  portfolio: 'projectos',
};

const setMeta = (selector: string, content: string) => {
  document.querySelector(selector)?.setAttribute('content', content);
};

// Espaço para o cabeçalho fixo (a faixa superior só existe a partir de md).
const PAGE_TOP = 'pt-[4.25rem]';

export default function App() {
  const location = useLocation();
  const [pathRoot] = location.pathname.split('/').filter(Boolean);
  const requested = pathRoot ?? '';
  const page = REDIRECTS[requested] ?? requested;
  const isNotFound = !(page in ROUTES);

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem('lc-theme');
      return stored === 'dark' || stored === 'light' || stored === 'auto' ? stored : 'auto';
    } catch {
      return 'auto';
    }
  });
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isDarkMode = themeMode === 'dark' || (themeMode === 'auto' && systemPrefersDark);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    try {
      localStorage.setItem('lc-theme', themeMode);
    } catch {
      /* armazenamento indisponível (modo privado, etc.) */
    }
  }, [themeMode, isDarkMode]);

  // Título, descrição e metadados de partilha por página.
  useEffect(() => {
    if (isNotFound) {
      document.title = 'Página não encontrada · Learn Code';
      setMeta('meta[name="robots"]', 'noindex');
      return;
    }
    const route = ROUTES[page];
    const url = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
    document.title = route.title;
    setMeta('meta[name="description"]', route.description);
    setMeta('meta[name="robots"]', 'index,follow');
    setMeta('meta[property="og:title"]', route.title);
    setMeta('meta[property="og:description"]', route.description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', route.title);
    setMeta('meta[name="twitter:description"]', route.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
  }, [page, isNotFound]);

  // Scroll: topo ao mudar de página; âncora (#id) quando existir.
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ block: 'start' });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  // Caminhos antigos: a URL é corrigida sem recarregar.
  useEffect(() => {
    if (REDIRECTS[requested]) window.history.replaceState(null, '', `/${REDIRECTS[requested]}${location.search}`);
  }, [requested, location.search]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200`}>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-700 focus:text-white focus:text-sm focus:font-bold"
      >
        Saltar para o conteúdo
      </a>

      <div className="bg-white dark:bg-slate-950">
        <Navbar themeMode={themeMode} onChangeTheme={setThemeMode} />

        <main id="conteudo">
          {isNotFound && <div className={PAGE_TOP}><NotFoundPage /></div>}

          {!isNotFound && page === '' && (
            <>
              <Hero />
              <HomeHighlightsSection />
              <FAQSection />
            </>
          )}
          {page === 'sobre' && <div className={PAGE_TOP}><AboutSection /></div>}
          {page === 'servicos' && <div className={PAGE_TOP}><ServicesSection /></div>}
          {page === 'projectos' && <div className={PAGE_TOP}><ProjectsSection /></div>}
          {page === 'cursos' && <div className={PAGE_TOP}><CoursesSection /></div>}
          {page === 'contacto' && <div className={PAGE_TOP}><ContactSection /></div>}
        </main>

        <Footer />
        <WhatsAppWidget />
      </div>
    </div>
  );
}
