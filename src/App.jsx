import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ASCIIText from './components/ASCIIText';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Stato per gestire il click sul piccolo logo in alto a sinistra
  const [headerAnimating, setHeaderAnimating] = useState(false);

  // LOGICA SPLASH SCREEN: Parte in automatico con il tuo file originale
  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2500); 
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  // LOGICA CLICK IN ALTO A SINISTRA: Fa partire l'animazione e poi ricarica
  const handleHeaderClick = () => {
    setHeaderAnimating(true); // Scambia la foto statica con la GIF animata
    
    // Aspetta 2.5 secondi prima di ricaricare il sito
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  return (
    <main className="relative w-full h-[100dvh] bg-[#2A1314] overflow-hidden flex flex-col">
      
      {/* =========================================
          LOGO IN ALTO A SINISTRA (Clicca per animare e ricaricare)
          ========================================= */}
      <motion.div 
        // MODIFICA QUI: ho cambiato right-6 in left-6
        className="absolute top-6 left-6 z-50 cursor-pointer" 
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        onClick={handleHeaderClick} 
      >
        <img 
          // Se cliccato mostra l'animazione, altrimenti l'immagine statica singola
          src={headerAnimating ? "/animato gif.gif" : "/cropped_gmi_singolo-removebg-preview.png"} 
          alt="GMI Torino Logo" 
          className="w-12 h-auto object-contain" 
        />
      </motion.div>

      {/* =========================================
          CONTENUTO PRINCIPALE (Solo Testo ASCII 3D)
          ========================================= */}
      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center"
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

     {/* =========================================
          SPLASH SCREEN OVERLAY (L'originale automatico)
          ========================================= */}
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            className="fixed inset-0 z-[150] flex items-center justify-center bg-[#2A1314]" 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1 }}
          >
            <motion.img
              // Ripristinato il file originale dello splash screen
              src="/cropped gmi.gif" 
              alt="GMI Torino Logo Iniziale"
              className="w-64 h-auto object-contain" 
              
              onLoad={() => setImageLoaded(true)} 
              
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ 
                opacity: imageLoaded ? 1 : 0, 
                scale: imageLoaded ? 0.7 : 0.9,
                y: 30 
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default App;