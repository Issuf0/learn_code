import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ExternalLink, Info, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/mockData';
import { ProjectItem } from '../types';
import { NamedIcon } from '../lib/icons';
import { STATUS_STYLE } from '../lib/status';
import { SectionHeader, Accent } from './ui/SectionHeader';
import { Reveal } from './ui/Reveal';

import { btnGhost, btnPrimary, btnSoft, cardHover, chip, container, section } from '../lib/ui';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  return (
    <section id="projectos" className={`${section} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white`}>
      <div className={container}>
        <SectionHeader
          as="h1"
          icon={<Briefcase className="w-3.5 h-3.5" aria-hidden="true" />}
          eyebrowText="Projectos e produtos"
          title={<>Produtos digitais <Accent>criados em Moçambique.</Accent></>}
          lead="Produtos próprios da Learn Code e projectos desenvolvidos para clientes. Cada cartão indica o estado real do projecto."
        />

        <Reveal as="ul" stagger className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => {
            const status = STATUS_STYLE[project.status];
            return (
              <li key={project.id} className={`${cardHover} overflow-hidden flex flex-col group`}>
                {/* Cabeçalho visual (sem imagem real ainda) */}
                <div className="relative h-28 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-950/60 dark:via-slate-900 dark:to-blue-900/30 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  <div className={`absolute top-0 left-0 right-0 h-1 ${status.bar}`} aria-hidden="true" />
                  {project.image ? (
                    <img src={project.image} alt={`Captura de ecrã de ${project.name}`} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900 shadow-sm flex items-center justify-center text-blue-700 dark:text-blue-300 transition-transform duration-300 group-hover:scale-110">
                      <NamedIcon name={project.iconName} className="w-7 h-7" />
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{project.category}</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${status.pill}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                      {project.status}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{project.name}</h2>
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">{project.kind}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{project.summary}</p>
                  </div>

                  <ul className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <li key={tech} className={chip}>{tech}</li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button type="button" onClick={() => setSelected(project)} className={`${btnGhost} w-full`} aria-haspopup="dialog">
                      <Info className="w-4 h-4 text-blue-700 dark:text-blue-300" aria-hidden="true" />
                      <span>Ver detalhes</span>
                    </button>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${btnSoft} w-full`}>
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span>{project.linkLabel ?? 'Visitar'}</span>
                      </a>
                    ) : (
                      <Link to={`/contacto?tipo=parceria&assunto=${encodeURIComponent(project.name)}`} className={`${btnSoft} w-full`}>
                        <span>Propor uma parceria</span>
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>

        <Reveal className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tem um projecto em mente?</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Conte-nos o problema que quer resolver e o que pretende construir. Respondemos pelo WhatsApp.
            </p>
          </div>
          <Link to="/contacto?tipo=projecto" className={`${btnPrimary} shrink-0`}>
            <span>Descrever o meu projecto</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};
