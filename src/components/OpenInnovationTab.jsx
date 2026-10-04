import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, DollarSign, Lock, Code2, Terminal, FileCode, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

export default function OpenInnovationTab() {
  const [activeSubTab, setActiveSubTab] = useState('why-open');

  const benchmarkData = [
    { name: 'Local Gemma 4-bit', latency: 138, cost: 0, privacyScore: 100 },
    { name: 'Proprietary Cloud A', latency: 850, cost: 0.03, privacyScore: 25 },
    { name: 'Proprietary Cloud B', latency: 1200, cost: 0.06, privacyScore: 15 },
  ];

  const gemmaSystemPrompt = `// Open-Weight Gemma 4-bit System Prompt for Recipe Extraction
const SYSTEM_PROMPT = \`
You are an expert culinary archivist powered by Gemma open-weight LLM.
Your task is to convert unstructured family voice audio transcripts into structured recipe JSON.

INPUT TRANSCRIPT:
"{USER_VOICE_TRANSCRIPT}"

REQUIREMENTS:
1. Extract title, family speaker, and year of origin.
2. Normalize vague terms:
   - "a pinch of love" -> "1g sea salt"
   - "a small stem" -> "10g fresh basil"
   - "a knob of butter" -> "15g (1 tbsp) butter"
3. Separate emotional family anecdotes from strict technical steps.
4. Format output strictly as JSON with ingredients (metric & US) and step audio prompts.
\`;`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="badge-tag font-mono">Hacktoberfest 2026</span>
          <span className="badge-tag text-amber-400">Gemma 4-bit Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[var(--text-primary)] tracking-tight">
          Why Open Innovation Matters
        </h2>
        <p className="text-xs text-[var(--text-secondary)] max-w-xl">
          Building for a loved one requires trust, privacy, and zero lock-in. Here is how open-weight AI makes Heirloom AI work better than any closed API.
        </p>

        {/* Sub-tabs */}
        <div className="flex border-b border-white/10 gap-6 pt-4 text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('why-open')}
            className={`pb-2.5 transition-colors ${
              activeSubTab === 'why-open' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-[var(--text-tertiary)] hover:text-white'
            }`}
          >
            Core Open Pillars
          </button>
          <button
            onClick={() => setActiveSubTab('benchmarks')}
            className={`pb-2.5 transition-colors ${
              activeSubTab === 'benchmarks' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-[var(--text-tertiary)] hover:text-white'
            }`}
          >
            Benchmarks & Latency
          </button>
          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`pb-2.5 transition-colors ${
              activeSubTab === 'architecture' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-[var(--text-tertiary)] hover:text-white'
            }`}
          >
            System Pipeline
          </button>
          <button
            onClick={() => setActiveSubTab('prompt')}
            className={`pb-2.5 transition-colors ${
              activeSubTab === 'prompt' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-[var(--text-tertiary)] hover:text-white'
            }`}
          >
            Gemma Prompt Inspector
          </button>
        </div>
      </div>

      {/* Subtab 1 */}
      {activeSubTab === 'why-open' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="heirloom-card p-5 space-y-2">
            <Lock className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-serif font-semibold">100% Privacy & Data Security</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Family voice recordings contain precious personal memories and names. Closed cloud APIs harvest prompt data to train commercial models. By using open-weight Gemma models on-device, zero audio or recipe text leaves Grandpa's hardware.
            </p>
          </div>

          <div className="heirloom-card p-5 space-y-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-serif font-semibold">Offline Kitchen Resilience</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Kitchens often have poor WiFi reception or thick plaster walls. Closed SaaS models fail when connection drops. Local Gemma inference runs smoothly offline on laptops or kitchen tablets without needing an internet connection.
            </p>
          </div>

          <div className="heirloom-card p-5 space-y-2">
            <DollarSign className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-serif font-semibold">Zero Marginal API Cost</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Paid proprietary APIs charge per token and per audio minute. Heirloom recipes should be accessible for generations without recurring subscription costs. Open models mean zero marginal cost per recipe generated.
            </p>
          </div>

          <div className="heirloom-card p-5 space-y-2 lg:col-span-3">
            <h3 className="text-base font-serif font-semibold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-500" /> Dialect & Heritage Fine-Tuning Capability
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Closed models struggle with niche regional culinary terms (e.g. Italian "soffritto", Indian "tadka", Southern "potlikker", or informal family measurements like "three fingers of flour"). Open-weight models like Gemma allow fine-tuning on regional culinary corpora so every family tradition is accurately understood.
            </p>
          </div>
        </div>
      )}

      {/* Subtab 2 */}
      {activeSubTab === 'benchmarks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="heirloom-card p-5 space-y-3">
            <h3 className="text-xs font-mono text-[var(--text-tertiary)] uppercase flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-500" /> Inference Latency Comparison (ms)
            </h3>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#25201c" />
                  <XAxis dataKey="name" stroke="#a89f91" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#a89f91" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1c1916', borderColor: '#d97706' }} />
                  <Bar dataKey="latency" fill="#d97706">
                    {benchmarkData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#f43f5e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="heirloom-card p-5 space-y-3">
            <h3 className="text-xs font-mono text-[var(--text-tertiary)] uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" /> Privacy & Data Security Index
            </h3>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#25201c" />
                  <XAxis dataKey="name" stroke="#a89f91" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#a89f91" tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#1c1916', borderColor: '#d97706' }} />
                  <Bar dataKey="privacyScore" fill="#38bdf8">
                    {benchmarkData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#d97706' : '#52525b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3 */}
      {activeSubTab === 'architecture' && (
        <div className="heirloom-card p-6 space-y-4">
          <h3 className="text-base font-serif font-semibold text-[var(--text-primary)]">System Architecture</h3>
          <div className="bg-[#110f0d] p-5 rounded-lg border border-[var(--border-subtle)] font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20">
                <div className="font-bold text-amber-400">1. Audio Input</div>
                <div className="text-[10px] text-[var(--text-tertiary)] mt-1">Speech / Mic / Memos</div>
              </div>

              <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20">
                <div className="font-bold text-amber-400">2. Gemma Core</div>
                <div className="text-[10px] text-[var(--text-tertiary)] mt-1">4-bit Entity Resolution</div>
              </div>

              <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20">
                <div className="font-bold text-amber-400">3. Heirloom Vault</div>
                <div className="text-[10px] text-[var(--text-tertiary)] mt-1">Local Storage & Unit Scaler</div>
              </div>

              <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20">
                <div className="font-bold text-emerald-400">4. Hands-Free Voice</div>
                <div className="text-[10px] text-[var(--text-tertiary)] mt-1">Voice Assistant</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4 */}
      {activeSubTab === 'prompt' && (
        <div className="heirloom-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <FileCode className="w-4 h-4 text-amber-500" /> Gemma System Prompt Template
            </h3>
            <span className="badge-tag font-mono">gemma-2-9b-it-4bit</span>
          </div>

          <pre className="code-block text-xs">
            {gemmaSystemPrompt}
          </pre>
        </div>
      )}

    </div>
  );
}
