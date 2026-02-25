import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'motion/react';
import { User, HeartHandshake } from 'lucide-react';

export const Legacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="legacy" className="py-24 bg-snow-white text-slate-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-mountain-blue mb-4 tracking-tight">
            {t.legacy.title}
          </h2>
          <div className="w-24 h-1 bg-safety-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Side: Experience & Owner */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="w-16 h-16 bg-mountain-blue/10 rounded-2xl flex items-center justify-center mb-6">
              <User className="text-mountain-blue w-8 h-8" />
            </div>
            <h3 className="text-3xl font-display font-semibold text-mountain-blue">
              {t.legacy.experienceTitle}
            </h3>
            <p className="text-lg leading-relaxed text-slate-gray/80">
              {t.legacy.experienceText}
            </p>
            
            {/* Owner Image */}
            <div className="relative h-80 mt-8 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://assets.cdn.filesafe.space/iNNiZuenpqXYxyCSZaNX/media/699ea3b12837e86d0d70e82c.webp"
                alt="Owner in ski jacket" 
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.src = '/images/legacy/owner.svg';
                }}
              />
            </div>
          </motion.div>

          {/* Right Side: Social Mission */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="w-16 h-16 bg-safety-orange/10 rounded-2xl flex items-center justify-center mb-6">
              <HeartHandshake className="text-safety-orange w-8 h-8" />
            </div>
            <h3 className="text-3xl font-display font-semibold text-mountain-blue">
              {t.legacy.missionTitle}
            </h3>
            <p className="text-lg leading-relaxed text-slate-gray/80">
              {t.legacy.missionText}
            </p>
            
            {/* Decorative Image */}
            <div className="relative h-80 mt-8 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://assets.cdn.filesafe.space/iNNiZuenpqXYxyCSZaNX/media/699ea6cc1001a535c36f5fa3.webp"
                alt="Children learning to ski" 
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/legacy/children.svg';
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
