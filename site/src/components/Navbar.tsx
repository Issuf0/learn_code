import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, MonitorSmartphone } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { ThemeMode } from '../types';
import logoIcon from '../assets/images/learncode-icon.png';

interface NavbarProps {
  themeMode: ThemeMode;
  onChangeTheme: (mode: ThemeMode) => void;
}

const THEME_CYCLE: Record<ThemeMode, ThemeMode> = { auto: 'light', light: 'dark', dark: 'auto' };

const THEME_LABEL: Record<ThemeMode, string> = {
  auto: 'Automático (segue o sistema)',
  light: 'Claro',
  dark: 'Escuro',
};

const NAV_LINKS = [
  { path: '/', label: 'Início' },
  { path: '/sobre', label: 'Sobre' },
  { path: '/servicos', label: 'Serviços' },
  { path: '/projectos', label: 'Projectos' },
  { path: '/cursos', label: 'Cursos' },
  { path: '/parcerias', label: 'Parcerias' },
  { path: '/contacto', label: 'Contacto' },
];

const ThemeIcon: React.FC<{ mode: ThemeMode; className?: string }> = ({ mode, className }) =>
  mode === 'light' ? (
    <Sun className={className} aria-hidden="true" />
  ) : mode === 'dark' ? (
    <Moon className={className} aria-hidden="true" />
  ) : (
    <MonitorSmartphone className={className} aria-hidden="true" />
  );

export const Navbar: React.FC<NavbarProps> = ({ themeMode, onChangeTheme }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu móvel ao mudar de página.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Fecha o painel se o ecrã passar para desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => e.matches && setMobileMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMenu = React.useCallback(() => setMobileMenuOpen(false), []);

  const themeButtonProps = {
    onClick: () => onChangeTheme(THEME_CYCLE[themeMode]),
    title: `Tema: ${THEME_LABEL[themeMode]} — clique para mudar`,
    'aria-label': `Mudar tema (actual: ${THEME_LABEL[themeMode]})`,
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Barra principal */}
      <nav
        aria-label="Navegação principal"
        className={`bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          isScrolled ? 'py-2.5 shadow-sm' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Logótipo */}
          <Link to="/" className="flex items-center gap-2.5 text-left group rounded-lg shrink-0" aria-label="Learn Code — página inicial">
            <img src={logoIcon} alt="" width={54} height={36} className="h-9 w-auto" />
            <span className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-blue-500 whitespace-nowrap">
                Learn <span className="font-light text-blue-400">Code</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                MZ
              </span>
            </span>
          </Link>

          {/* Ligações (desktop) */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm transition-colors inline-block whitespace-nowrap ${
                      isActive
                        ? 'text-blue-700 dark:text-blue-300 font-semibold bg-blue-50 dark:bg-blue-950/40'
                        : 'text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Tema + CTA (desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              {...themeButtonProps}
              className="w-10 h-10 inline-flex items-center justify-center rounded-full text-slate-500 hover:text-blue-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-blue-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <ThemeIcon mode={themeMode} className="w-4 h-4" />
            </button>
            <Link
              to="/contacto?tipo=projecto"
              className="hidden xl:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors whitespace-nowrap"
            >
              Vamos falar do seu projecto
            </Link>
          </div>

          {/* Controlo do menu (mobile e tablet) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-11 h-11 inline-flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer"
              aria-label="Abrir menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

      </nav>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={closeMenu}
        themeMode={themeMode}
        onChangeTheme={onChangeTheme}
        returnFocusRef={menuButtonRef}
      />
    </header>
  );
};
