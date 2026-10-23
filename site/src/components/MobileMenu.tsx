import React, { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  X, Home, Building2, Layers, Briefcase, GraduationCap, Handshake, Mail, MessageCircle, ArrowRight, Sun, Moon, MonitorSmartphone, Facebook, Instagram,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { whatsappHref } from '../config/site';
import { ThemeMode } from '../types';
import logoIcon from '../assets/images/learncode-icon.png';

export const MOBILE_LINKS = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/sobre', label: 'Sobre', icon: Building2 },
  { path: '/servicos', label: 'Serviços', icon: Layers },
  { path: '/projectos', label: 'Projectos', icon: Briefcase },
  { path: '/cursos', label: 'Cursos', icon: GraduationCap },
  { path: '/parcerias', label: 'Parcerias', icon: Handshake },
  { path: '/contacto', label: 'Contacto', icon: Mail },
];

const THEMES: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
  { mode: 'light', label: 'Claro', icon: Sun },
  { mode: 'dark', label: 'Escuro', icon: Moon },
  { mode: 'auto', label: 'Auto', icon: MonitorSmartphone },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
  onChangeTheme: (mode: ThemeMode) => void;
  /** Botão que abriu o menu, para lhe devolver o foco ao fechar. */
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

/** Painel lateral de navegação para telemóvel e tablet. */
export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, themeMode, onChangeTheme, returnFocusRef }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 50);
    const returnTo = returnFocusRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      returnTo?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  // Atraso escalonado só na abertura; ao fechar, tudo sai em conjunto.
  const stagger = (i: number): React.CSSProperties => ({ transitionDelay: open ? `${80 + i * 40}ms` : '0ms' });
  const itemMotion = `transition-[opacity,transform] duration-300 ease-out ${open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`;

  return (
    <div className={`fixed inset-0 z-[80] lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open} inert={!open}>
      {/* Fundo escurecido */}
      <div
        className={`absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Painel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute top-0 right-0 h-full w-[min(21rem,88vw)] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cabeçalho do painel */}
        <div className="flex items-center justify-between gap-3 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" onClick={onClose} className="flex items-center gap-2 rounded-lg" aria-label="Learn Code — página inicial">
            <img src={logoIcon} alt="" width={54} height={36} className="h-8 w-auto" />
            <span className="font-extrabold text-lg tracking-tight text-blue-500">
              Learn <span className="font-light text-blue-400">Code</span>
            </span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="w-11 h-11 inline-flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer transition-transform active:scale-95"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Conteúdo com scroll próprio */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-3 py-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Navegação</p>
          <ul className="space-y-1">
            {MOBILE_LINKS.map(({ path, label, icon: Icon }, i) => (
              <li key={path} style={stagger(i)} className={itemMotion}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3 py-3 rounded-xl text-base transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-full bg-blue-600" aria-hidden="true" />}
                      <span
                        className={`w-9 h-9 shrink-0 rounded-lg inline-flex items-center justify-center ${
                          isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                        aria-hidden="true"
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </span>
                      <span className="flex-1">{label}</span>
                      {isActive && <span className="sr-only">(página actual)</span>}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Tema */}
          <div style={stagger(MOBILE_LINKS.length)} className={`${itemMotion} mt-6 px-3`}>
            <p className="pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400" id="mobile-theme-label">Tema</p>
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800" role="group" aria-labelledby="mobile-theme-label">
              {THEMES.map(({ mode, label, icon: Icon }) => {
                const active = themeMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onChangeTheme(mode)}
                    className={`min-h-11 inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-white dark:bg-slate-950 text-blue-700 dark:text-blue-300 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rodapé do painel */}
        <div
          style={stagger(MOBILE_LINKS.length + 1)}
          className={`${itemMotion} border-t border-slate-200 dark:border-slate-800 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-3 bg-slate-50 dark:bg-slate-950/60`}
        >
          <Link
            to="/contacto?tipo=projecto"
            onClick={onClose}
            className="w-full min-h-11 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
          >
            <span>Vamos falar do seu projecto</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <div className="flex items-center justify-between gap-2 pt-1">
            <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 truncate py-2">
              {COMPANY_INFO.email}
            </a>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Falar no WhatsApp (${COMPANY_INFO.whatsappFormatted})`}
                title="WhatsApp"
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href={COMPANY_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Learn Code no Facebook" className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href={COMPANY_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Learn Code no Instagram" className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-pink-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
