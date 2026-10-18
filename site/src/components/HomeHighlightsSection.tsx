import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Briefcase, ArrowRight, GraduationCap } from 'lucide-react';
import { SERVICES, PROJECTS, COURSES } from '../data/mockData';
import { NamedIcon } from '../lib/icons';
import { STATUS_STYLE } from '../lib/status';
import { SectionHeader, Accent } from './ui/SectionHeader';
import { btnPrimary, btnSecondary, cardHover, container, section } from '../lib/ui';

const FEATURED_SERVICE_IDS = ['web-dev', 'mobile-apps', 'ai-solutions'];
const FEATURED_PROJECT_IDS = ['roadmz', 'quiz-code', 'sispoupa'];

export const HomeHighlightsSection: React.FC = () => {
  const featuredServices = SERVICES.filter((s) => FEATURED_SERVICE_IDS.includes(s.id));
  const featuredProjects = FEATURED_PROJECT_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean) as typeof PROJECTS;

  return (
    <>
      {/* Serviços em destaque */}
      <section className={`${section} bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800`}>
        <div className={container}>
          <SectionHeader
            icon={<Layers className="w-3.5 h-3.5" aria-hidden="true" />}
            eyebrowText="O que fazemos"
            title={<>Soluções digitais para o seu <Accent>negócio ou instituição.</Accent></>}
          />
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <li key={service.id}>
                <Link to={`/servicos#${service.id}`} className={`${cardHover} p-6 block h-full group`}>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                    <NamedIcon name={service.iconName} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{service.shortDesc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 dark:text-blue-300">
                    <span>Saber mais</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link to="/servicos" className={btnSecondary}>
              <span>Conhecer os nossos serviços</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Projectos em destaque */}
      <section className={`${section} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800`}>
        <div className={container}>
          <SectionHeader
            icon={<Briefcase className="w-3.5 h-3.5" aria-hidden="true" />}
            eyebrowText="Projectos em destaque"
            title={<>Produtos reais, <Accent>feitos em Moçambique.</Accent></>}
          />
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => {
              const status = STATUS_STYLE[project.status];
              return (
                <li key={project.id} className={`${cardHover} p-6 flex flex-col`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{project.category}</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${status.pill}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                      {project.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{project.name}</h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold">
                    <Link to="/projectos" className="inline-flex items-center gap-1.5 text-blue-700 dark:text-blue-300 hover:underline">
                      Ver projecto <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:underline">
                        {project.linkLabel}
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 text-center">
            <Link to="/projectos" className={btnPrimary}>
              <span>Ver os nossos projectos</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section className={`${section} bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800`}>
        <div className={`${container} grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}>
          <SectionHeader
            align="left"
            icon={<GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />}
            eyebrowText="Formação"
            title={<>Cursos práticos de programação <Accent>em Maputo.</Accent></>}
            lead={`${COURSES.length} cursos, do HTML ao Python Avançado, com duração clara e turmas em Maputo.`}
          />
          <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
            <Link to="/cursos" className={btnPrimary}>
              <span>Conhecer os cursos</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link to="/contacto?tipo=curso" className={btnSecondary}>Inscrever-me num curso</Link>
          </div>
        </div>
      </section>
    </>
  );
};
