import { ProjectStatus } from '../types';

/** Cores por estado de projecto. Verde apenas para o que está realmente disponível. */
export const STATUS_STYLE: Record<ProjectStatus, { pill: string; dot: string; bar: string }> = {
  'Disponível': {
    pill: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
    dot: 'bg-emerald-600',
    bar: 'bg-emerald-500',
  },
  'Em produção': {
    pill: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
    dot: 'bg-emerald-600',
    bar: 'bg-emerald-500',
  },
  'Em desenvolvimento': {
    pill: 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900',
    dot: 'bg-amber-600',
    bar: 'bg-amber-500',
  },
  'Protótipo': {
    pill: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    dot: 'bg-slate-500',
    bar: 'bg-slate-400',
  },
  'Caso de estudo': {
    pill: 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-900',
    dot: 'bg-blue-600',
    bar: 'bg-blue-500',
  },
  'Em breve': {
    pill: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    dot: 'bg-slate-500',
    bar: 'bg-slate-400',
  },
};
