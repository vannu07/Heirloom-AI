import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Volume2, UtensilsCrossed, Clock, Users, Play, Pause, ChevronRight, Scale, Printer, Copy, PieChart, Activity, X } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function RecipeVault({ recipes, onSelectForCooking, onToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [activeRecipe, setActiveRecipe] = useState(recipes[0]);
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [unitSystem, setUnitSystem] = useState('metric');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const tags = ['All', 'Gluten-Free', 'Dairy-Free', 'Vegetarian', 'Slow Cook', 'Heritage Classic'];

  const filteredRecipes = recipes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.recordedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === 'All' || r.tags.some(t => t.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      onToast(`Playing original voice recording of ${activeRecipe.recordedBy}`);
    }
  };

  const handleCopyIngredients = () => {
    const text = activeRecipe.ingredients
      .map(i => `- ${i.name}: ${unitSystem === 'metric' ? i.metric : i.us}`)
      .join('\n');
    navigator.clipboard.writeText(`${activeRecipe.title}\n\nIngredients:\n${text}`);
    onToast("Copied ingredients list to clipboard 📋");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-6 py-10 space-y-10"
    >
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Preserved Heritage Archive
            </span>
          </div>
          <h2 className="text-4xl font-serif font-bold text-white tracking-tight">
            The Heirloom Vault
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Preserved family culinary wisdom extracted from original voice recordings, complete with scaled servings, metric conversions, and flavor analytics.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, ingredients, family..."
            className="w-full bg-[#12100e] border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* Filter Tag Pills (Spacious & Breathable) */}
      <div className="flex flex-wrap items-center gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedTag === tag
                ? 'bg-[#f8f6f0] text-[#0a0908] shadow-md shadow-amber-500/10 scale-[1.02]'
                : 'bg-[#12100e] text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Main Grid Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Recipe Cards List */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Preserved Family Entries ({filteredRecipes.length})
          </h3>

          <div className="space-y-4">
            {filteredRecipes.map((recipe) => {
              const isSelected = activeRecipe?.id === recipe.id;
              return (
                <motion.div
                  key={recipe.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    setActiveRecipe(recipe);
                    setIsPlayingAudio(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'border-amber-500/60 bg-[#221e1a] shadow-xl shadow-amber-500/10'
                      : 'border-zinc-800 bg-[#191614] hover:border-zinc-700'
                  }`}
                >
                  <img src={recipe.image} alt={recipe.title} className="w-20 h-20 rounded-xl object-cover border border-white/10" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-mono text-amber-400 font-semibold">
                      {recipe.recordedBy} • {recipe.year}
                    </span>
                    <h4 className="text-base font-serif font-bold text-white truncate mt-0.5">
                      {recipe.title}
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> {recipe.cookTime}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-amber-400" /> {recipe.servings} Servings</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-zinc-600'}`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recipe Inspector Panel */}
        {activeRecipe && (
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 rounded-2xl bg-[#191614] border border-zinc-800 space-y-8 shadow-2xl">
              
              {/* Recipe Cover Hero Photo */}
              <div className="relative h-72 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <img src={activeRecipe.image} alt={activeRecipe.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {activeRecipe.recordedBy} ({activeRecipe.year})
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                      {activeRecipe.originCity}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                    {activeRecipe.title}
                  </h2>
                </div>
              </div>

              {/* Audio Preserved Memory Container */}
              <div className="p-6 rounded-2xl bg-[#12100e] border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider font-mono">
                    <Volume2 className="w-4 h-4" /> Preserved Voice Audio Story
                  </div>
                  <span className="text-xs font-mono text-zinc-400">Audio Recorded in {activeRecipe.year}</span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleAudio}
                    className="w-12 h-12 rounded-xl bg-[#f8f6f0] text-[#0a0908] flex items-center justify-center font-bold shadow-lg hover:bg-white transition-all transform hover:scale-105"
                  >
                    {isPlayingAudio ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="h-8 bg-black/60 rounded-xl p-1.5 flex items-center justify-between gap-1 border border-white/5">
                      {Array.from({ length: 32 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 rounded-full transition-all ${
                            isPlayingAudio ? 'bg-amber-400 animate-pulse' : 'bg-zinc-700'
                          }`}
                          style={{
                            height: isPlayingAudio ? `${Math.floor(Math.random() * 80) + 20}%` : '30%'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-sm italic text-zinc-300 border-l-2 border-amber-400 pl-4 py-1 leading-relaxed">
                  "{activeRecipe.quote}"
                </blockquote>
              </div>

              {/* Controls Bar: Serving Scaler & Unit Converter */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#12100e] rounded-2xl border border-zinc-800 text-xs">
                
                <div className="flex items-center gap-3">
                  <span className="text-zinc-400 font-semibold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-400" /> Scaled Servings:
                  </span>
                  <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-zinc-800 font-mono">
                    {[1, 2, 3].map((mult) => (
                      <button
                        key={mult}
                        onClick={() => {
                          setServingMultiplier(mult);
                          onToast(`Servings scaled to ${mult * activeRecipe.servings}`);
                        }}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                          servingMultiplier === mult
                            ? 'bg-[#f8f6f0] text-[#0a0908]'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {mult * activeRecipe.servings}p ({mult}x)
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-zinc-400 font-semibold flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-400" /> Units:
                  </span>
                  <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-zinc-800 font-mono">
                    <button
                      onClick={() => setUnitSystem('metric')}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                        unitSystem === 'metric' ? 'bg-[#f8f6f0] text-[#0a0908]' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Metric (g/ml)
                    </button>
                    <button
                      onClick={() => setUnitSystem('us')}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                        unitSystem === 'us' ? 'bg-[#f8f6f0] text-[#0a0908]' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      US Customary
                    </button>
                  </div>
                </div>

              </div>

              {/* Flavor Profile Radar & Macro Nutrients Grid */}
              {activeRecipe.flavorProfile && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Radar Chart */}
                  <div className="p-6 rounded-2xl bg-[#12100e] border border-zinc-800 space-y-3">
                    <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                      <PieChart className="w-4 h-4 text-amber-400" /> Flavor Profile Analytics
                    </h4>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={activeRecipe.flavorProfile}>
                          <PolarGrid stroke="#2c2723" />
                          <PolarAngleAxis dataKey="aspect" stroke="#a39c94" tick={{ fontSize: 10 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#2c2723" />
                          <Radar name="Flavor" dataKey="score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.35} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Macro Nutrients */}
                  <div className="p-6 rounded-2xl bg-[#12100e] border border-zinc-800 space-y-3">
                    <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4 text-amber-400" /> Macro Nutrients (per serving)
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 bg-black/60 rounded-xl border border-white/5 space-y-0.5">
                        <span className="text-zinc-500 text-[10px]">Calories</span>
                        <p className="text-amber-400 font-bold text-base">{activeRecipe.nutrition.calories} kcal</p>
                      </div>
                      <div className="p-3 bg-black/60 rounded-xl border border-white/5 space-y-0.5">
                        <span className="text-zinc-500 text-[10px]">Protein</span>
                        <p className="text-emerald-400 font-bold text-base">{activeRecipe.nutrition.protein}g</p>
                      </div>
                      <div className="p-3 bg-black/60 rounded-xl border border-white/5 space-y-0.5">
                        <span className="text-zinc-500 text-[10px]">Carbs</span>
                        <p className="text-sky-400 font-bold text-base">{activeRecipe.nutrition.carbs}g</p>
                      </div>
                      <div className="p-3 bg-black/60 rounded-xl border border-white/5 space-y-0.5">
                        <span className="text-zinc-500 text-[10px]">Fats</span>
                        <p className="text-rose-400 font-bold text-base">{activeRecipe.nutrition.fat}g</p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Ingredients List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                    Ingredients ({servingMultiplier}x Scaled)
                  </h4>
                  <button onClick={handleCopyIngredients} className="text-xs text-amber-400 hover:underline flex items-center gap-1.5 font-medium">
                    <Copy className="w-4 h-4" /> Copy Ingredients List
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {activeRecipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#12100e] border border-zinc-800/80 flex items-center justify-between">
                      <span className="text-white font-medium">{ing.name}</span>
                      <span className="text-amber-400 font-mono font-bold">
                        {unitSystem === 'metric' ? ing.metric : ing.us}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-4">
                <button
                  onClick={() => onSelectForCooking(activeRecipe)}
                  className="btn-primary flex-1 justify-center text-sm py-3.5"
                >
                  <UtensilsCrossed className="w-5 h-5" /> Start Hands-Free Kitchen Companion
                </button>
                <button onClick={() => setShowPrintModal(true)} className="btn-secondary text-sm py-3.5">
                  <Printer className="w-5 h-5" /> Printable Archival Card
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Printable Archival Card Modal */}
      {showPrintModal && activeRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md">
          <div className="max-w-xl w-full p-8 rounded-2xl bg-[#191614] border border-amber-500/40 space-y-6 relative shadow-2xl">
            <button onClick={() => setShowPrintModal(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <div className="border-2 border-dashed border-amber-500/40 p-6 space-y-4 rounded-xl text-center bg-[#12100e]">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">Heirloom Archival Index Card</span>
              <h2 className="text-3xl font-serif font-bold text-white">{activeRecipe.title}</h2>
              <p className="text-xs text-zinc-400">Preserved by {activeRecipe.recordedBy} ({activeRecipe.year}) • {activeRecipe.originCity}</p>
              
              <blockquote className="text-xs italic text-zinc-300 border-l-2 border-amber-400 pl-3 py-1 text-left">
                "{activeRecipe.quote}"
              </blockquote>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => window.print()} className="btn-primary">
                <Printer className="w-4 h-4" /> Print Card Now
              </button>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
}
