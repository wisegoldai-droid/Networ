import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'motion/react';
import { Globe2, ArrowRight } from 'lucide-react';

export const PartnershipCTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="partnership" className="py-24 relative overflow-hidden bg-mountain-blue">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 md:p-16 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-safety-orange rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-safety-orange/30">
            <Globe2 className="text-white w-10 h-10" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-snow-white mb-6 tracking-tight">
            {t.partnership.title}
          </h2>
          
          <div className="text-lg md:text-xl text-snow-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light whitespace-pre-line text-left md:text-center">
            {t.partnership.description}
          </div>
          
          <a 
            href="#contact"
            className="inline-flex items-center space-x-2 bg-snow-white text-mountain-blue hover:bg-gray-100 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 uppercase tracking-wider text-sm group"
          >
            <span>{t.partnership.cta}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
