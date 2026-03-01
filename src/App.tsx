import { useEffect, useState } from 'react';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import AskActSection from './sections/AskActSection';
import BentoGridSection from './sections/BentoGridSection';
import SovereigntySection from './sections/SovereigntySection';
import SectorSection from './sections/SectorSection';
import ProcessSection from './sections/ProcessSection';
import ContactSection from './sections/ContactSection';
import { 
  CommandBar, 
  WhatsAppButton, 
  QuerySidebar,
  TrustBar 
} from './components';
import './App.css';

function App() {
  const [language, setLanguage] = useState<'FR' | 'AR'>('FR');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarQuery, setSidebarQuery] = useState('');

  // Handle RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr';
  }, [language]);

  const handleQuerySubmit = (query: string) => {
    console.log('Query submitted:', query);
  };

  const handleComplexQuery = (query: string) => {
    setSidebarQuery(query);
    setIsSidebarOpen(true);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'FR' ? 'AR' : 'FR');
  };

  return (
    <div 
      className="relative bg-[#0A0A0B] min-h-screen"
      dir={language === 'AR' ? 'rtl' : 'ltr'}
    >
      {/* Noise overlay V2 */}
      <div className="noise-overlay-v2" />
      
      {/* Navigation */}
      <Navigation 
        language={language} 
        onLanguageToggle={toggleLanguage} 
      />
      
      {/* Main content */}
      <main className="relative pb-32">
        {/* Section 1: Hero */}
        <HeroSection isRTL={language === 'AR'} />
        
        {/* Section 2: Ask & Act */}
        <AskActSection />
        
        {/* Section 3: Bento Grid */}
        <BentoGridSection />
        
        {/* Section 4: Data Sovereignty */}
        <SovereigntySection />
        
        {/* Section 5: Sector Focus */}
        <SectorSection />
        
        {/* Section 6: Process */}
        <ProcessSection />
        
        {/* Section 7: Contact */}
        <ContactSection />
        
        {/* Trust Bar in footer area */}
        <TrustBar />
      </main>
      
      {/* Floating Command Bar */}
      <CommandBar 
        onQuerySubmit={handleQuerySubmit}
        onComplexQuery={handleComplexQuery}
      />
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
      
      {/* Query Sidebar for complex queries */}
      <QuerySidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        initialQuery={sidebarQuery}
      />
    </div>
  );
}

export default App;
