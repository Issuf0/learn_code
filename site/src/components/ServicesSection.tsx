import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Layers } from 'lucide-react';
import { SERVICES } from '../data/mockData';
import { NamedIcon } from '../lib/icons';
import { SectionHeader, Accent } from './ui/SectionHeader';
import { btnPrimary, btnSecondary, cardHover, container, section } from '../lib/ui';

export const ServicesSection: React.FC = () => (
  <section id="servicos" className={`${section} bg-white dark:bg-slate-950 text-slate-900 dark:text-white`}>
    <div className={container}>
      <SectionHeader
        as="h1"
        icon={<Layers className="w-3.5 h-3.5" aria-hidden="true" />}
        eyebrowText="Os nossos serviços"
        title={<>Soluções completas de engenharia de software e <Accent>inovação digital.</Accent></>}
        lead="Desenvolvemos tecnologia à medida das necessidades de negócios e instituições em Moçambique."
      />

      <ul className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service) => {
          const isCourse = service.id === 'tech-education';
          return (
            <li key={service.id} id={service.id} className={`${cardHover} p-6 flex flex-col justify-between group`}>
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                  <NamedIcon name={service.iconName} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{service.title}</h2>
                  <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-relaxed">{service.shortDesc}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.fullDesc}</p>
                </div>
                <ul className="pt-3 space-y-1.5 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800">
                {isCourse ? (
                  <Link to="/cursos" className={`${btnSecondary} w-full`}>
                    <span>Conhecer os cursos</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <Link to={`/contacto?tipo=projecto&assunto=${encodeURIComponent(service.title)}`} className={`${btnPrimary} w-full`}>
                    <span>Descrever o meu projecto</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Não sabe por onde começar?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Conte-nos o problema que quer resolver. Ajudamos a escolher a solução certa e apresentamos uma proposta por escrito, sem compromisso.
          </p>
        </div>
        <Link to="/contacto?tipo=projecto" className={`${btnPrimary} shrink-0`}>
          <span>Vamos falar do seu projecto</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);
