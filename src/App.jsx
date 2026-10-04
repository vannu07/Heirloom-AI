import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import VoiceStudio from './components/VoiceStudio';
import RecipeVault from './components/RecipeVault';
import CookingMode from './components/CookingMode';
import OpenInnovationTab from './components/OpenInnovationTab';
import Toast from './components/Toast';
import { SAMPLE_RECIPES } from './data/sampleRecipes';

export default function App() {
  const [activeTab, setActiveTab] = useState('vault');
  const [recipes, setRecipes] = useState(SAMPLE_RECIPES);
  const [cookingRecipe, setCookingRecipe] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
  };

  const handleSaveRecipe = (newRecipe) => {
    setRecipes(prev => [newRecipe, ...prev]);
  };

  const handleStartCooking = (recipe) => {
    setCookingRecipe(recipe);
    setActiveTab('kitchen');
    triggerToast(`Starting Hands-Free Kitchen Mode for ${recipe.title}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onToast={triggerToast} />

      {/* Main Tab View Container */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'studio' && (
            <motion.div key="studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <VoiceStudio onSaveRecipe={handleSaveRecipe} setActiveTab={setActiveTab} onToast={triggerToast} />
            </motion.div>
          )}

          {activeTab === 'vault' && (
            <motion.div key="vault" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <RecipeVault recipes={recipes} onSelectForCooking={handleStartCooking} onToast={triggerToast} />
            </motion.div>
          )}

          {activeTab === 'kitchen' && (
            <motion.div key="kitchen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {cookingRecipe ? (
                <CookingMode recipe={cookingRecipe} onExit={() => setActiveTab('vault')} onToast={triggerToast} />
              ) : (
                <CookingMode recipe={recipes[0]} onExit={() => setActiveTab('vault')} onToast={triggerToast} />
              )}
            </motion.div>
          )}

          {activeTab === 'open-ai' && (
            <motion.div key="open-ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <OpenInnovationTab onToast={triggerToast} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage('')} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--border-copper)] bg-[#0e0b0c] py-6 px-4 text-center text-xs text-[var(--text-muted)] space-y-1">
        <p className="font-serif text-[var(--text-secondary)] text-sm">
          Heirloom AI — Built with ❤️ for Grandpa Arthur & Family Heritage
        </p>
        <p>
          Submission for the <span className="text-[var(--accent-gold)] font-semibold">Hacktoberfest Weekend Challenge: Build for a Friend</span> • Powered by Open-Weight Gemma & ElevenLabs Voice
        </p>
      </footer>
    </div>
  );
}
