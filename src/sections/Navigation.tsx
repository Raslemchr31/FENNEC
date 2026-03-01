import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  language: 'FR' | 'AR';
  onLanguageToggle: () => void;
}

const Navigation = ({ language, onLanguageToggle }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      label: language === 'FR' ? 'Services' : 'الخدمات',
      href: '#services',
      dropdown: [
        { label: language === 'FR' ? 'Agents autonomes' : 'وكلاء ذاتيون', href: '#agents' },
        { label: language === 'FR' ? 'Vision & documents' : 'الرؤية والمستندات', href: '#vision' },
        { label: language === 'FR' ? 'Analyse prédictive' : 'التحليل التنبؤي', href: '#analytics' },
      ],
    },
    {
      label: language === 'FR' ? 'Secteurs' : 'القطاعات',
      href: '#sectors',
      dropdown: [
        { label: language === 'FR' ? 'Hydrocarbures' : 'الهيدروكربونات', href: '#hydrocarbons' },
        { label: language === 'FR' ? 'Pharma & R&D' : 'الأدوية والبحث', href: '#pharma' },
        { label: language === 'FR' ? 'E-commerce' : 'التجارة الإلكترونية', href: '#ecommerce' },
      ],
    },
    {
      label: language === 'FR' ? 'Méthode' : 'المنهجية',
      href: '#process',
    },
    {
      label: language === 'FR' ? 'Contact' : 'اتصل',
      href: '#contact',
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
            ? 'bg-[#0A0A0B]/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
          }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <img
                src="/fennec-logo.png"
                alt="Fennec AI Logo"
                className="w-10 h-10 object-cover rounded-lg border border-white/10 group-hover:border-[#C5A059]/50 transition-colors"
              />
              <span className="text-xl lg:text-2xl font-bold text-[#F5F5F5] font-['Kode_Mono'] tracking-tight">
                Fennec<span className="text-[#C5A059]"> AI</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="flex items-center gap-1 text-sm text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors duration-300"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="w-3 h-3" />}
                  </a>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 liquid-glass py-2"
                      >
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-white/5 transition-colors"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Language toggle */}
              <button
                onClick={onLanguageToggle}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#C5A059]/50 transition-colors"
              >
                <Globe className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-sm text-[#F5F5F5] font-medium">{language}</span>
              </button>

              {/* Menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-[#F5F5F5] hover:text-[#C5A059] transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* CTA Button (desktop) */}
              <a
                href="#contact"
                className="hidden lg:inline-flex btn-primary-v2 text-sm"
              >
                {language === 'FR' ? 'Démarrer' : 'ابدأ'}
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#0A0A0B]/98 backdrop-blur-xl"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#0A0A0B] border-l border-white/10 p-6 pt-24"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block py-4 text-xl text-[#F5F5F5] hover:text-[#C5A059] transition-colors border-b border-white/10"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary-v2 w-full text-center block"
                >
                  {language === 'FR' ? 'Démarrer un projet' : 'ابدأ مشروعًا'}
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
