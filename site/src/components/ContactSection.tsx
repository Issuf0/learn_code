import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Send, Facebook, Instagram, MessageSquare, AlertCircle, Briefcase, GraduationCap, Handshake, HelpCircle, Copy, Check, ExternalLink, X,
} from 'lucide-react';
import { COMPANY_INFO, COURSES, SERVICES } from '../data/mockData';
import { whatsappHref, mailtoHref } from '../config/site';
import { SectionHeader, Accent } from './ui/SectionHeader';
import { btnPrimary, btnSecondary, btnWhatsApp, card, container, inputClass, labelClass, section } from '../lib/ui';

type Track = 'projecto' | 'curso' | 'parceria' | 'geral';

interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  autoComplete?: string;
  half?: boolean;
  hint?: string;
}

interface TrackDef {
  id: Track;
  label: string;
  icon: React.ReactNode;
  title: string;
  intro: string;
  fields: FieldDef[];
  submitLabel: string;
  note?: string;
}

const NAME: FieldDef = { name: 'name', label: 'Nome', type: 'text', required: true, placeholder: 'O seu nome', autoComplete: 'name', half: true };
const EMAIL: FieldDef = { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'nome@exemplo.co.mz', autoComplete: 'email', half: true };
const PHONE = (required: boolean): FieldDef => ({ name: 'phone', label: 'WhatsApp', type: 'tel', required, placeholder: '+258 8X XXX XXXX', autoComplete: 'tel', half: true });

const TRACKS: TrackDef[] = [
  {
    id: 'projecto',
    label: 'Projecto',
    icon: <Briefcase className="w-4 h-4" aria-hidden="true" />,
    title: 'Conte-nos o que pretende construir.',
    intro: 'Quanto mais detalhe nos der, mais precisa será a nossa proposta.',
    fields: [
      NAME,
      { name: 'company', label: 'Empresa ou instituição', type: 'text', placeholder: 'Opcional', autoComplete: 'organization', half: true },
      EMAIL,
      PHONE(true),
      {
        name: 'solutionType',
        label: 'Tipo de solução',
        type: 'select',
        required: true,
        options: [
          ...SERVICES.filter((s) => s.id !== 'tech-education').map((s) => ({ value: s.title, label: s.title })),
          { value: 'Outro / ainda não sei', label: 'Outro / ainda não sei' },
        ],
      },
      { name: 'description', label: 'Descrição do projecto', type: 'textarea', required: true, placeholder: 'Que problema quer resolver? Para quem é? Que funcionalidades imagina?' },
      {
        name: 'deadline',
        label: 'Prazo pretendido',
        type: 'select',
        half: true,
        options: [
          { value: 'O mais breve possível', label: 'O mais breve possível' },
          { value: '1 a 3 meses', label: '1 a 3 meses' },
          { value: '3 a 6 meses', label: '3 a 6 meses' },
          { value: 'Ainda sem prazo definido', label: 'Ainda sem prazo definido' },
        ],
      },
      { name: 'budget', label: 'Orçamento estimado', type: 'text', placeholder: 'Opcional, ex.: 50.000 MZN', half: true, hint: 'Ajuda-nos a propor a solução adequada ao seu investimento.' },
    ],
    submitLabel: 'Enviar os detalhes do projecto',
    note: 'Anexos (logótipos, documentos, exemplos) podem ser enviados directamente na conversa de WhatsApp que se abre a seguir.',
  },
  {
    id: 'curso',
    label: 'Curso',
    icon: <GraduationCap className="w-4 h-4" aria-hidden="true" />,
    title: 'Inscreva-se num curso.',
    intro: 'Escolha o curso e diga-nos a sua disponibilidade. Confirmamos consigo a próxima turma pelo WhatsApp.',
    fields: [
      NAME,
      EMAIL,
      PHONE(true),
      {
        name: 'course',
        label: 'Curso',
        type: 'select',
        required: true,
        half: true,
        options: COURSES.map((c) => ({ value: c.title, label: `${c.title} · ${c.duration}` })),
      },
      {
        name: 'schedule',
        label: 'Horário preferido',
        type: 'select',
        options: [
          { value: 'Manhã', label: 'Manhã' },
          { value: 'Tarde', label: 'Tarde' },
          { value: 'Noite', label: 'Noite' },
          { value: 'Fim-de-semana', label: 'Fim-de-semana' },
          { value: 'Sem preferência', label: 'Sem preferência' },
        ],
      },
      { name: 'message', label: 'Mensagem', type: 'textarea', placeholder: 'Opcional: experiência anterior, dúvidas ou objectivos.' },
    ],
    submitLabel: 'Iniciar a minha inscrição',
  },
  {
    id: 'parceria',
    label: 'Parceria',
    icon: <Handshake className="w-4 h-4" aria-hidden="true" />,
    title: 'Vamos construir algo em conjunto.',
    intro: 'Para empresas, instituições de ensino, organizações e programas que queiram colaborar com a Learn Code.',
    fields: [
      NAME,
      { name: 'organization', label: 'Organização', type: 'text', required: true, placeholder: 'Nome da empresa ou instituição', autoComplete: 'organization', half: true },
      EMAIL,
      PHONE(true),
      {
        name: 'partnershipType',
        label: 'Tipo de parceria',
        type: 'select',
        required: true,
        options: [
          { value: 'Parceria tecnológica ou de produto', label: 'Parceria tecnológica ou de produto' },
          { value: 'Formação para equipas ou instituições', label: 'Formação para equipas ou instituições' },
          { value: 'Projecto social ou comunitário', label: 'Projecto social ou comunitário' },
          { value: 'Outra', label: 'Outra' },
        ],
      },
      { name: 'description', label: 'Descrição da proposta', type: 'textarea', required: true, placeholder: 'O que propõe e como imagina a colaboração?' },
    ],
    submitLabel: 'Propor uma parceria',
  },
  {
    id: 'geral',
    label: 'Geral',
    icon: <HelpCircle className="w-4 h-4" aria-hidden="true" />,
    title: 'Fale com a Learn Code.',
    intro: 'Para dúvidas, pedidos de informação ou qualquer assunto que não se enquadre nas opções anteriores.',
    fields: [
      NAME,
      EMAIL,
      PHONE(false),
      { name: 'subject', label: 'Assunto', type: 'text', placeholder: 'Opcional', half: true },
      { name: 'message', label: 'Mensagem', type: 'textarea', required: true, placeholder: 'Escreva a sua mensagem.' },
    ],
    submitLabel: 'Enviar mensagem',
  },
];

