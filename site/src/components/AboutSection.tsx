import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Building2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { SectionHeader, Accent } from './ui/SectionHeader';
import { btnPrimary, btnSecondary, card, container, section } from '../lib/ui';

export const AboutSection: React.FC = () => (
  <section id="sobre" className={`${section} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white`}>
    <div className={container}>
      <SectionHeader
        as="h1"
        icon={<Building2 className="w-3.5 h-3.5" aria-hidden="true" />}
        eyebrowText="Sobre a Learn Code"
        title={<>Uma startup moçambicana comprometida com a <Accent>excelência digital.</Accent></>}
        lead={COMPANY_INFO.aboutBrief}
      />

      {/* Missão e visão */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: Target, title: 'Missão', quote: COMPANY_INFO.mission, text: 'Resolver desafios práticos com software robusto, inteligência artificial e formação técnica contínua.' },
          { icon: Compass, title: 'Visão', quote: COMPANY_INFO.vision, text: 'Construir um ecossistema tecnológico que represente o talento moçambicano, em Moçambique e além-fronteiras.' },
        ].map(({ icon: Icon, title, quote, text }) => (
          <div key={title} className={`${card} p-7 relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" aria-hidden="true" />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 shrink-0">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
                <p className="text-slate-800 dark:text-slate-100 leading-relaxed font-semibold text-lg">{quote}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Valores */}
      <div className="mt-10 sm:mt-14 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Os nossos valores</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Os princípios que orientam as nossas decisões, entregas e relações.</p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {COMPANY_INFO.values.map((val, idx) => (
            <li key={val.title} className={`${card} p-5 space-y-3`}>
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-sm" aria-hidden="true">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{val.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{val.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Lema + CTA */}
      <div className={`${card} mt-10 sm:mt-14 p-7 sm:p-10 text-center relative overflow-hidden rounded-3xl`}>
        <div className="absolute -right-24 -top-24 w-80 h-80 bg-blue-400 rounded-full opacity-[0.06] blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="max-w-3xl mx-auto space-y-5 relative z-10">
          <blockquote className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug text-balance">
            “{COMPANY_INFO.slogan}”
          </blockquote>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            Cada linha de código que escrevemos reflecte a nossa seriedade, transparência e empenho no sucesso de quem confia em nós.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-1">
            <Link to="/contacto?tipo=projecto" className={btnPrimary}>
              <span>Vamos falar do seu projecto</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link to="/projectos" className={btnSecondary}>Ver os nossos projectos</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);
