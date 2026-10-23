import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { whatsappHref } from '../config/site';
import { SectionHeader, Accent } from './ui/SectionHeader';
import { Reveal } from './ui/Reveal';

import { btnWhatsApp, section } from '../lib/ui';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quanto custa um website ou sistema?',
    answer:
      'Cada projecto é único, por isso o valor depende das funcionalidades, da complexidade e dos prazos pretendidos. Conte-nos o que pretende construir e apresentamos uma proposta por escrito, sem compromisso, antes de começarmos.',
  },
  {
    question: 'Quanto tempo demora um projecto?',
    answer:
      'Websites institucionais ficam normalmente prontos em 2 a 4 semanas. Sistemas e aplicações à medida levam tipicamente de 4 a 12 semanas, conforme a complexidade. O prazo é definido no contrato e mantemos-lhe informado sobre o progresso.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer:
      'Trabalhamos com um modelo simples: sinal de 30% a 50% do valor total antes de começarmos e o restante na entrega. Aceitamos M-Pesa, e-Mola e transferência bancária, sempre com factura e recibo.',
  },
  {
    question: 'Como acompanho o meu projecto?',
    answer:
      'Recebe actualizações regulares sobre o progresso e as etapas do projecto, com contacto directo com a equipa pelo WhatsApp e por email.',
  },
  {
    question: 'E se eu precisar de alterações depois da entrega?',
    answer:
      'Todos os projectos incluem um período de garantia para correcções sem custo. Depois disso, oferecemos planos de manutenção e suporte para manter a sua solução actualizada e segura.',
  },
  {
    question: 'Como me inscrevo num curso?',
    answer:
      'Escolha o curso na página de cursos e use o botão de inscrição. Recebemos o seu pedido pelo WhatsApp e confirmamos consigo a próxima turma, o horário e as condições.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const whatsappUrl = whatsappHref('Olá Learn Code! Tenho uma dúvida que não encontrei nas perguntas frequentes do site.');

  return (
    <section id="faq" className={`${section} bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={<HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />}
          eyebrowText="Perguntas frequentes"
          title={<>Tudo o que precisa de saber <Accent>antes de começar.</Accent></>}
          lead="Respostas directas às dúvidas mais comuns sobre preços, prazos e como trabalhamos."
        />

        <Reveal stagger className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 ${
                  isOpen
                    ? 'bg-slate-50 dark:bg-slate-800/50 border-blue-200 dark:border-blue-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer rounded-2xl"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{item.question}</span>
                    <span
                      className={`w-8 h-8 shrink-0 rounded-full inline-flex items-center justify-center transition-colors duration-300 ${
                        isOpen ? 'bg-blue-700 text-white' : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                </h3>
                {/* A altura anima de 0fr para 1fr; fechada, a resposta fica inert (sem foco nem leitura). */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-5 sm:px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-[opacity,transform] duration-300 ease-out ${
                        isOpen ? 'opacity-100 translate-y-0 delay-75' : 'opacity-0 -translate-y-1'
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <Reveal className="mt-10 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">Não encontrou a resposta que procurava?</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={btnWhatsApp}>
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>Perguntar no WhatsApp</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};
