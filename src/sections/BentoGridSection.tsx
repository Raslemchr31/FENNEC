import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  Bot,
  Eye,
  TrendingUp,
  Shield,
  Database,
  Server,
  ArrowUpRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BentoGridSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const capabilities = [
    {
      icon: Bot,
      title: 'Agents autonomes',
      description: 'Automatisation de workflows métier avec mémoire et outils.',
      size: 'large',
    },
    {
      icon: Eye,
      title: 'Vision & documents',
      description: 'Extraction, classification et validation de documents.',
      size: 'small',
    },
    {
      icon: TrendingUp,
      title: 'Analyse prédictive',
      description: 'Forecasting, maintenance prédictive, scoring.',
      size: 'small',
    },
    {
      icon: Shield,
      title: 'Gouvernance IA',
      description: 'Observabilité, conformité, traçabilité des décisions.',
      size: 'small',
    },
    {
      icon: Database,
      title: 'Intégration ERP/SIRH',
      description: 'Connecteurs sécurisés pour vos systèmes existants.',
      size: 'small',
    },
    {
      icon: Server,
      title: 'Infra souveraine',
      description: 'Hébergement et modèles conformes à la législation locale.',
      size: 'large',
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.4,
          },
        }
      );

      // Cards staggered animation
      gsap.fromTo(
        '.bento-card-v2',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.bento-grid-v2',
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[#0A0A0B] py-24 lg:py-32"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <span className="eyebrow-v2 block mb-4">CE QUE NOUS CONSTRUISONS</span>
          <h2 className="text-[clamp(32px,4.2vw,64px)] font-bold text-[#F5F5F5] uppercase leading-[0.95]">
            CAPACITÉS <span className="text-[#C5A059]">CLÉS</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid-v2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            const isLarge = cap.size === 'large';

            return (
              <motion.div
                key={cap.title}
                className={`bento-card-v2 group liquid-glass p-6 lg:p-8 cursor-pointer ${
                  isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ minHeight: '220px' }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#C5A059]/10 flex items-center justify-center mb-4 group-hover:bg-[#C5A059]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#C5A059]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-bold text-[#F5F5F5] mb-2 font-['Kode_Mono']">
                    {cap.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#9CA3AF] leading-relaxed flex-grow">
                    {cap.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center gap-2 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm">En savoir plus</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Index number */}
                <div className="absolute top-4 right-4 text-xs text-[#9CA3AF]/30 font-mono">
                  0{index + 1}
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 rounded-[20px] shadow-[inset_0_0_40px_rgba(197,160,89,0.1)]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C5A059]/3 to-transparent pointer-events-none" />
    </section>
  );
};

export default BentoGridSection;
