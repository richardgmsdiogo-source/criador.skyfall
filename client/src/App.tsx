// Design Philosophy: Neogótico Contemplativo
// Aplicação principal do Criador de Personagens Skyfall

import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CharacterProvider } from "./contexts/CharacterContext";
import Welcome from "./pages/Welcome";
import CharacterCreator from "./pages/CharacterCreator";

function App() {
  const [showCreator, setShowCreator] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <CharacterProvider>
          <TooltipProvider>
            <Toaster />
            {showCreator ? (
              <CharacterCreator />
            ) : (
              <Welcome onStart={() => setShowCreator(true)} />
            )}
          </TooltipProvider>
        </CharacterProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
