import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, ChevronRight, Bot, User, Loader2 } from 'lucide-react';

interface QuerySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery: string;
}

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

const QuerySidebar = ({ isOpen, onClose, initialQuery }: QuerySidebarProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with user query
  useEffect(() => {
    if (isOpen && initialQuery) {
      setMessages([
        {
          id: '1',
          type: 'user',
          content: initialQuery,
          timestamp: new Date(),
        },
      ]);
      
      // Simulate agent response
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: '2',
            type: 'agent',
            content: `Merci pour votre demande concernant "${initialQuery}". Je vais analyser vos besoins et vous proposer une solution adaptée. Pouvez-vous me donner plus de détails sur votre infrastructure actuelle ?`,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 1500);
    }
  }, [isOpen, initialQuery]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate agent response
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'agent',
          content: 'Je comprends. Basé sur vos besoins, je recommande une consultation avec l\'un de nos architectes IA. Souhaitez-vous planifier un appel cette semaine ?',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const suggestedResponses = [
    'Oui, je suis disponible mardi',
    'Parlez-moi de vos tarifs',
    'Avez-vous des références ?',
    'Je préfère un email d\'abord',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95]"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md query-sidebar z-[96] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#00EAD3] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#0A0A0B]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F5F5]">
                    Agent Fennec AI
                  </h3>
                  <p className="text-xs text-[#00EAD3]">En ligne</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div 
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-white/10' 
                        : 'bg-gradient-to-br from-[#C5A059] to-[#00EAD3]'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-[#9CA3AF]" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-[#0A0A0B]" />
                    )}
                  </div>
                  
                  {/* Message bubble */}
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.type === 'user'
                        ? 'bg-[#C5A059] text-[#0A0A0B] rounded-tr-sm'
                        : 'liquid-glass text-[#F5F5F5] rounded-tl-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C5A059] to-[#00EAD3] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#0A0A0B]" />
                  </div>
                  <div className="liquid-glass p-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Suggested responses */}
            {messages.length > 1 && !isTyping && (
              <div className="px-4 pb-2">
                <p className="text-xs text-[#9CA3AF] mb-2">Réponses suggérées</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedResponses.map((response, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(response);
                      }}
                      className="px-3 py-1.5 text-xs text-[#F5F5F5] bg-white/5 rounded-full hover:bg-white/10 transition-colors flex items-center gap-1"
                    >
                      {response}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2 liquid-glass p-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Votre réponse..."
                  className="flex-1 bg-transparent text-sm text-[#F5F5F5] placeholder:text-[#9CA3AF] outline-none px-2"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 rounded-lg bg-[#C5A059] text-[#0A0A0B] hover:bg-[#D4AF37] transition-colors disabled:opacity-50"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuerySidebar;
