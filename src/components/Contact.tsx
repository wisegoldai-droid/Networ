import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, MessageCircle, Clock, CalendarDays, Moon } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-snow-white text-slate-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-mountain-blue mb-4 tracking-tight">
            {t.contact.title}
          </h2>
          <div className="w-24 h-1 bg-safety-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-mountain-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-mountain-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-mountain-blue mb-1">Location</h4>
                  <p className="text-slate-gray/80 leading-relaxed font-medium">{t.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-mountain-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-mountain-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-mountain-blue mb-1">Phone</h4>
                  <p className="text-slate-gray/80 leading-relaxed font-medium text-xl">{t.contact.phone}</p>
                  <p className="text-slate-gray/60 text-sm mt-1">{t.contact.phoneDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-mountain-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-mountain-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-mountain-blue mb-1">Email</h4>
                  <p className="text-slate-gray/80 leading-relaxed">{t.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-mountain-blue/5 p-6 rounded-2xl border border-mountain-blue/10">
                <div className="w-12 h-12 bg-safety-orange rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-safety-orange/30">
                  <CalendarDays className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-mountain-blue mb-2">{t.contact.hoursTitle}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-slate-gray/90 font-medium">
                      <Clock className="w-5 h-5 text-safety-orange" />
                      <span>{t.contact.hours}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-gray/90 font-medium bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                      <Moon className="w-5 h-5 text-mountain-blue" />
                      <span>{t.contact.eveningSkiing}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-4 pt-4">
              <a 
                href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                className="flex-1 bg-mountain-blue hover:bg-mountain-blue-dark text-white flex justify-center items-center space-x-2 py-3 rounded-xl transition-colors"
              >
                <Phone size={20} />
                <span className="font-medium">Call Us</span>
              </a>
              <a 
                href={`https://wa.me/${t.contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white flex justify-center items-center space-x-2 py-3 rounded-xl transition-colors"
              >
                <MessageCircle size={20} />
                <span className="font-medium">WhatsApp</span>
              </a>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-2xl overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 flex items-center justify-center text-slate-gray/50 font-medium z-10 bg-white/50 backdrop-blur-sm">
                Google Maps Integration
              </div>
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2948&auto=format&fit=crop" 
                alt="Map location" 
                className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 h-fit"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-gray mb-2">
                  {t.contact.form.name}
                </label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-safety-orange focus:border-transparent outline-none transition-all bg-snow-white"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-gray mb-2">
                  {t.contact.form.email}
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-safety-orange focus:border-transparent outline-none transition-all bg-snow-white"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-gray mb-2">
                  {t.contact.form.message}
                </label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-safety-orange focus:border-transparent outline-none transition-all bg-snow-white resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-safety-orange hover:bg-safety-orange-hover text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md uppercase tracking-wider text-sm"
              >
                {t.contact.form.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
