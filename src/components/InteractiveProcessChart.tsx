import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Code2, Rocket, Users, ArrowRight } from 'lucide-react';

interface ProcessStep {
  percentage: number;
  title: string;
  description: string;
  tooltip: string;
  icon: React.ElementType;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    percentage: 10,
    title: 'Stratégie & Cadrage',
    description: 'Compréhension du métier, identification des use cases',
    tooltip: 'Nous cartographions vos processus pour trouver les opportunités à fort ROI.',
    icon: Lightbulb,
    color: '#C5A059',
  },
  {
    percentage: 20,
    title: 'Prototype & Validation',
    description: 'POC rapide, tests avec données réelles',
    tooltip: 'Un prototype fonctionnel en 2-4 semaines pour valider l\'approche.',
    icon: Code2,
    color: '#C5A059',
  },
  {
    percentage: 70,
    title: 'Déploiement & Adoption',
    description: 'Intégration, formation, monitoring',
    tooltip: 'Le secret des leaders : Nous transformons vos équipes, pas seulement vos serveurs.',
    icon: Rocket,
    color: '#00EAD3',
  },
];

const InteractiveProcessChart = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(2); // Default to 70% (most important)

  const totalPercentage = processSteps.reduce((acc, step) => acc + step.percentage, 0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Chart container */}
      <div className="relative">
        {/* Horizontal segmented bar */}
        <div className="flex h-16 lg:h-20 rounded-2xl overflow-hidden liquid-glass">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredStep === index;
            const isActive = activeStep === index;
            
            return (
              <motion.div
                key={index}
                className="relative flex items-center justify-center cursor-pointer overflow-hidden"
                style={{ 
                  width: `${(step.percentage / totalPercentage) * 100}%`,
                }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => setActiveStep(index)}
                animate={{
                  flex: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {/* Background gradient */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}20 0%, ${step.color}10 100%)`,
                  }}
                  animate={{
                    opacity: isHovered || isActive ? 1 : 0.6,
                  }}
                />
                
                {/* Border */}
                {index < processSteps.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />
                )}
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <motion.div
                    animate={{ scale: isHovered ? 1.2 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon 
                      className="w-5 h-5 lg:w-6 lg:h-6" 
                      style={{ color: step.color }}
                    />
                  </motion.div>
                  <span 
                    className="text-lg lg:text-2xl font-bold font-['Kode_Mono']"
                    style={{ color: step.color }}
                  >
                    {step.percentage}%
                  </span>
                </div>
                
                {/* Glow effect on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                      style={{
                        boxShadow: `inset 0 0 40px ${step.color}30`,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        
        {/* Tooltip */}
        <AnimatePresence mode="wait">
          {hoveredStep !== null && (
            <motion.div
              key={hoveredStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-20"
            >
              <div className="tooltip-v2 max-w-xs text-center">
                <p className="text-sm text-[#F5F5F5]">
                  {processSteps[hoveredStep].tooltip}
                </p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-[#111113] border-r border-b border-[#C5A059]/30" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Step details */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;
          
          return (
            <motion.button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`liquid-glass p-5 text-left transition-all duration-300 ${
                isActive ? 'ring-1 ring-[#C5A059]/50' : ''
              }`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${step.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: step.color }} />
                </div>
                <span 
                  className="text-2xl font-bold font-['Kode_Mono']"
                  style={{ color: step.color }}
                >
                  {step.percentage}%
                </span>
              </div>
              <h4 className="text-base font-semibold text-[#F5F5F5] mb-1">
                {step.title}
              </h4>
              <p className="text-sm text-[#9CA3AF]">
                {step.description}
              </p>
              
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-white/10"
                >
                  <p className="text-sm text-[#00EAD3] italic">
                    "{step.tooltip}"
                  </p>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Team emphasis for 70% */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: activeStep === 2 ? 1 : 0.5 }}
        className="mt-6 flex items-center justify-center gap-4"
      >
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C5A059] to-[#00EAD3] border-2 border-[#0A0A0B] flex items-center justify-center"
            >
              <Users className="w-4 h-4 text-[#0A0A0B]" />
            </div>
          ))}
        </div>
        <span className="text-sm text-[#9CA3AF]">
          Une équipe dédiée à votre transformation
        </span>
        <ArrowRight className="w-4 h-4 text-[#C5A059]" />
      </motion.div>
    </div>
  );
};

export default InteractiveProcessChart;
