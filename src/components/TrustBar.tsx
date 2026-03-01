import { motion } from 'framer-motion';
import { Server, ShieldCheck, Award, Lock } from 'lucide-react';

const trustItems = [
  {
    icon: Server,
    label: 'Hébergement Local',
    sublabel: 'Tedyen Cloud',
    color: '#C5A059',
  },
  {
    icon: ShieldCheck,
    label: 'Conformité',
    sublabel: 'Loi 18-07',
    color: '#00EAD3',
  },
  {
    icon: Award,
    label: 'Certifié',
    sublabel: 'Startup Label No. 2847',
    color: '#C5A059',
  },
];

const TrustBar = () => {
  return (
    <div className="w-full py-4 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="liquid-glass py-4 px-6"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Label */}
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-[#C5A059]" />
              <span className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                Souveraineté Fennece — Intégrité Garantie
              </span>
            </div>
            
            {/* Trust items */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {trustItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="trust-item cursor-default"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${item.color}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-medium text-[#F5F5F5]">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF]">
                        {item.sublabel}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBar;