const isTrack = (value: string | null): value is Track => TRACKS.some((t) => t.id === value);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const ContactSection: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tipoParam = searchParams.get('tipo');
  const track: Track = isTrack(tipoParam) ? tipoParam : 'geral';
  const trackDef = TRACKS.find((t) => t.id === track)!;
  const subjectParam = searchParams.get('assunto') ?? '';
  const cursoParam = searchParams.get('curso') ?? '';

  const formId = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<'form' | 'ready'>('form');
  const [preparedMessage, setPreparedMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const mountedAt = useRef(Date.now());
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Pré-preenchimento a partir da URL (serviço escolhido, curso escolhido).
  useEffect(() => {
    const initial: Record<string, string> = {};
    if (track === 'projecto' && subjectParam && SERVICES.some((s) => s.title === subjectParam)) initial.solutionType = subjectParam;
    if (track === 'curso' && cursoParam) {
      const course = COURSES.find((c) => c.id === cursoParam);
      if (course) initial.course = course.title;
    }
    setValues(initial);
    setErrors({});
    setFormError(null);
    setPhase('form');
  }, [track, subjectParam, cursoParam]);

  const selectTrack = (id: Track) => {
    const next = new URLSearchParams(searchParams);
    next.set('tipo', id);
    next.delete('assunto');
    next.delete('curso');
    setSearchParams(next, { replace: true });
  };

  const clearSubject = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('assunto');
    setSearchParams(next, { replace: true });
  };

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};
    for (const field of trackDef.fields) {
      const value = (values[field.name] ?? '').trim();
      if (field.required && !value) {
        next[field.name] = field.type === 'select' ? `Seleccione ${field.label.toLowerCase()}.` : `Indique ${field.label.toLowerCase()}.`;
        continue;
      }
      if (!value) continue;
      if (field.type === 'email' && !EMAIL_RE.test(value)) next[field.name] = 'O email não parece válido.';
      if (field.type === 'tel' && value.replace(/\D/g, '').length < 9) next[field.name] = 'Indique um número com pelo menos 9 dígitos.';
    }
    return next;
  };

  const buildMessage = (): string => {
    const lines = [`Olá Learn Code! Mensagem enviada pelo site (${trackDef.label}).`];
    if (subjectParam) lines.push(`*Assunto:* ${subjectParam}`);
    for (const field of trackDef.fields) {
      const value = (values[field.name] ?? '').trim();
      if (value) lines.push(`*${field.label}:* ${value}`);
    }
    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    // Protecção básica: campo armadilha e submissões demasiado rápidas.
    const honeypot = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value;
    if (honeypot || Date.now() - mountedAt.current < 3000) {
      setFormError('Não foi possível preparar a mensagem. Verifique os dados e tente novamente.');
      return;
    }

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const first = trackDef.fields.find((f) => nextErrors[f.name]);
      if (first) document.getElementById(`${formId}-${first.name}`)?.focus();
      return;
    }

    const text = buildMessage();
    setPreparedMessage(text);
    window.open(whatsappHref(text), '_blank', 'noopener,noreferrer');
    setPhase('ready');
    setTimeout(() => headingRef.current?.focus(), 50);
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setFormError('Não foi possível copiar automaticamente. Seleccione o texto abaixo e copie manualmente.');
    }
  };

  const emailSubject = useMemo(
    () => `${trackDef.label} · ${subjectParam || values.course || values.solutionType || values.subject || 'Contacto pelo site'}`,
    [trackDef.label, subjectParam, values.course, values.solutionType, values.subject]
  );

  return (
    <section id="contacto" className={`${section} bg-white dark:bg-slate-950 text-slate-900 dark:text-white`}>
      <div className={container}>
        <SectionHeader
          as="h1"
          icon={<Mail className="w-3.5 h-3.5" aria-hidden="true" />}
          eyebrowText="Contacto"
          title={<>Fale directamente com a <Accent>equipa da Learn Code.</Accent></>}
          lead="Escolha o percurso que corresponde ao que precisa. As mensagens chegam-nos pelo WhatsApp e respondemos por esse canal."
        />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Canais directos */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Canais directos</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Se preferir, contacte-nos directamente pelo canal mais conveniente.</p>
            </div>

            <ul className="space-y-3">
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`${card} p-4 sm:p-5 hover:border-emerald-500 transition-colors flex items-center gap-4 group`}>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
                    <Phone className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">WhatsApp</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{COMPANY_INFO.whatsappFormatted}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">O canal mais rápido para falar connosco.</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY_INFO.email}`} className={`${card} p-4 sm:p-5 hover:border-blue-500 transition-colors flex items-center gap-4 group`}>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 shrink-0">
                    <Mail className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Email</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors break-all">{COMPANY_INFO.email}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Para propostas formais e documentos.</p>
                  </div>
                </a>
              </li>
              <li className={`${card} p-4 sm:p-5 flex items-center gap-4`}>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                  <MapPin className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Localização</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">{COMPANY_INFO.address}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Reuniões presenciais mediante marcação.</p>
                </div>
              </li>
            </ul>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Siga a Learn Code</p>
              <div className="flex items-center gap-3">
                <a href={COMPANY_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Learn Code no Facebook" className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-700 transition-colors">
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href={COMPANY_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Learn Code no Instagram" className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-pink-500 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-pink-700 transition-colors">
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>

          {/* Formulário por percurso */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Escolher o tipo de pedido">
              {TRACKS.map((t) => {
                const active = t.id === track;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectTrack(t.id)}
                    className={`min-h-11 px-3 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      active
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-1">
              <h2 ref={headingRef} tabIndex={-1} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {phase === 'ready' ? 'Mensagem pronta para enviar' : trackDef.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {phase === 'ready'
                  ? 'Abrimos o WhatsApp numa nova janela com os seus dados. O envio só fica concluído quando confirmar na aplicação do WhatsApp.'
                  : trackDef.intro}
              </p>
            </div>

            {subjectParam && phase === 'form' && (
              <div className="mt-4 inline-flex items-center gap-2 pl-3 pr-1 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-sm">
                <span><span className="font-semibold">Assunto:</span> {subjectParam}</span>
                <button type="button" onClick={clearSubject} className="w-7 h-7 inline-flex items-center justify-center rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer" aria-label="Remover assunto">
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}

            {phase === 'ready' ? (
              <div className="mt-6 space-y-5">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={whatsappHref(preparedMessage)} target="_blank" rel="noopener noreferrer" className={`${btnWhatsApp} flex-1`}>
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>Abrir no WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <a href={mailtoHref(emailSubject, preparedMessage.replace(/\*/g, ''))} className={`${btnSecondary} flex-1`}>
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Enviar por email</span>
                  </a>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">A sua mensagem</p>
                    <button type="button" onClick={copyMessage} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 dark:text-blue-300 hover:underline cursor-pointer min-h-11 px-1">
                      {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                      <span>{copied ? 'Copiado' : 'Copiar mensagem'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-sans">{preparedMessage.replace(/\*/g, '')}</pre>
                </div>
                {formError && <p role="alert" className="text-sm text-rose-700 dark:text-rose-400">{formError}</p>}
                <button type="button" onClick={() => { setPhase('form'); setValues({}); setErrors({}); }} className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer min-h-11">
                  Preencher outro pedido
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                {/* Campo armadilha para robôs: invisível e ignorado por leitores de ecrã. */}
                <div className="absolute w-px h-px overflow-hidden opacity-0 -z-10" aria-hidden="true">
                  <label htmlFor={`${formId}-website`}>Não preencher</label>
                  <input id={`${formId}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trackDef.fields.map((field) => {
                    const id = `${formId}-${field.name}`;
                    const errorId = `${id}-error`;
                    const hintId = `${id}-hint`;
                    const error = errors[field.name];
                    const describedBy = [error ? errorId : null, field.hint ? hintId : null].filter(Boolean).join(' ') || undefined;
                    const common = {
                      id,
                      name: field.name,
                      value: values[field.name] ?? '',
                      required: field.required,
                      'aria-required': field.required || undefined,
                      'aria-invalid': error ? true : undefined,
                      'aria-describedby': describedBy,
                      className: inputClass,
                    };
                    return (
                      <div key={field.name} className={`space-y-1.5 ${field.half ? '' : 'sm:col-span-2'}`}>
                        <label htmlFor={id} className={labelClass}>
                          {field.label}
                          {field.required ? <span className="text-rose-600" aria-hidden="true"> *</span> : <span className="text-slate-400 font-normal"> (opcional)</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea {...common} rows={5} placeholder={field.placeholder} onChange={(e) => handleChange(field.name, e.target.value)} className={`${inputClass} resize-y`} />
                        ) : field.type === 'select' ? (
                          <select {...common} onChange={(e) => handleChange(field.name, e.target.value)}>
                            <option value="">Seleccione…</option>
                            {field.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            {...common}
                            type={field.type}
                            placeholder={field.placeholder}
                            autoComplete={field.autoComplete}
                            inputMode={field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : undefined}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                          />
                        )}
                        {field.hint && !error && <p id={hintId} className="text-xs text-slate-500 dark:text-slate-400">{field.hint}</p>}
                        {error && (
                          <p id={errorId} className="text-sm text-rose-700 dark:text-rose-400 font-medium flex items-center gap-1">
                            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                            {error}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {trackDef.note && <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{trackDef.note}</p>}
                {formError && <p role="alert" className="text-sm text-rose-700 dark:text-rose-400 font-medium">{formError}</p>}

                <div className="pt-1 space-y-2">
                  <button type="submit" className={`${btnPrimary} w-full`}>
                    <span>{trackDef.submitLabel}</span>
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                    Ao continuar, a sua mensagem abre no WhatsApp da Learn Code ({COMPANY_INFO.whatsappFormatted}). Os dados servem apenas para responder ao seu pedido.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
