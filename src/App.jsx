import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ASCIIText from './components/ASCIIText';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const [headerAnimating, setHeaderAnimating] = useState(false);

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2500); 
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  const handleHeaderClick = () => {
    setHeaderAnimating(true); 
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  return (
    // MODIFICA CSS: Cambiato "h-[100dvh]" in "min-h-[100dvh]" e "overflow-hidden" in "overflow-x-hidden". 
    // Ora il sito può scorrere verso il basso!
    <main className="relative w-full min-h-[100dvh] bg-[#2A1314] overflow-x-hidden flex flex-col">
      
      {/* =========================================
          SEZIONE HERO (Prima schermata)
          ========================================= */}
      <section className="relative w-full h-[100dvh] flex flex-col">
        
        {/* LOGO IN ALTO A SINISTRA */}
        <motion.div 
          className="absolute top-6 left-6 z-50 cursor-pointer" 
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
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <ASCIIText
            text="MENU"
            enableWaves={true}
            asciiFontSize={9} 
            textFontSize={80} 
            planeBaseHeight={5.8} 
            textColor="#D8A86C" 
          />
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
          CONTENUTO SUCCESSIVO (Carosello, testo, ecc.)
          ========================================= */}
      <section className="relative w-full min-h-screen bg-[#2A1314] z-20 flex items-center justify-center text-[#D8A86C]">
        {/* Qui inserirai il tuo carosello. Per ora ho messo un segnaposto per testare lo scroll */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-widest uppercase">I Nostri Piatti</h2>
          <p className="mt-4 opacity-70">Il carosello andrà qui.</p>
        </div>
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