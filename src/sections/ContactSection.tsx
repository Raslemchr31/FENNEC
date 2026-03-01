import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Merci pour votre message ! Nous vous contacterons sous 48h.');
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/contact-bg.jpg"
          alt="Industrial background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0A0A0B]/72" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-24 lg:py-32">
        <div className="px-6 lg:px-[7vw]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Left column - Headline */}
            <motion.div 
              className="w-full lg:w-[46vw] text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[clamp(36px,5vw,72px)] font-bold text-[#F5F5F5] uppercase leading-[0.95] mb-6">
                TRAVAILLONS <span className="text-[#C5A059]">ENSEMBLE</span>
              </h2>
              <p className="text-[#9CA3AF] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Parlez-nous de votre projet. Nous vous répondrons sous 48h avec 
                une première feuille de route.
              </p>

              {/* Contact info */}
              <div className="space-y-4 mb-8">
                <motion.div 
                  className="flex items-center justify-center lg:justify-start gap-3 text-[#F5F5F5]"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#C5A059]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <span className="text-sm">hello@fennec.ai</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-center lg:justify-start gap-3 text-[#F5F5F5]"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#C5A059]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <span className="text-sm">+213 (0) XX XX XX XX</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-center lg:justify-start gap-3 text-[#F5F5F5]"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#C5A059]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <span className="text-sm">Alger, Algérie</span>
                </motion.div>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#C5A059]/20 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-[#9CA3AF] hover:text-[#C5A059]" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#C5A059]/20 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-[#9CA3AF] hover:text-[#C5A059]" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#00EAD3]/20 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[#9CA3AF] hover:text-[#00EAD3]" />
                </motion.a>
              </div>
            </motion.div>

            {/* Right column - Form */}
            <motion.div 
              className="w-full lg:w-[min(40vw,520px)]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="liquid-glass p-6 lg:p-8">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-6 font-['Kode_Mono']">
                  Envoyer une demande
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0A0A0B]/80 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#9CA3AF]/50 outline-none focus:border-[#C5A059]/50 transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0A0A0B]/80 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#9CA3AF]/50 outline-none focus:border-[#C5A059]/50 transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0B]/80 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#9CA3AF]/50 outline-none focus:border-[#C5A059]/50 transition-colors"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">
                      Besoin
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-[#0A0A0B]/80 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#9CA3AF]/50 outline-none focus:border-[#C5A059]/50 transition-colors resize-none"
                      placeholder="Décrivez votre projet..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary-v2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0A0A0B]/30 border-t-[#0A0A0B] rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer la demande
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 py-6 px-6 lg:px-[7vw] border-t border-white/5 bg-[#0A0A0B]/50 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9CA3AF]">
            © 2026 Fennec AI. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-xs text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
