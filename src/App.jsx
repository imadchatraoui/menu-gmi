import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ASCIIText from './components/ASCIIText';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2500); 
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  return (
    <main className="relative w-full h-[100dvh] bg-[#2A1314] overflow-hidden flex flex-col">
      
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
              alt="GMI Torino Logo"
              className="w-64 h-auto object-contain" 
              onLoad={() => setImageLoaded(true)} 
              initial={{ opacity: 0, scale: 0.9, y: 100 }} // LA SOLUZIONE È QUI (y: 100)
              animate={{ 
                opacity: imageLoaded ? 1 : 0, 
                scale: imageLoaded ? 1 : 0.7,
                y: 30 // LA SOLUZIONE È QUI (y: 100)
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