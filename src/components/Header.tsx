import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Menu, X } from 'lucide-react';

const languages = ['en', 'cz', 'sk', 'pl', 'de', 'fr'] as const;

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languageMeta: Record<(typeof languages)[number], { label: string; flagStyle: React.CSSProperties }> = {
    en: { label: 'EN', flagStyle: { background: 'linear-gradient(90deg,#1f3f8f 0 33%,#ffffff 33% 66%,#d3202a 66% 100%)' } },
    cz: {
      label: 'CZ',
      flagStyle: {
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='3' height='1' fill='%23ffffff'/%3E%3Crect y='1' width='3' height='1' fill='%23d7141a'/%3E%3Cpolygon points='0,0 1.3,1 0,2' fill='%2311457e'/%3E%3C/svg%3E\")",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      },
    },
    sk: {
      label: 'SK',
      flagStyle: {
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='3' height='0.6667' y='0' fill='%23ffffff'/%3E%3Crect width='3' height='0.6667' y='0.6667' fill='%230b4ea2'/%3E%3Crect width='3' height='0.6667' y='1.3333' fill='%23ee1c25'/%3E%3Cpath d='M1 0.5 h0.7 a0.15 0.15 0 0 1 0.15 0.15 v0.45 a0.5 0.5 0 0 1-0.5 0.45 h0 a0.5 0.5 0 0 1-0.5-0.45 v-0.45 a0.15 0.15 0 0 1 0.15-0.15z' fill='%23ffffff' stroke='%230b4ea2' stroke-width='0.03'/%3E%3Cpath d='M1.35 0.66 v0.42 M1.25 0.79 h0.2 M1.3 0.72 h0.1' stroke='%23ee1c25' stroke-width='0.05' stroke-linecap='round'/%3E%3Cpath d='M1.08 1.12 q0.27-0.14 0.54 0' fill='none' stroke='%230b4ea2' stroke-width='0.04'/%3E%3C/svg%3E\")",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      },
    },
    pl: { label: 'PL', flagStyle: { background: 'linear-gradient(180deg,#ffffff 0 50%,#dc143c 50% 100%)' } },
    de: { label: 'DE', flagStyle: { background: 'linear-gradient(180deg,#111111 0 33%,#dd0000 33% 66%,#ffce00 66% 100%)' } },
    fr: { label: 'FR', flagStyle: { background: 'linear-gradient(90deg,#0055a4 0 33%,#ffffff 33% 66%,#ef4135 66% 100%)' } },
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
          <div className="flex-shrink-0 flex items-center">
            <a href="#hero" className="flex flex-col">
              <span className="text-xl md:text-2xl font-display font-bold text-snow-white tracking-tight leading-none">
                PAVEL <span className="text-safety-orange">NENTVICH</span>
              </span>
              <span className="text-xs text-snow-white/70 tracking-widest uppercase mt-1">{t.brand.tagline}</span>
            </a>
          </div>

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

            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 text-snow-white/90 hover:text-safety-orange transition-colors"
                aria-label="Language menu"
                aria-expanded={isLangMenuOpen}
              >
                <span className="inline-block w-4 h-3 rounded-[2px] border border-white/40" style={languageMeta[language].flagStyle} />
                <span className="uppercase text-sm font-medium">{languageMeta[language].label}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm uppercase flex items-center gap-2 ${
                        language === lang ? 'bg-gray-100 text-mountain-blue font-bold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="inline-block w-4 h-3 rounded-[2px] border border-slate-300" style={languageMeta[lang].flagStyle} />
                      <span>{languageMeta[lang].label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangMenuOpen(!isLangMenuOpen);
                  setIsMobileMenuOpen(false);
                }}
                className="h-9 px-2 rounded-md bg-white/10 text-snow-white flex items-center gap-2"
                aria-label="Language menu"
                aria-expanded={isLangMenuOpen}
              >
                <span className="inline-block w-4 h-3 rounded-[2px] border border-white/50" style={languageMeta[language].flagStyle} />
                <span className="text-xs font-semibold uppercase">{languageMeta[language].label}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm uppercase flex items-center gap-2 ${
                        language === lang ? 'bg-gray-100 text-mountain-blue font-bold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="inline-block w-4 h-3 rounded-[2px] border border-slate-300" style={languageMeta[lang].flagStyle} />
                      <span>{languageMeta[lang].label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsLangMenuOpen(false);
              }}
              className="text-snow-white hover:text-safety-orange focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

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
          </div>
        </div>
      )}
    </header>
  );
};
