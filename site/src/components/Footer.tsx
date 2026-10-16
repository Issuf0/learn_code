import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { whatsappHref } from '../config/site';
import logoFull from '../assets/images/learncode-logo.png';

const FOOTER_LINKS = [
  { path: '/', label: 'Início' },
  { path: '/sobre', label: 'Sobre' },
  { path: '/servicos', label: 'Serviços' },
  { path: '/projectos', label: 'Projectos' },
  { path: '/cursos', label: 'Cursos' },
  { path: '/contacto', label: 'Contacto' },
];

const linkClass = 'text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer id="rodape" className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 pt-10 pb-[calc(1.25rem+env(safe-area-inset-bottom))] border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
          {/* Marca */}
          <div className="space-y-3 md:max-w-sm">
            <img src={logoFull} alt="Learn Code" width={181} height={96} className="h-10 w-auto" />
            <p className="text-sm leading-relaxed">Software, inteligência artificial e formação em programação, de Moçambique para o mundo.</p>
            <div className="flex items-center gap-2">
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Learn Code no Facebook"
                className="w-11 h-11 inline-flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Learn Code no Instagram"
                className="w-11 h-11 inline-flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-pink-700 dark:hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Contactos */}
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>WhatsApp {COMPANY_INFO.whatsappFormatted}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY_INFO.email}`} className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                <Mail className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{COMPANY_INFO.address}</span>
            </li>
          </ul>
        </div>

        {/* Navegação + copyright */}
        <div className="pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={`${linkClass} inline-block py-1`}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-between gap-4 pr-16 sm:pr-0 text-xs text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} Learn Code · Maputo, Moçambique</p>
            <button
              type="button"
              onClick={scrollToTop}
              className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Voltar ao topo"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
