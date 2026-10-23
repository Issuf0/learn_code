import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { whatsappHref } from '../config/site';

const DEFAULT_MESSAGE = 'Olá Learn Code! Gostaria de saber mais sobre os vossos serviços.';

/**
 * Botão flutuante que abre uma conversa de WhatsApp com a Learn Code.
 * Não é um assistente automático: a mensagem é enviada na aplicação do WhatsApp.
 */
export const WhatsAppWidget: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fecha ao mudar de página.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Foco no painel ao abrir; Escape fecha e devolve o foco ao botão.
  useEffect(() => {
    if (!isOpen) return;
    textareaRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // A página de contacto já oferece o WhatsApp; evita-se sobrepor o formulário.
  if (location.pathname.startsWith('/contacto')) return null;

  const href = whatsappHref(message.trim() || DEFAULT_MESSAGE);

  return (
    <div
      className="fixed right-4 z-40 flex flex-col items-end gap-3"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {isOpen && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Falar com a Learn Code no WhatsApp"
          className="w-[min(22rem,calc(100vw-2rem))] max-h-[calc(100dvh-7rem)] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl text-slate-900 dark:text-white animate-lc-slide-up"
        >
          <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold">Falar no WhatsApp</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{COMPANY_INFO.whatsappFormatted}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                toggleRef.current?.focus();
              }}
              className="w-10 h-10 inline-flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Escreva a sua mensagem. Ao continuar, a conversa abre na aplicação do WhatsApp e é respondida pela equipa da Learn Code.
            </p>
            <label htmlFor={`${panelId}-msg`} className="sr-only">Mensagem para a Learn Code</label>
            <textarea
              id={`${panelId}-msg`}
              ref={textareaRef}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-base sm:text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-500 resize-none"
            />
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full min-h-11 py-2.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span>Abrir no WhatsApp</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="w-14 h-14 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl shadow-emerald-700/30 transition-[background-color,transform] hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center justify-center animate-lc-pop"
        aria-label={isOpen ? 'Fechar conversa de WhatsApp' : 'Falar com a Learn Code no WhatsApp'}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
      >
        {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <MessageCircle className="w-7 h-7" aria-hidden="true" />}
      </button>
    </div>
  );
};
