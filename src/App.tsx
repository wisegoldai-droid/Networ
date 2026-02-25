/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Legacy } from './components/Legacy';
import { PartnershipCTA } from './components/PartnershipCTA';
import { Gallery } from './components/Gallery';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-snow-white font-sans text-slate-gray selection:bg-safety-orange selection:text-white">
        <Header />
        <main>
          <Hero />
          <Legacy />
          <Gallery />
          <Services />
          <Contact />
          <PartnershipCTA />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
