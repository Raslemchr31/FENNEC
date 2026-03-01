import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight, Droplets, Pill, ShoppingCart } from 'lucide-react';
import { SectorBlogCatalog } from '../components';

gsap.registerPlugin(ScrollTrigger);

const SectorSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const sectors = [
    {
      icon: Droplets,
      title: 'Hydrocarbures & Logistique',
      description: 'Optimisation des flux et maintenance prédictive.',
      image: '/sector-hydrocarbons.jpg',
    },
    {
      icon: Pill,
      title: 'Pharma & R&D',
      description: 'Accélération de la recherche et conformité réglementaire.',
      image: '/sector-pharma.jpg',
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce & Retail',
      description: 'Personnalisation, support client et prévision de la demande.',
      image: '/sector-ecommerce.jpg',
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
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

      // Cards staggered animation
      gsap.fromTo(
        '.sector-card-v2',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.sector-grid-v2',
            start: 'top 70%',
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
      id="sectors"
      className="relative bg-[#0A0A0B] py-24 lg:py-32"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16 max-w-[760px]">
          <span className="eyebrow-v2 block mb-4">SECTEURS</span>
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold text-[#F5F5F5] uppercase leading-[0.95]">
            SOLUTIONS CONÇUES <span className="text-[#C5A059]">POUR</span><br />
            L'ALGÉRIE
          </h2>
        </div>

        {/* Sector cards grid */}
        <div className="sector-grid-v2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.title}
                className="sector-card-v2 group relative h-[min(420px,52vh)] rounded-[20px] overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => { setSelectedSector(sector.title); setIsCatalogOpen(true); }}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#C5A059]/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-[#C5A059]/30 transition-colors">
                    <Icon className="w-6 h-6 text-[#C5A059]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-[#F5F5F5] mb-2 font-['Kode_Mono']">
                    {sector.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#9CA3AF] mb-4">
                    {sector.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-medium">Explorer</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-[20px] border border-[#C5A059]/0 group-hover:border-[#C5A059]/40 transition-colors duration-300 pointer-events-none" />

                {/* Index */}
                <div className="absolute top-4 right-4 text-xs text-[#9CA3AF]/30 font-mono">
                  0{index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      {/* Blog Catalog Modal */}
      <SectorBlogCatalog
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        sectorName={selectedSector}
      />
    </section>
  );
};

export default SectorSection;
