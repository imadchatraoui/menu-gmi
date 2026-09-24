import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ASCIIText from './components/ASCIIText';
import ScrollReveal from './components/ScrollReveal';

// ==========================================
// COMPONENTE CAROSELLO (3 Immagini)
// ==========================================
const MenuCarousel = () => {
  const images = [
    "/piatto1.jpg", 
    "/piatto2.jpg", 
    "/piatto3.jpg"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImg = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden bg-[#1a0c0d] shadow-2xl border border-[#D8A86C]/20">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Specialità ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Pulsanti di navigazione */}
      <div className="absolute inset-0 flex items-center justify-between p-4 md:p-8 z-10">
        <button 
          onClick={prevImg} 
          className="p-3 md:p-4 rounded-full bg-[#2A1314]/60 backdrop-blur-md text-[#D8A86C] hover:bg-[#D8A86C] hover:text-[#2A1314] transition-all"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button 
          onClick={nextImg} 
          className="p-3 md:p-4 rounded-full bg-[#2A1314]/60 backdrop-blur-md text-[#D8A86C] hover:bg-[#D8A86C] hover:text-[#2A1314] transition-all"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      {/* Pallini indicatori in basso */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-[#D8A86C]' : 'w-2.5 bg-[#D8A86C]/40'}`} 
          />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPALE (App)
// ==========================================
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [headerAnimating, setHeaderAnimating] = useState(false);

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  const handleHeaderClick = () => {
    setHeaderAnimating(true); 
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <main className={`relative w-full min-h-[100dvh] bg-[#2A1314] flex flex-col ${showSplash ? 'h-[100dvh] overflow-hidden' : 'overflow-x-hidden'}`}>
      
      {/* =========================================
          SEZIONE HERO FISSA (Bloccata allo schermo, mai più zoom)
          ========================================= */}
      <section className="fixed inset-0 w-full h-[100dvh] overflow-hidden flex flex-col pointer-events-none z-0">
        
        {/* LOGO IN ALTO A SINISTRA (Riattiviamo i click solo qui) */}
        <motion.div 
          className="absolute top-6 left-6 z-50 cursor-pointer pointer-events-auto" 
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          onClick={handleHeaderClick} 
        >
          <img 
            src={headerAnimating ? "/animato gif.gif" : "/cropped_gmi_singolo-removebg-preview.png"} 
            alt="GMI Torino Logo" 
            className="w-12 h-auto object-contain" 
          />
        </motion.div>

        {/* TESTO ASCII 3D */}
        <motion.div 
          className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="w-full h-full flex items-center justify-center transform-gpu">
            <ASCIIText
              text="MENU"
              enableWaves={true}
              asciiFontSize={9} 
              textFontSize={80} 
              planeBaseHeight={5.8} 
              textColor="#D8A86C" 
            />
          </div>
        </motion.div>

        {/* INDICATORE SCROLL (Gooey Arrow Animata) */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="ico">
            <div className="circle circle-top"></div>
            <div className="circle circle-main"></div>
            <div className="circle circle-bottom"></div>
            
            <svg 
              className="svg" 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 612 612" 
              style={{ enableBackground: 'new 0 0 612 612' }} 
              xmlSpace="preserve"
            >
              <defs>
                <clipPath id="cut-off-arrow">
                  <circle cx="306" cy="306" r="287" />
                </clipPath>
                
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
              <path 
                className="st-arrow" 
                d="M317.5,487.6c0.3-0.3,0.4-0.7,0.7-1.1l112.6-112.6c6.3-6.3,6.3-16.5,0-22.7c-6.3-6.3-16.5-6.3-22.7,0 l-86,86V136.1c0-8.9-7.3-16.2-16.2-16.2c-8.9,0-16.2,7.3-16.2,16.2v301.1l-86-86c-6.3-6.3-16.5-6.3-22.7,0 c-6.3,6.3-6.3,16.5,0,22.7l112.7,112.7c0.3,0.3,0.4,0.7,0.7,1c0.5,0.5,1.2,0.5,1.7,0.9c1.7,1.4,3.6,2.3,5.6,2.9 c0.8,0.2,1.5,0.4,2.3,0.4C308.8,492.6,313.8,491.3,317.5,487.6z"
              />
            </svg>
          </div>
        </motion.div>

      </section>

      {/* =========================================
          CONTENUTO SUCCESSIVO (Scorre sopra la Hero con un margine del 100vh)
          ========================================= */}
      <section className="relative w-full min-h-screen bg-[#2A1314] z-20 mt-[100vh] px-6 py-24 md:py-32 flex flex-col items-center justify-start shadow-[0_-20px_40px_rgba(42,19,20,1)]">
        
        {/* Testo animato con ScrollReveal */}
        <div className="w-full max-w-4xl mx-auto mb-24 text-center">
          <ScrollReveal
            baseOpacity={0.5}
            enableBlur={true}
            baseRotation={2}
            blurStrength={9}
            wordAnimationEnd="bottom center" 
            rotationEnd="bottom center"
          >
            Benvenuti in GMI Torino. Preparati a vivere un'esperienza sensoriale 
            fatta di ingredienti rigorosamente selezionati, pura tradizione e 
            una vera passione per l'eccellenza.
          </ScrollReveal>
        </div>

        {/* Carosello Immagini */}
        <MenuCarousel />

      </section>

     {/* =========================================
          SPLASH SCREEN OVERLAY 
          ========================================= */}
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            className="fixed inset-0 z-[150] flex items-center justify-center bg-[#2A1314]" 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1 }}
          >
            <motion.img
              src="/cropped gmi.gif" 
              alt="GMI Torino Logo Iniziale"
              className="w-64 h-auto object-contain" 
              onLoad={() => setImageLoaded(true)} 
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 0.7 : 0.9, y: 30 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default App;