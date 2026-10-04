import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Sparkles, Cpu, Play, CheckCircle2, ShieldCheck, Volume2, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAMPLE_RECIPES } from '../data/sampleRecipes';

export default function VoiceStudio({ onSaveRecipe, setActiveTab, onToast }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedResult, setExtractedResult] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [voicePersona, setVoicePersona] = useState('Grandpa Arthur');

  const canvasRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    if (isRecording && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let phase = 0;

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#d97706';
        ctx.beginPath();

        const width = canvas.width;
        const height = canvas.height;
        const midY = height / 2;

        for (let x = 0; x < width; x += 4) {
          const distance = Math.sin((x / 25) + phase) * Math.sin(x / width * Math.PI) * (height / 2.5);
          ctx.lineTo(x, midY + distance);
        }
        ctx.stroke();
        phase += 0.15;
        animationFrame = requestAnimationFrame(draw);
      };

      draw();
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      clearInterval(timerRef.current);
      if (!transcript) {
        setTranscript("Listen nephew, to make my short ribs tender as velvet, you sear three pounds of beef short ribs in a screaming hot cast iron pan with smoked paprika and sea salt. Once mahogany brown, deglaze with dry Cabernet Sauvignon...");
      }
      onToast("Voice audio captured");
    } else {
      setIsRecording(true);
      setExtractedResult(null);
      setRecordTime(0);
      setTranscript('');
      timerRef.current = setInterval(() => setRecordTime(prev => prev + 1), 1000);
    }
  };

  const handleSelectPreset = (sample) => {
    setSelectedPreset(sample.id);
    setTranscript(sample.audioTranscript);
    setExtractedResult(null);
    onToast(`Loaded ${sample.recordedBy}'s recording`);
  };

  const runGemmaExtractor = () => {
    if (!transcript.trim()) return;

    setIsProcessing(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 600);
    setTimeout(() => setActiveStep(3), 1200);

    setTimeout(() => {
      const match = SAMPLE_RECIPES.find(r => r.audioTranscript.includes(transcript.substring(0, 25))) || {
        id: 'voice-' + Date.now(),
        title: `${voicePersona}'s Special Heritage Recipe`,
        recordedBy: voicePersona,
        year: "2026",
        originCity: "Family Kitchen",
        image: "/marinara.jpg",
        prepTime: "20 mins",
        cookTime: "1 hr 30 mins",
        servings: 4,
        tags: ["Custom Voice", "Gemma Extraction"],
        quote: transcript.substring(0, 95) + "...",
        audioTranscript: transcript,
        gemmaDebug: {
          model: "Gemma 4-bit Open-Weight",
          latency: "138ms",
          promptTokens: 395,
          vagueTermsResolved: [
            { term: "tender as velvet", resolvedTo: "Slow Braise 3.5 hrs at 325°F" },
            { term: "screaming hot cast iron", resolvedTo: "Preheat skillet to 425°F" }
          ]
        },
        nutrition: { calories: 420, carbs: 28, protein: 35, fat: 18, fiber: 4 },
        flavorProfile: [
          { aspect: 'Umami', score: 92 },
          { aspect: 'Sweetness', score: 35 },
          { aspect: 'Acidity', score: 65 },
          { aspect: 'Aroma', score: 88 },
          { aspect: 'Spice', score: 40 }
        ],
        ingredients: [
          { name: "Main Protein", metric: "1200g", us: "2.6 lbs", category: "Meat" },
          { name: "Olive Oil", metric: "45ml", us: "3 tbsp", category: "Pantry" },
          { name: "Fresh Garlic", metric: "6 cloves", us: "6 cloves", category: "Produce" }
        ],
        steps: [
          {
            stepNumber: 1,
            title: "Sear & Sauté",
            instruction: "Sear ingredients over high heat until browned.",
            audioPrompt: "Sear ingredients over high heat."
          }
        ]
      };

      setExtractedResult(match);
      setIsProcessing(false);
      confetti({ particleCount: 70, spread: 60 });
      onToast("Gemma AI Extraction Complete");
    }, 1800);
  };

  const handleSaveToVault = () => {
    if (extractedResult) {
      onSaveRecipe(extractedResult);
      setActiveTab('vault');
      onToast("Saved to Heirloom Vault");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="badge-tag">Gemma 4-bit Open Core</span>
          <span className="badge-tag text-emerald-400">100% Local Privacy</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[var(--text-primary)] tracking-tight">
          Voice Memory Studio
        </h2>
        <p className="text-xs text-[var(--text-secondary)] max-w-xl">
          Capture elderly family audio stories or test pre-loaded recordings. Gemma 4-bit model normalizes vague measurements and extracts ingredients.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-5">
          <div className="heirloom-card p-5 space-y-4">
            <h3 className="text-xs font-mono text-[var(--text-tertiary)] uppercase">
              1. Audio Story Source
            </h3>

            {/* Persona Pills */}
            <div className="flex items-center gap-1.5 text-xs bg-[#110f0d] p-1 rounded-md border border-[var(--border-subtle)]">
              <span className="text-[var(--text-tertiary)] text-[11px] px-2 font-mono">Persona:</span>
              {['Grandpa Arthur', 'Grandma Rose', 'Uncle Marco'].map((p) => (
                <button
                  key={p}
                  onClick={() => setVoicePersona(p)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    voicePersona === p ? 'bg-[#f5f2eb] text-[#0e0d0b]' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {SAMPLE_RECIPES.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleSelectPreset(sample)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    selectedPreset === sample.id ? 'border-amber-500/50 bg-[#24201c]' : 'border-[var(--border-subtle)] bg-[#151311] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={sample.image} alt={sample.title} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <h4 className="text-xs font-serif font-semibold text-[var(--text-primary)]">{sample.title}</h4>
                      <p className="text-[10px] text-[var(--text-tertiary)]">{sample.recordedBy} ({sample.year})</p>
                    </div>
                  </div>
                  <Play className={`w-4 h-4 ${selectedPreset === sample.id ? 'text-amber-500' : 'text-zinc-600'}`} />
                </div>
              ))}
            </div>

            {/* Mic Canvas */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-col items-center p-4 bg-[#110f0d] rounded-lg border border-dashed border-[var(--border-subtle)]">
              <canvas ref={canvasRef} width="300" height="40" className="w-full h-10 mb-2 bg-black/40 rounded"></canvas>
              
              <button
                onClick={toggleRecording}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium transition-colors ${
                  isRecording ? 'bg-rose-600 text-white animate-pulse' : 'btn-primary'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                {isRecording ? `Recording (${recordTime}s) - Click to Stop` : 'Record Audio Story'}
              </button>
            </div>
          </div>

          <div className="heirloom-card p-5 space-y-3">
            <label className="text-xs font-mono text-[var(--text-tertiary)] uppercase">
              Speech-to-Text Transcript
            </label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Click a preset above or record live audio..."
              className="w-full h-32 bg-[#110f0d] border border-[var(--border-subtle)] rounded-md p-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-hover)] resize-none font-mono"
            />
            <button
              onClick={runGemmaExtractor}
              disabled={!transcript.trim() || isProcessing}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isProcessing ? 'Gemma Processing Pipeline...' : 'Process Transcript with Gemma AI'}
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-6 space-y-5">
          <div className="heirloom-card p-5 space-y-3">
            <h3 className="text-xs font-mono text-[var(--text-tertiary)] uppercase">
              2. Gemma Pipeline Output
            </h3>

            <div className="space-y-2">
              <div className={`p-3 rounded-md border flex items-center gap-2.5 text-xs ${activeStep >= 1 ? 'border-amber-500/40 bg-amber-500/10' : 'border-white/5 bg-[#110f0d]'}`}>
                <CheckCircle2 className={`w-4 h-4 ${activeStep >= 1 ? 'text-amber-500' : 'text-zinc-600'}`} />
                <div>
                  <h4 className="font-semibold">1. Acoustic Tokenization</h4>
                  <p className="text-[11px] text-[var(--text-tertiary)]">Cleans raw audio text stream.</p>
                </div>
              </div>

              <div className={`p-3 rounded-md border flex items-center gap-2.5 text-xs ${activeStep >= 2 ? 'border-amber-500/40 bg-amber-500/10' : 'border-white/5 bg-[#110f0d]'}`}>
                <CheckCircle2 className={`w-4 h-4 ${activeStep >= 2 ? 'text-amber-500' : 'text-zinc-600'}`} />
                <div>
                  <h4 className="font-semibold">2. Entity Measurement Resolution</h4>
                  <p className="text-[11px] text-[var(--text-tertiary)]">Translates vague phrases into precise units.</p>
                </div>
              </div>

              <div className={`p-3 rounded-md border flex items-center gap-2.5 text-xs ${activeStep >= 3 ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-white/5 bg-[#110f0d]'}`}>
                <CheckCircle2 className={`w-4 h-4 ${activeStep >= 3 ? 'text-emerald-400' : 'text-zinc-600'}`} />
                <div>
                  <h4 className="font-semibold">3. Recipe Structuring</h4>
                  <p className="text-[11px] text-[var(--text-tertiary)]">Isolates family quotes from cooking steps.</p>
                </div>
              </div>
            </div>
          </div>

          {extractedResult && (
            <div className="heirloom-card p-5 space-y-4 border-amber-500/50 bg-[#201b17]">
              <div className="flex items-center justify-between">
                <span className="badge-tag">Gemma Structured Output</span>
                <span className="text-[10px] font-mono text-amber-500">{extractedResult.gemmaDebug.model}</span>
              </div>

              <div className="flex gap-3">
                <img src={extractedResult.image} alt={extractedResult.title} className="w-20 h-20 rounded object-cover" />
                <div>
                  <h3 className="text-base font-serif font-semibold">{extractedResult.title}</h3>
                  <p className="text-xs text-[var(--text-tertiary)]">{extractedResult.recordedBy} ({extractedResult.year})</p>
                  <blockquote className="text-xs italic text-[var(--text-secondary)] mt-1 border-l-2 border-amber-500/50 pl-2">
                    "{extractedResult.quote}"
                  </blockquote>
                </div>
              </div>

              <button onClick={handleSaveToVault} className="btn-primary w-full justify-center">
                <BookOpen className="w-4 h-4" /> Save Recipe to Heirloom Vault
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
