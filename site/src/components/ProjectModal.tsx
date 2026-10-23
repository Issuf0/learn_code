import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, ArrowRight, Users, ExternalLink, AlertTriangle, Lightbulb } from 'lucide-react';
import { ProjectItem } from '../types';
import { NamedIcon } from '../lib/icons';
import { STATUS_STYLE } from '../lib/status';
import { btnPrimary, btnSecondary, btnSoft, chip } from '../lib/ui';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const EXIT_MS = 220;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ProjectModal: React.FC<ProjectModalProps> = ({ project: requested, onClose }) => {
  // Mantém o último projecto montado durante a animação de saída.
  const [project, setProject] = useState<ProjectItem | null>(requested);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (requested) {
      setProject(requested);
      setClosing(false);
      return;
    }
    if (!project) return;
    setClosing(true);
    const timer = setTimeout(() => {
      setProject(null);
      setClosing(false);
    }, prefersReducedMotion() ? 0 : EXIT_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requested]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Foco inicial, Escape, ciclo de Tab dentro do diálogo e bloqueio do scroll de fundo.
  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
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
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  const status = STATUS_STYLE[project.status];
  const inDevelopment = project.status === 'Em desenvolvimento' || project.status === 'Protótipo' || project.status === 'Em breve';
  const ctaHref = inDevelopment
    ? `/contacto?tipo=parceria&assunto=${encodeURIComponent(project.name)}`
    : `/contacto?tipo=projecto&assunto=${encodeURIComponent(`Projecto semelhante a ${project.name}`)}`;
  const titleId = `project-modal-title-${project.id}`;

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/60 backdrop-blur-sm lc-overlay${closing ? ' is-closing' : ''}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full sm:max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] flex flex-col lc-dialog${closing ? ' is-closing' : ''}`}
      >
        {/* Cabeçalho */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 shrink-0">
              <NamedIcon name={project.iconName} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 id={titleId} className="text-xl font-bold text-slate-900 dark:text-white">{project.name}</h2>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${status.pill}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {project.kind} · {project.category}
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Fechar detalhes do projecto"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Corpo */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-600 dark:text-slate-400 lc-modal-stagger">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">{project.summary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-2">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                Problema abordado
              </h3>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">{project.problem}</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                <Lightbulb className="w-4 h-4" aria-hidden="true" />
                Solução
              </h3>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">{project.solution}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Funcionalidades</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <h3 className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                Para quem
              </h3>
              <p>{project.targetAudience}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <h3 className="text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Tecnologias</h3>
              <ul className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <li key={tech} className={chip}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${btnSoft} w-full sm:w-auto`}>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span>{project.linkLabel ?? 'Visitar'}</span>
            </a>
          )}
          <button type="button" onClick={onClose} className={`${btnSecondary} w-full sm:w-auto px-5 py-2.5`}>
            Fechar
          </button>
          <Link to={ctaHref} onClick={onClose} className={`${btnPrimary} w-full sm:w-auto px-5 py-2.5`}>
            <span>{inDevelopment ? 'Propor uma parceria' : 'Descrever o meu projecto'}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};
