import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

const EnterpriseThesisSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] bg-[#0A0A0B] flex items-center justify-center py-24 lg:py-32 overflow-hidden border-y border-white/5"
    >
      {/* Premium minimal background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.03)_0%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Left: The Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex-1 w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/5 mb-8">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C5A059]">Le Standard Enterprise</span>
            </div>

            <h2 className="text-[clamp(36px,4vw,60px)] font-bold text-white leading-[1.05] tracking-tight mb-8">
              L'IA n'est plus une expérimentation.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#D4AF37]">
                C'est l'infrastructure de demain.
              </span>
            </h2>

            <div className="space-y-6 text-[#9CA3AF] text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
              <p>
                Pour les leaders de l'industrie, l'enjeu n'est plus de tester des gadgets intelligents ou des outils isolés. Il s'agit de déployer des systèmes fiables, auditables et souverains à grande échelle.
              </p>
              <p>
                Fennec AI conçoit, intègre et opère des architectures d'Intelligence Artificielle sur-mesure pour les grands comptes et les institutions. Nous transformons vos données captives en avantages stratégiques indéniables, avec une sécurité de qualité militaire.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a href="#contact" className="btn-primary-v2 px-8 flex items-center gap-2 group">
                <span>Consulter un Architecte</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right: Abstract UI / Data visualization element */}
          <motion.div
            style={{ y }}
            className="flex-1 w-full relative max-w-[500px] lg:max-w-none mx-auto"
          >
            {/* The Monolith conceptual card */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] xl:aspect-square max-h-[600px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#111113] to-[#1A1A1D] rounded-[2rem] border border-white/5 shadow-2xl transform rotate-3 scale-105 transition-transform duration-700 hover:rotate-6" />
              <div className="absolute inset-0 liquid-glass-gold p-8 sm:p-10 flex flex-col justify-between transform -rotate-2 hover:-rotate-1 transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">

                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#C5A059]/10 flex items-center justify-center border border-[#C5A059]/20">
                    <Cpu className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-['Kode_Mono'] text-[#9CA3AF] mb-1">FENNEC_CORE_v2</span>
                    <span className="inline-block px-2 py-1 bg-[#00EAD3]/10 text-[#00EAD3] text-[10px] font-bold uppercase rounded-md tracking-wider">
                      Production Ready
                    </span>
                  </div>
                </div>

                <div className="space-y-8 mt-12">
                  {/* KPI 1 */}
                  <div className="group relative">
                    <div className="absolute -left-10 top-1/2 w-8 h-[1px] bg-[#C5A059]/30 -translate-y-1/2" />
                    <div className="border-l-2 border-[#C5A059] pl-6 py-1 transition-colors duration-300 group-hover:border-white">
                      <div className="text-3xl sm:text-4xl font-bold text-white font-['Kode_Mono'] mb-1">0 Silo</div>
                      <div className="text-sm sm:text-base text-[#9CA3AF]">Intégration Systémique directe (ERP/SIRH/CRM)</div>
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div className="group relative">
                    <div className="absolute -left-10 top-1/2 w-8 h-[1px] bg-[#00EAD3]/30 -translate-y-1/2" />
                    <div className="border-l-2 border-[#00EAD3] pl-6 py-1 transition-colors duration-300 group-hover:border-white">
                      <div className="text-3xl sm:text-4xl font-bold text-white font-['Kode_Mono'] mb-1">100%</div>
                      <div className="text-sm sm:text-base text-[#9CA3AF]">Souveraineté des Données (Hébergement Local)</div>
                    </div>
                  </div>

                  {/* KPI 3 */}
                  <div className="group relative">
                    <div className="absolute -left-10 top-1/2 w-8 h-[1px] bg-white/20 -translate-y-1/2" />
                    <div className="border-l-2 border-white/20 pl-6 py-1 transition-colors duration-300 group-hover:border-white">
                      <div className="text-3xl sm:text-4xl font-bold text-white font-['Kode_Mono'] mb-1">&lt; 8 Semaines</div>
                      <div className="text-sm sm:text-base text-[#9CA3AF]">Time-to-Production moyen pour le premier workflow</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Premium Glows */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C5A059]/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#00EAD3]/10 blur-[100px] rounded-full pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EnterpriseThesisSection;
