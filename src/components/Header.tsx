import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = ['en', 'cz', 'sk', 'pl', 'de', 'fr'] as const;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.legacy, href: '#legacy' },
    { name: t.nav.partnership, href: '#partnership' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-mountain-blue/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex flex-col">
              <span className="text-xl md:text-2xl font-display font-bold text-snow-white tracking-tight leading-none">
                PAVEL <span className="text-safety-orange">NENTVICH</span>
              </span>
              <span className="text-xs text-snow-white/70 tracking-widest uppercase mt-1">Ski Rental & Service</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-snow-white/90 hover:text-safety-orange transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 text-snow-white/90 hover:text-safety-orange transition-colors"
              >
                <Globe size={18} />
                <span className="uppercase text-sm font-medium">{language}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm uppercase ${
                        language === lang ? 'bg-gray-100 text-mountain-blue font-bold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-snow-white hover:text-safety-orange focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-mountain-blue border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-snow-white hover:text-safety-orange hover:bg-white/5 uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="px-3 py-2 flex space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded text-sm uppercase ${
                    language === lang ? 'bg-safety-orange text-white' : 'text-snow-white/70 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
