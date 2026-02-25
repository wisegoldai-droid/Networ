import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <motion.div 
        initial={{ scale: 1.02, x: -20, y: -10 }}
        animate={{ scale: 1.12, x: 20, y: 10 }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/hero/hero-main.svg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-mountain-blue/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-mountain-blue/40 via-transparent to-mountain-blue"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-snow-white tracking-tighter mb-6 leading-tight"
        >
          {t.hero.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-snow-white/90 font-light mb-10 max-w-3xl mx-auto"
        >
          {t.hero.subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a 
            href="#services"
            className="inline-block bg-safety-orange hover:bg-safety-orange-hover text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg uppercase tracking-wider text-sm"
          >
            {t.hero.cta}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce"
      >
        <a href="#legacy" className="text-snow-white/70 hover:text-white">
          <ChevronDown size={32} />
        </a>
      </motion.div>
    </section>
  );
};
