import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { galleryImages } from '../data/galleryImages';

export const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasSelection = selectedIndex !== null;

  const closeLightbox = () => setSelectedIndex(null);
  const showPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
  };
  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % galleryImages.length);
  };

  useEffect(() => {
    if (!hasSelection) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [hasSelection, selectedIndex]);

  return (
    <section id="gallery" className="py-24 bg-snow-white text-slate-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-mountain-blue mb-4 tracking-tight">
            {t.gallery.title}
          </h2>
          <p className="text-lg text-slate-gray/70 max-w-2xl mx-auto mb-6">
            {t.gallery.subtitle}
          </p>
          <div className="w-24 h-1 bg-safety-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {galleryImages.map((img, index) => (
            <motion.button
              key={img.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] shadow-md hover:shadow-xl transition-shadow text-left"
              onClick={() => setSelectedIndex(index)}
              aria-label={`${t.gallery.items[index].year}: ${t.gallery.items[index].caption}`}
            >
              <img 
                src={img.url} 
                alt={t.gallery.items[index].caption} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = `/images/gallery/gallery-0${index + 1}.svg`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mountain-blue/90 via-mountain-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-safety-orange font-mono text-sm font-bold tracking-widest uppercase mb-1 block">
                      {t.gallery.items[index].year}
                    </span>
                    <span className="text-white font-medium text-lg">
                      {t.gallery.items[index].caption}
                    </span>
                  </div>
                  <ZoomIn className="text-white/70 w-6 h-6 flex-shrink-0 ml-4" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {hasSelection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            <button 
              type="button"
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={closeLightbox}
              aria-label={t.gallery.close}
            >
              <X size={32} />
            </button>
            <button
              type="button"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-[120] p-3 sm:p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                showPrevious();
              }}
              aria-label={t.gallery.previous}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-[120] p-3 sm:p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label={t.gallery.next}
            >
              <ChevronRight size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={galleryImages[selectedIndex].url} 
                alt={t.gallery.items[selectedIndex].caption} 
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = `/images/gallery/gallery-0${selectedIndex + 1}.svg`;
                }}
              />
              <div className="mt-4 text-center">
                <span className="text-safety-orange font-mono text-lg font-bold tracking-widest uppercase mr-4">
                  {t.gallery.items[selectedIndex].year}
                </span>
                <span className="text-white/90 text-xl font-light">
                  {t.gallery.items[selectedIndex].caption}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
