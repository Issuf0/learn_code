import React from 'react';
import { eyebrow } from '../../lib/ui';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  /** Nível semântico do título: h1 em páginas, h2 em secções da página inicial. */
  as?: 'h1' | 'h2';
  icon?: React.ReactNode;
  eyebrowText: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  as = 'h2',
  icon,
  eyebrowText,
  title,
  lead,
  align = 'center',
  className = '',
}) => {
  const Heading = as;
  return (
    <Reveal className={`${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-3xl space-y-4 ${className}`}>
      <div className={eyebrow}>
        {icon}
        <span>{eyebrowText}</span>
      </div>
      <Heading className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance">
        {title}
      </Heading>
      {lead && <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">{lead}</p>}
    </Reveal>
  );
};

/** Palavra ou expressão destacada na cor da marca dentro de um título. */
export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-blue-700 dark:text-blue-400">{children}</span>
);
