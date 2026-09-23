import React from 'react';
import ASCIIText from './components/ASCIIText';

function App() {
  return (
    // Ho cambiato lo sfondo da #121212 a bg-gmi-dark per un nero-rossastro molto elegante
    <main className="relative w-full h-[100dvh] bg-gmi-dark overflow-hidden flex flex-col">
      
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <ASCIIText
          text="MENU"
          enableWaves={true}
          asciiFontSize={8} 
          textFontSize={800} 
          planeBaseHeight={4} 
          
          /* Usiamo l'Oro Antico del logo per la scritta ASCII */
          textColor="#9C2007" 
        />
      </div>

      <div className="absolute bottom-8 w-full text-center z-20">
        {/* Testo in basso color Crema */}
        <p className="text-gmi-cream text-sm tracking-widest uppercase animate-pulse">
          Il Gusto di Appartenenza
        </p>
      </div>

    </main>
  );
}

export default App;