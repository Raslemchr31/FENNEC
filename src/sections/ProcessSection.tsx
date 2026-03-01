import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { InteractiveProcessChart } from '../components';

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 50%',
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
      id="process"
      className="relative bg-[#0A0A0B] py-24 lg:py-32"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16 text-center lg:text-left">
          <span className="eyebrow-v2 block mb-4">NOTRE MÉTHODE</span>
          <h2 className="text-[clamp(32px,4vw,56px)] font-bold text-[#F5F5F5] uppercase leading-[0.95]">
            PROCESSUS <span className="text-[#C5A059]">10·20·70</span>
          </h2>
          <p className="mt-4 text-[#9CA3AF] max-w-xl mx-auto lg:mx-0">
            Une méthode éprouvée pour livrer rapidement sans sacrifier la qualité. 
            Focus sur l'adoption et la valeur métier dès le premier jour.
          </p>
        </div>

        {/* Interactive Process Chart */}
        <InteractiveProcessChart />

        {/* Additional info */}
        <motion.div 
          className="mt-16 liquid-glass p-6 lg:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2">
                Pourquoi 70% sur le déploiement ?
              </h3>
              <p className="text-sm text-[#9CA3AF] max-w-2xl">
                Parce qu'une IA qui n'est pas adoptée par vos équipes est une IA qui 
                ne crée pas de valeur. Nous investissons massivement dans le changement 
                management, la formation et l'accompagnement au quotidien.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#00EAD3] font-['Kode_Mono']">2-4</p>
                <p className="text-xs text-[#9CA3AF]">semaines POC</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-[#C5A059] font-['Kode_Mono']">3-6</p>
                <p className="text-xs text-[#9CA3AF]">mois déploiement</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#00EAD3]/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default ProcessSection;
