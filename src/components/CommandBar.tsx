import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, ChevronRight } from 'lucide-react';

interface CommandBarProps {
  onQuerySubmit?: (query: string) => void;
  onComplexQuery?: (query: string) => void;
}

const CommandBar = ({ onQuerySubmit, onComplexQuery }: CommandBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const intentKeywords: Record<string, string[]> = {
    services: ['automatiser', 'workflow', 'agent', 'automation', 'processus'],
    sectors: ['hydrocarbure', 'pétrole', 'pharma', 'ecommerce', 'retail', 'logistique'],
    sovereignty: ['données', 'hébergement', 'sécurité', 'conformité', 'loi 18-07'],
    process: ['méthode', 'déploiement', 'approche', '10-20-70', 'équipe'],
    contact: ['contact', 'appel', 'réunion', 'devis', 'gratuit'],
  };

  const allSuggestions = [
    'Automatiser la saisie des factures',
    'Optimiser la logistique hydrocarbures',
    'Conformité Loi 18-07',
    'Déployer un agent IA',
    'Audit gratuit de mon infrastructure',
  ];

  useEffect(() => {
    if (query.length > 2) {
      const filtered = allSuggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.length > 0 ? filtered : allSuggestions.slice(0, 3));
      setShowSuggestions(true);
      
      // Detect intent and highlight sections (MX Design)
      detectIntent(query);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const detectIntent = (text: string) => {
    const lowerText = text.toLowerCase();
    
    for (const [section, keywords] of Object.entries(intentKeywords)) {
      if (keywords.some(kw => lowerText.includes(kw))) {
        // Highlight the relevant section
        document.querySelector(`#${section}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add visual highlight effect
        const sectionEl = document.querySelector(`#${section}`);
        if (sectionEl) {
          sectionEl.classList.add('ring-2', 'ring-[#C5A059]', 'ring-opacity-50');
          setTimeout(() => {
            sectionEl.classList.remove('ring-2', 'ring-[#C5A059]', 'ring-opacity-50');
          }, 2000);
        }
        break;
      }
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    onQuerySubmit?.(query);
    
    // Check if complex query (longer than 5 words)
    if (query.split(' ').length > 5) {
      onComplexQuery?.(query);
    }
    
    setQuery('');
    setShowSuggestions(false);
  };

  const clearQuery = () => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="fixed bottom-0 left-0 right-0 z-[90] command-bar"
    >
      <div className="px-4 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Input container */}
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: isFocused 
                  ? '0 0 0 1px rgba(197, 160, 89, 0.5), 0 0 30px rgba(197, 160, 89, 0.15)' 
                  : '0 0 0 1px rgba(245, 245, 245, 0.08)',
              }}
              transition={{ duration: 0.2 }}
              className="liquid-glass-gold flex items-center gap-3 px-4 lg:px-6 py-3.5"
            >
              {/* Sparkle icon */}
              <Sparkles className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
              
              {/* Input field */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Dites-nous quel flux automatiser..."
                className="flex-1 bg-transparent text-[#F5F5F5] placeholder:text-[#9CA3AF] outline-none text-sm lg:text-base"
              />
              
              {/* Clear button */}
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={clearQuery}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4 text-[#9CA3AF]" />
                  </motion.button>
                )}
              </AnimatePresence>
              
              {/* Submit button */}
              <button
                onClick={() => handleSubmit()}
                disabled={!query.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A059] text-[#0A0A0B] font-medium text-sm hover:bg-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Envoyer</span>
              </button>
            </motion.div>
            
            {/* Suggestions dropdown */}
            <AnimatePresence>
              {showSuggestions && isFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-0 right-0 mb-2 liquid-glass overflow-hidden"
                >
                  <div className="p-2">
                    <p className="text-xs text-[#9CA3AF] px-3 py-2 uppercase tracking-wider">
                      Suggestions
                    </p>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(suggestion);
                          inputRef.current?.focus();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-[#F5F5F5] hover:bg-white/5 transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#C5A059] transition-colors" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Helper text */}
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-[#9CA3AF]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00EAD3]" />
              Agent Fennec AI actif
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Réponse sous 60 secondes</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommandBar;
