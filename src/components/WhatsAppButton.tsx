import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton = ({ 
  phoneNumber = '+213XXXXXXXXX',
  message = 'Bonjour, je souhaite démarrer un audit IA gratuit pour mon entreprise.'
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ 
        delay: 1.5, 
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-4 lg:right-8 bottom-28 lg:bottom-32 z-[85] group"
    >
      <div className="liquid-glass-teal px-4 py-3 flex items-center gap-3 animate-pulse-glow">
        {/* WhatsApp icon */}
        <div className="w-10 h-10 rounded-full bg-[#00EAD3] flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-[#0A0A0B]" />
        </div>
        
        {/* Text */}
        <div className="text-left pr-2">
          <p className="text-sm font-semibold text-[#F5F5F5] whitespace-nowrap">
            Démarrer un Audit IA
          </p>
          <p className="text-xs text-[#00EAD3]">
            Gratuit
          </p>
        </div>
        
        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#00EAD3] group-hover:translate-x-1 transition-all" />
      </div>
      
      {/* Secondary pulse ring */}
      <div className="absolute inset-0 rounded-full border border-[#00EAD3]/30 animate-ping opacity-20" />
    </motion.button>
  );
};

export default WhatsAppButton;
