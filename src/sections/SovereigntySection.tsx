import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck, Server, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SovereigntySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text column animation
      gsap.fromTo(
        textRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );

      // Badge animation
      gsap.fromTo(
        badgeRef.current,
        { x: '6vw', scale: 0.96, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'top 35%',
            scrub: 0.4,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Server, text: 'Hébergement certifié' },
    { icon: Lock, text: 'Chiffrement end-to-end' },
    { icon: FileCheck, text: 'Auditabilité complète' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0B] py-24 lg:py-32 overflow-hidden"
    >
      <div className="px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left column - Text */}
          <div ref={textRef} className="w-full lg:w-[52%] lg:pr-[6vw]">
            <span className="eyebrow-v2 block mb-4">SOUVERAINETÉ DES DONNÉES</span>
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold text-[#F5F5F5] uppercase leading-[0.95] mb-6">
              VOS DONNÉES <span className="text-[#C5A059]">RESTENT</span><br />
              À DOMICILE
            </h2>
            <p className="text-[#9CA3AF] leading-relaxed mb-8 max-w-xl">
              Fennec AI s'appuie sur une infrastructure hébergée en Algérie et sur 
              des modèles conformes à la législation locale. Pas de fuite, pas de 
              dépendance externe.
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.text}
                    className="flex items-center gap-3 text-[#F5F5F5]"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#C5A059]" />
                    </div>
                    <span className="text-sm">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right column - Badge */}
          <div className="w-full lg:w-[48%] relative">
            {/* Compliance badge */}
            <div
              ref={badgeRef}
              className="liquid-glass-gold p-8 lg:p-10 relative"
            >
              {/* Shield icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#00EAD3] flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-[#0A0A0B]" />
              </div>

              <div className="pt-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[clamp(48px,6vw,80px)] font-bold text-[#C5A059] font-['Kode_Mono'] leading-none">
                    LOI
                  </span>
                  <span className="text-[clamp(36px,4vw,56px)] font-bold text-[#F5F5F5] font-['Kode_Mono']">
                    18-07
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#00EAD3] animate-pulse" />
                  <span className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wide">
                    CONFORME
                  </span>
                </div>
                <p className="text-sm text-[#9CA3AF]">
                  Protection des données personnelles  
                  <br />
                  Hébergement sur infrastructure locale (Tedyen Cloud)
                </p>
              </div>

              {/* Checklist */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                {[
                  'Données stockées en Algérie',
                  'Aucun transfert international',
                  'Modèles IA locaux disponibles',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <Check className="w-4 h-4 text-[#00EAD3]" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-4 right-4 text-[#C5A059]/20">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path
                    d="M0 60V40C0 17.9086 17.9086 0 40 0H60"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </div>

            {/* Additional info card */}
            <motion.div 
              className="mt-4 liquid-glass p-4 flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#C5A059]/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F5F5F5]">Infrastructure locale</p>
                <p className="text-xs text-[#9CA3AF]">Datacenters certifiés en Algérie</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#111113] to-transparent pointer-events-none" />
    </section>
  );
};

export default SovereigntySection;
