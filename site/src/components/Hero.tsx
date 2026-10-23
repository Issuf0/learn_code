import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, CheckCircle2, Bot, GraduationCap } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { btnPrimary, btnSecondary, container } from '../lib/ui';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="pt-24 pb-10 md:pt-28 sm:pb-14 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className={container}>
        <div className="p-7 sm:p-12 lg:p-16 bg-white dark:bg-slate-900 rounded-3xl relative overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-blue-400 rounded-full opacity-[0.07] blur-3xl pointer-events-none animate-lc-float" aria-hidden="true" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-blue-500 rounded-full opacity-[0.05] blur-3xl pointer-events-none animate-lc-float-slow" aria-hidden="true" />

          <div className="max-w-3xl mx-auto space-y-6 text-center relative z-10">
            <h1 className="animate-lc-rise text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-slate-900 dark:text-white text-balance">
              Transformamos ideias em{' '}
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-300 dark:to-blue-500 bg-clip-text text-transparent">
                soluções digitais.
              </span>
            </h1>

            <p style={{ animationDelay: '100ms' }} className="animate-lc-rise text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              {COMPANY_INFO.subheadline}
            </p>

            <ul style={{ animationDelay: '200ms' }} className="animate-lc-rise flex flex-wrap justify-center gap-y-2 gap-x-5 text-sm text-slate-700 dark:text-slate-300 pt-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                <span>Websites, apps e sistemas</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                <span>Soluções com IA</span>
              </li>
              <li className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                <span>Formação em programação</span>
              </li>
            </ul>

            <div style={{ animationDelay: '300ms' }} className="animate-lc-rise pt-3 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contacto?tipo=projecto" className={`${btnPrimary} px-7 py-3.5`}>
                <span>Vamos falar do seu projecto</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to="/servicos" className={`${btnSecondary} px-7 py-3.5`}>
                <span>Explorar soluções</span>
                <Code2 className="w-4 h-4 text-blue-500" aria-hidden="true" />
              </Link>
            </div>

            <p style={{ animationDelay: '400ms' }} className="animate-lc-rise pt-4 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 italic">
              “{COMPANY_INFO.slogan}”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
