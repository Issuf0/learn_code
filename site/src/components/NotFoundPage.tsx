import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MessageSquare, SearchX } from 'lucide-react';
import { btnPrimary, btnSecondary } from '../lib/ui';

export const NotFoundPage: React.FC = () => (
  <section className="min-h-[60vh] flex items-center justify-center px-4 py-16">
    <div className="max-w-md w-full text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-500 flex items-center justify-center mx-auto">
        <SearchX className="w-10 h-10" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <p className="text-6xl font-black text-slate-200 dark:text-slate-800" aria-hidden="true">404</p>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Página não encontrada</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          O endereço que procurou não existe ou foi movido. Verifique a ligação ou volte à página inicial.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to="/" className={`${btnPrimary} w-full sm:w-auto`}>
          <Home className="w-4 h-4" aria-hidden="true" />
          <span>Voltar ao início</span>
        </Link>
        <Link to="/contacto" className={`${btnSecondary} w-full sm:w-auto`}>
          <MessageSquare className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          <span>Falar com a Learn Code</span>
        </Link>
      </div>
    </div>
  </section>
);
