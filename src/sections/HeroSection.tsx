import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { SplineMonolith } from '../components';

interface HeroSectionProps {
  isRTL?: boolean;
}

const HeroSection = ({ isRTL = false }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0A0A0B] flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B] via-[#0d0d0f] to-[#0A0A0B]" />
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,11,0.5)_100%)]" />

      {/* Content container */}
      <div className="relative w-full px-6 lg:px-[7vw] py-24 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          
          {/* Left side - Text content */}
          <div className={`w-full lg:w-[55%] ${isRTL ? 'lg:order-2' : ''}`}>
            {/* Eyebrow */}
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-8 h-[2px] bg-[#C5A059]" />
              <span className="eyebrow-v2">AGENCE IA SOUVERAINE</span>
            </motion.div>

            {/* Headline */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-[clamp(36px,6vw,84px)] font-bold uppercase leading-[0.92] tracking-tight font-['Kode_Mono'] text-[#F5F5F5]">
                <span className="block">L'IA INDUSTRIELLE</span>
                <span className="block mt-2">
                  CONÇUE <span className="text-[#C5A059]">LOCALEMENT</span>
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p 
              className="text-[clamp(14px,1.2vw,18px)] text-[#9CA3AF] leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Fennec AI accompagne les entreprises algériennes dans la conception, 
              le déploiement et la gouvernance de solutions d'intelligence artificielle 
              conformes à la souveraineté des données.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <a href="#services" className="btn-primary-v2 flex items-center gap-2 group">
                Explorer nos services
                <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
              </a>
              <a href="#contact" className="btn-secondary-v2 flex items-center gap-2 group">
                Nous contacter
                <ChevronRight className={`w-4 h-4 transition-transform ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="mt-12 flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {[
                { value: '50+', label: 'Projets déployés' },
                { value: '99.9%', label: 'Uptime garanti' },
                { value: '100%', label: 'Conforme Loi 18-07' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold text-[#C5A059] font-['Kode_Mono']">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side - 3D Monolith */}
          <motion.div 
            className={`w-full lg:w-[45%] h-[300px] lg:h-[500px] ${isRTL ? 'lg:order-1' : ''}`}
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <SplineMonolith isRTL={isRTL} />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className={`absolute bottom-8 ${isRTL ? 'right-[7vw]' : 'left-[7vw]'} hidden lg:block`}>
        <div className={`flex items-center gap-3 text-[#9CA3AF] ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-12 h-[1px] bg-[#C5A059]/50" />
          <span className="text-xs font-mono tracking-widest">ALGERIA · 2026</span>
        </div>
      </div>

      {/* Floating accent orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-[#00EAD3]/5 rounded-full blur-[80px] pointer-events-none" />
    </section>
  );
};

export default HeroSection;
