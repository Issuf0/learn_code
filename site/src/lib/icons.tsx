import React from 'react';
import { Globe, Smartphone, Monitor, Plug, Bot, Palette, GraduationCap, Layers, Car, BookOpen, PiggyBank, Leaf, Scale, Building2 } from 'lucide-react';

const ICONS: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>> = {
  Globe,
  Smartphone,
  Monitor,
  Plug,
  Bot,
  Palette,
  GraduationCap,
  Car,
  BookOpen,
  PiggyBank,
  Leaf,
  Scale,
  Building2,
};

/** Devolve o ícone lucide pelo nome guardado nos dados; Layers como alternativa. */
export const NamedIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-5 h-5' }) => {
  const Icon = ICONS[name] ?? Layers;
  return <Icon className={className} aria-hidden="true" />;
};
