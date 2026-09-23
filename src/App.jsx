import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ASCIIText from './components/ASCIIText';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Quando l'immagine finisce di caricare, parte il timer di 2.5 secondi
    // prima di sfumare lo splash screen e rivelare il sito.
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2500); 
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  return (
    <main className="relative w-full h-[100dvh] bg-gmi-dark overflow-hidden flex flex-col">
      
      {/* =========================================
          CONTENUTO PRINCIPALE (Navbar e Testo)
          ========================================= */}
      
      <motion.header 
        className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="text-gmi-gold font-bold text-xl tracking-wider">
          GMI TORINO
        </div>
        
        <button className="text-gmi-cream border border-gmi-cream px-3 py-1 rounded-full text-sm">
          Tema
        </button>
      </motion.header>

      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <ASCIIText
          text="MENU"
          enableWaves={true}
          asciiFontSize={9} 
          textFontSize={80} 
          planeBaseHeight={5.8} 
          textColor="#C89B62" 
        />
      </motion.div>

      <motion.div 
        className="absolute bottom-8 w-full text-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <p className="text-gmi-cream text-sm tracking-widest uppercase animate-pulse">
          Il Gusto di Appartenenza
        </p>
      </motion.div>

      {/* =========================================
          SPLASH SCREEN OVERLAY (Ora centrato perfettamente)
          ========================================= */}
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gmi-dark" 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1 }}
          >
            <motion.img
              // Inserito il nome esatto del tuo nuovo file. 
              // Assicurati che lo spazio nel nome del file non dia fastidio. 
              // Se vedi che non carica, rinomina il file in "cropped-gmi.gif" (senza spazi)
              // e correggi il nome anche qui!
              src="/cropped gmi.gif" 
              alt="GMI Torino Logo"
              
              // w-64 gestisce la larghezza (su telefono è bella visibile).
              // object-contain impedisce che venga tagliata o deformata.
              className="w-64 h-auto object-contain" 
              
              onLoad={() => setImageLoaded(true)} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.9 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default App;