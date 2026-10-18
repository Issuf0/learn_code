import React from 'react';
import { Link } from 'react-router-dom';
import { Handshake, ExternalLink, ArrowRight, MapPin, CalendarDays, CheckCircle2, Briefcase } from 'lucide-react';
import { PARTNERS, PROJECTS } from '../data/mockData';
import { NamedIcon } from '../lib/icons';
import { SectionHeader, Accent } from './ui/SectionHeader';
import { btnPrimary, btnSecondary, btnSoft, card, chip, container, section } from '../lib/ui';

const PARTNERSHIP_TYPES = [
  {
    title: 'Parceria tecnológica ou de produto',
    text: 'Empresas e organizações que querem levar websites, aplicações, sistemas ou IA aos seus clientes, com a Learn Code a analisar, orçar e executar.',
  },
  {
    title: 'Formação para equipas e instituições',
    text: 'Escolas, universidades e empresas que pretendem programas de formação em programação à medida das suas equipas ou alunos.',
  },
  {
    title: 'Projectos sociais e comunitários',
    text: 'Organizações e programas que usam tecnologia para resolver problemas reais em Moçambique e procuram um parceiro técnico.',
  },
];

export const PartnersSection: React.FC = () => (
  <section id="parcerias" className={`${section} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white`}>
    <div className={container}>
      <SectionHeader
        as="h1"
        icon={<Handshake className="w-3.5 h-3.5" aria-hidden="true" />}
        eyebrowText="Parcerias"
        title={<>Crescemos em conjunto com quem partilha a <Accent>nossa ambição.</Accent></>}
        lead="Trabalhamos com organizações que nos aproximam de novos desafios. Em troca, levamos tecnologia feita em Moçambique a mais pessoas e instituições."
      />

      {/* Parceiros */}
      <ul className="mt-10 sm:mt-14 space-y-6">
        {PARTNERS.map((partner) => {
          const project = partner.projectRef ? PROJECTS.find((p) => p.id === partner.projectRef) : undefined;
          return (
            <li key={partner.id} className={`${card} rounded-3xl overflow-hidden`}>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Identificação */}
                <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-950/60 dark:via-slate-900 dark:to-blue-900/30 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900 shadow-sm flex items-center justify-center text-blue-700 dark:text-blue-300">
                    <NamedIcon name={partner.iconName} className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">{partner.role}</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{partner.name}</h2>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 pt-1">
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                        {partner.location}
                      </li>
                      <li className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 shrink-0" aria-hidden="true" />
                        Parceria desde {partner.since}
                      </li>
                    </ul>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {partner.areas.map((area) => (
                      <li key={area} className={chip}>{area}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col sm:flex-row gap-2.5 pt-2">
                    {partner.link && (
                      <a href={partner.link} target="_blank" rel="noopener noreferrer" className={btnSoft}>
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span>{partner.linkLabel ?? 'Visitar'}</span>
                      </a>
                    )}
                    {project && (
                      <Link to="/projectos" className={`${btnSecondary} px-5 py-2.5`}>
                        <Briefcase className="w-4 h-4 text-blue-700 dark:text-blue-300" aria-hidden="true" />
                        <span>Ver o website que desenvolvemos</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Descrição e funcionamento */}
                <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">{partner.summary}</p>
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Como funciona a parceria</h3>
                    <ol className="space-y-2.5">
                      {partner.howItWorks.map((step, i) => (
                        <li key={step} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                          <span className="w-7 h-7 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-xs" aria-hidden="true">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Capacitar. Fortalecer. Transformar.</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Tipos de parceria */}
      <div className="mt-12 sm:mt-16 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Que parcerias procuramos</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Três formas de colaborar com a Learn Code. Se a sua ideia não se enquadra em nenhuma, fale connosco na mesma.</p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNERSHIP_TYPES.map((t) => (
            <li key={t.title} className={`${card} p-6 space-y-3`}>
              <CheckCircle2 className="w-6 h-6 text-blue-700 dark:text-blue-300" aria-hidden="true" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className={`${card} mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-5`}>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quer ser parceiro da Learn Code?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Conte-nos quem é a sua organização e como imagina a colaboração. Respondemos pelo WhatsApp.</p>
        </div>
        <Link to="/contacto?tipo=parceria" className={`${btnPrimary} shrink-0`}>
          <span>Propor uma parceria</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);
