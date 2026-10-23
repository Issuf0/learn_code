import React, { useLayoutEffect, useRef, useState } from 'react';

type Tag = 'div' | 'section' | 'ul' | 'ol' | 'li' | 'p' | 'h1' | 'h2';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: Tag;
  /** Anima os filhos directos um após o outro (ver .lc-stagger em index.css). */
  stagger?: boolean;
  /** Atraso adicional em milissegundos. */
  delay?: number;
  children?: React.ReactNode;
}

type Phase = 'static' | 'hidden' | 'visible';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Revela o conteúdo com um fade + deslize suave quando entra no ecrã.
 * O que já está visível ao carregar a página aparece de imediato (nunca fica escondido),
 * e com movimento reduzido ou sem IntersectionObserver não há qualquer animação.
 */
export const Reveal: React.FC<RevealProps> = ({ as = 'div', stagger = false, delay = 0, className = '', style, children, ...rest }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>('static');

  // Decide antes da primeira pintura, para não haver "piscar".
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // já visível: fica estático

    setPhase('hidden');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPhase('visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const motionClass = phase === 'static' ? '' : `${stagger ? 'lc-stagger' : 'lc-reveal'}${phase === 'visible' ? ' is-visible' : ''}`;

  return React.createElement(
    as,
    {
      ref,
      className: `${motionClass} ${className}`.trim(),
      style: delay && phase !== 'static' ? { ...style, transitionDelay: `${delay}ms` } : style,
      ...rest,
    },
    children
  );
};
