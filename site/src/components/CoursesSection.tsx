import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Clock, CheckCircle2, ArrowRight, BarChart3, MessageSquare } from 'lucide-react';
import { COURSES } from '../data/mockData';
import { CourseItem } from '../types';
import { SectionHeader, Accent } from './ui/SectionHeader';
import { Reveal } from './ui/Reveal';

import { btnPrimary, btnSecondary, cardHover, container, section } from '../lib/ui';

const LEVELS = ['Todos', 'Iniciante', 'Intermédio', 'Avançado'] as const;

export const CoursesSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<(typeof LEVELS)[number]>('Todos');
  const filtered = COURSES.filter((c) => selectedLevel === 'Todos' || c.level === selectedLevel);

  return (
    <section id="cursos" className={`${section} bg-white dark:bg-slate-950 text-slate-900 dark:text-white`}>
      <div className={container}>
        <SectionHeader
          as="h1"
          icon={<GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />}
          eyebrowText="Formação em programação"
          title={<>Cursos de programação para impulsionar a sua <Accent>carreira tecnológica.</Accent></>}
          lead="Formação prática, orientada por projectos, com duração clara para cada curso."
        />

        {/* Filtro por nível */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filtrar cursos por nível">
          {LEVELS.map((lvl) => {
            const active = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-2.5 min-h-11 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        <Reveal as="ul" stagger className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
          {filtered.map((course: CourseItem) => (
            <li key={course.id} id={course.id} className={`${cardHover} p-6 flex flex-col justify-between`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
                    {course.level}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    {course.duration}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{course.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{course.summary}</p>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Requisitos:</span> {course.prerequisites}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Módulos principais</h3>
                  <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800">
                <Link to={`/contacto?tipo=curso&curso=${course.id}`} className={`${btnPrimary} w-full`}>
                  <span>Inscrever-me neste curso</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Datas, horários e turmas</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              As turmas abrem ao longo do ano. Fale connosco para saber a próxima data, o horário e a modalidade disponíveis para o curso que lhe interessa.
            </p>
          </div>
          <Link to="/contacto?tipo=curso" className={`${btnSecondary} shrink-0`}>
            <MessageSquare className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Falar com a Learn Code</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
