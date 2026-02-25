import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { galleryImages } from '../data/galleryImages';

export const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasSelection = selectedIndex !== null;
  const fallbackForIndex = (index: number) => `${import.meta.env.BASE_URL}images/gallery/gallery-0${index + 1}.svg`;

  const closeLightbox = () => setSelectedIndex(null);
  const showCarouselPrevious = () => {
    setCurrentIndex((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  };
  const showCarouselNext = () => {
    setCurrentIndex((currentIndex + 1) % galleryImages.length);
  };
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

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] md:aspect-[16/9] group"
          >
            <button
              type="button"
              className="absolute inset-0 z-20"
              onClick={() => setSelectedIndex(currentIndex)}
              aria-label={`${t.gallery.items[currentIndex].year}: ${t.gallery.items[currentIndex].caption}`}
            />
            <img
              src={galleryImages[currentIndex].url}
              alt={t.gallery.items[currentIndex].caption}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = fallbackForIndex(currentIndex);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mountain-blue/90 via-mountain-blue/30 to-transparent z-10" />

            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-20">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-safety-orange font-mono text-sm font-bold tracking-widest uppercase mb-1 block">
                    {t.gallery.items[currentIndex].year}
                  </span>
                  <span className="text-white font-semibold text-xl md:text-2xl">
                    {t.gallery.items[currentIndex].caption}
                  </span>
                </div>
                <ZoomIn className="text-white/80 w-7 h-7 flex-shrink-0" />
              </div>
            </div>

            <button
              type="button"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/35 text-white hover:bg-black/50 transition-colors"
              onClick={showCarouselPrevious}
              aria-label={t.gallery.previous}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/35 text-white hover:bg-black/50 transition-colors"
              onClick={showCarouselNext}
              aria-label={t.gallery.next}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>

          <div className="flex gap-3 overflow-x-auto mt-4 pb-1">
            {galleryImages.map((img, index) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index ? 'border-safety-orange' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                aria-label={`${t.gallery.items[index].year}: ${t.gallery.items[index].caption}`}
              >
                <img
                  src={img.url}
                  alt={t.gallery.items[index].caption}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = fallbackForIndex(index);
                  }}
                />
              </button>
            ))}
          </div>
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
                  e.currentTarget.src = fallbackForIndex(selectedIndex);
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
