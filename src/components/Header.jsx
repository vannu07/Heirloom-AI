import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, BookOpen, UtensilsCrossed, Cpu, Volume2, Flame, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onToast }) {
  const [ambientSimmer, setAmbientSimmer] = useState(false);

  useEffect(() => {
    let audioCtx, osc, gainNode;
    if (ambientSimmer) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        osc = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.012, audioCtx.currentTime);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
      } catch (e) {
        console.log("Web Audio error", e);
      }
    }
    return () => {
      if (audioCtx) audioCtx.close();
    };
  }, [ambientSimmer]);

  const toggleAmbient = () => {
    setAmbientSimmer(!ambientSimmer);
    onToast(!ambientSimmer ? "Kitchen Audio Ambience: Active 🍳" : "Kitchen Audio Muted");
  };

  const tabs = [
    { id: 'vault', label: 'Heirloom Vault', icon: BookOpen },
    { id: 'studio', label: 'Voice Studio', icon: Mic },
    { id: 'kitchen', label: 'Kitchen Companion', icon: UtensilsCrossed },
    { id: 'open-ai', label: 'Architecture & Metrics', icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#12100e]/95 backdrop-blur-xl">
      {/* Top Status Bar */}
      <div className="bg-[#0a0908] px-6 py-2 border-b border-white/5 text-xs text-zinc-400 font-mono flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Gemma 4-bit Local Engine (Active)
          </span>
          <span className="hidden md:inline text-zinc-600">•</span>
          <span className="hidden md:inline text-zinc-400">Latency: 138ms</span>
          <span className="hidden md:inline text-zinc-600">•</span>
          <span className="hidden md:inline text-amber-400 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5" /> ElevenLabs Voice Ready
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleAmbient}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border transition-all ${
              ambientSimmer ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse' : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            {ambientSimmer ? 'Simmer Audio: ON' : 'Kitchen Audio'}
          </button>
          <span className="text-amber-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Hacktoberfest 2026
          </span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <div
            onClick={() => setActiveTab('vault')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400 transition-colors shadow-lg">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-bold text-white tracking-tight leading-none">
                  Heirloom AI
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Open-Weight AI
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Grandpa's Voice Recipe Vault & Hands-Free Kitchen Companion
              </p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex flex-wrap items-center gap-1.5 bg-[#0a0908] p-1.5 rounded-2xl border border-zinc-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive ? 'text-[#0a0908]' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-[#f8f6f0] rounded-xl shadow-md"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0a0908]' : 'text-amber-400'}`} />
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

        </div>
      </div>
    </header>
  );
}
