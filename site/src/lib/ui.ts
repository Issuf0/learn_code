// Classes partilhadas para manter botões, cartões e secções consistentes.
// O anel de foco é global (ver index.css), por isso não se repete aqui.

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed min-h-11';

export const btnPrimary = `${btnBase} px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20`;

export const btnSecondary = `${btnBase} px-6 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100`;

export const btnWhatsApp = `${btnBase} px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20`;

export const btnSoft = `${btnBase} px-5 py-2.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300`;

export const btnGhost = `${btnBase} px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200`;

export const section = 'py-14 sm:py-20';

export const container = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

export const card =
  'rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm';

export const cardHover = `${card} hover:border-blue-500 hover:shadow-md transition-all duration-300`;

export const eyebrow =
  'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider';

export const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 transition-colors aria-[invalid=true]:border-rose-500';

export const labelClass = 'block text-sm font-semibold text-slate-700 dark:text-slate-300';

export const chip =
  'px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-xs font-mono font-medium';
