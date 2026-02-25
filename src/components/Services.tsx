import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Wrench, ShieldCheck, Footprints, Ruler } from 'lucide-react';

const getIcon = (type: string) => {
  switch (type) {
    case 'ski':
      return <Snowflake className="w-5 h-5 text-safety-orange" />;
    case 'snowboard':
      return <Snowflake className="w-5 h-5 text-safety-orange" />;
    case 'boot':
      return <Footprints className="w-5 h-5 text-safety-orange" />;
    case 'pole':
      return <Ruler className="w-5 h-5 text-safety-orange" />;
    case 'helmet':
      return <ShieldCheck className="w-5 h-5 text-safety-orange" />;
    default:
      return <Snowflake className="w-5 h-5 text-safety-orange" />;
  }
};

export const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'rental' | 'service'>('rental');
  const [mobileDurationIndex, setMobileDurationIndex] = useState(1);

  const tabs = [
    { id: 'rental', label: t.services.tabs.rental, icon: Snowflake },
    { id: 'service', label: t.services.tabs.service, icon: Wrench },
  ] as const;

  const formatPrice = (priceCzk: number) => {
    if (language === 'cz') return `${priceCzk} CZK`;
    const rate = language === 'pl' ? 5 : 24;
    const foreignCurrency = language === 'pl' ? 'PLN' : 'EUR';
    const converted = Math.round(priceCzk / rate);
    return `${priceCzk} CZK / ${converted} ${foreignCurrency}`;
  };

  return (
    <section id="services" className="py-24 bg-mountain-blue text-snow-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">{t.services.title}</h2>
          <div className="w-24 h-1 bg-safety-orange mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-safety-orange text-white shadow-lg shadow-safety-orange/30'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'rental' && (
                <div className="space-y-6">
                  <div className="hidden md:block overflow-x-auto pb-4">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr>
                          <th className="p-4 border-b border-white/20 font-semibold text-lg text-white/90">
                            {t.services.equipmentLabel}
                            <span className="block text-xs text-white/50 font-mono mt-1 uppercase tracking-widest">
                              {t.services.currencyLabel}
                            </span>
                          </th>
                          {t.services.priceColumns.map((col, i) => (
                            <th
                              key={i}
                              className="p-4 border-b border-white/20 font-semibold text-center whitespace-nowrap text-white/80"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {t.services.pricing.map((row, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors group">
                            <td className="p-4 border-b border-white/10 flex items-center space-x-3 whitespace-nowrap">
                              {getIcon(row.icon)}
                              <span className="font-medium text-white/90 group-hover:text-white transition-colors">{row.item}</span>
                            </td>
                            {row.prices.map((price, j) => (
                              <td
                                key={j}
                                className="p-4 border-b border-white/10 text-center font-mono text-safety-orange font-bold text-lg"
                              >
                                {formatPrice(price)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="md:hidden space-y-4">
                    <div className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                      {t.services.currencyLabel}
                    </div>

                    <div className="overflow-x-auto pb-1">
                      <div className="flex gap-2 min-w-max">
                        {t.services.priceColumns.map((label, idx) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => setMobileDurationIndex(idx)}
                            className={`px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                              mobileDurationIndex === idx
                                ? 'bg-safety-orange text-white'
                                : 'bg-white/10 text-white/70'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {t.services.pricing.map((row, i) => (
                      <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          {getIcon(row.icon)}
                          <span className="font-semibold text-white">{row.item}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/70">{t.services.priceColumns[mobileDurationIndex]}</span>
                          <span className="text-right font-mono text-safety-orange font-bold text-base">
                            {formatPrice(row.prices[mobileDurationIndex])}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end space-x-2 text-white/40 text-sm italic">
                    <Snowflake size={14} />
                    <span>{t.services.exchangeRateNote}</span>
                  </div>
                </div>
              )}

              {activeTab === 'service' && (
                <div className="max-w-3xl mx-auto text-center space-y-8 py-8">
                  <div className="w-20 h-20 bg-safety-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wrench className="text-safety-orange w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white">{t.services.serviceBlock.title}</h3>
                  <p className="text-xl text-white/80 leading-relaxed font-light">{t.services.serviceBlock.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {t.services.featureCards.map((card, idx) => (
                      <div key={card.title} className="bg-white/10 p-6 rounded-2xl border border-white/5">
                        {idx === 0 && <ShieldCheck className="w-8 h-8 text-safety-orange mx-auto mb-4" />}
                        {idx === 1 && <Snowflake className="w-8 h-8 text-safety-orange mx-auto mb-4" />}
                        {idx === 2 && <Wrench className="w-8 h-8 text-safety-orange mx-auto mb-4" />}
                        <h4 className="font-semibold mb-2">{card.title}</h4>
                        <p className="text-sm text-white/70">{card.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
