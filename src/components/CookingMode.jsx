import React, { useState, useEffect } from 'react';
import { Volume2, Mic, MicOff, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Timer, Sparkles, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CookingMode({ recipe, onExit, onToast }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [initialTimer, setInitialTimer] = useState(300);

  const [askQuery, setAskQuery] = useState('');
  const [aiAnswers, setAiAnswers] = useState([
    { query: "Can I substitute butter in marinara?", answer: "Grandpa Arthur: 'Olive oil works great for dairy-free, but butter gives that smooth finish!'" }
  ]);

  const currentStep = recipe.steps[currentStepIndex];

  const speakStep = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    speakStep(currentStep.audioPrompt || currentStep.instruction);
  }, [currentStepIndex]);

  useEffect(() => {
    let interval;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      confetti({ particleCount: 80, spread: 60 });
      speakStep("Timer complete.");
      onToast("Kitchen timer complete!");
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const toggleVoiceListening = () => {
    setIsListening(!isListening);
    onToast(!isListening ? "Voice command mic active" : "Voice mic muted");
  };

  const handleNextStep = () => {
    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      confetti({ particleCount: 100, spread: 70 });
      speakStep("Recipe finished!");
      onToast("Cooking complete! 🎉");
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const startTimer = (mins) => {
    setInitialTimer(mins * 60);
    setTimerSeconds(mins * 60);
    setTimerActive(true);
    speakStep(`Timer set for ${mins} minutes.`);
    onToast(`Timer set for ${mins} mins`);
  };

  const handleAskGrandpa = (e) => {
    e.preventDefault();
    if (!askQuery.trim()) return;

    const userQ = askQuery;
    setAskQuery('');

    let ans = "Grandpa's Gemma AI: 'Keep heat low and stir gently!'";
    if (userQ.toLowerCase().includes('wine')) {
      ans = "Grandpa Arthur: 'Substitute equal parts dark beef broth with a splash of balsamic vinegar!'";
    }

    setAiAnswers(prev => [{ query: userQ, answer: ans }, ...prev]);
    speakStep(ans);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#0e0d0b] text-[var(--text-primary)] p-4 sm:p-8 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-4xl mx-auto border-b border-[var(--border-subtle)] pb-4">
        <button onClick={onExit} className="btn-secondary text-xs">
          <ArrowLeft className="w-3.5 h-3.5" /> Exit Kitchen Companion
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoiceListening}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono border transition-colors ${
              isListening ? 'bg-amber-500 text-[#0e0d0b] border-amber-400 font-bold' : 'bg-[#151311] text-[var(--text-secondary)] border-[var(--border-subtle)]'
            }`}
          >
            {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            {isListening ? 'Voice Commands: Active' : 'Enable Voice Command Mic'}
          </button>
        </div>
      </div>

      {/* Main Screen Card */}
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Progress Header */}
        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
          <span>STEP {currentStepIndex + 1} / {recipe.steps.length}</span>
          <span>{recipe.title}</span>
        </div>

        {/* Big Kitchen Card */}
        <div className="heirloom-card p-8 sm:p-12 space-y-8 bg-[#151311] border-amber-500/40">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-tight">
              {currentStep.title}
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed bg-[#0e0d0b] p-6 rounded-lg border border-[var(--border-subtle)] font-sans">
              {currentStep.instruction}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#0e0d0b] rounded-lg border border-[var(--border-subtle)] text-xs">
            <button
              onClick={() => speakStep(currentStep.audioPrompt || currentStep.instruction)}
              className="flex items-center gap-2 font-medium text-amber-400 hover:underline"
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
              {isSpeaking ? 'Reading aloud...' : 'Re-read Step with Natural Voice'}
            </button>

            <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)] font-mono">
              <span>Voice commands:</span>
              <button onClick={handleNextStep} className="px-2 py-0.5 rounded bg-white/5 text-zinc-300">"Next Step"</button>
              <button onClick={handlePrevStep} className="px-2 py-0.5 rounded bg-white/5 text-zinc-300">"Previous"</button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button onClick={handlePrevStep} disabled={currentStepIndex === 0} className="btn-secondary disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button onClick={handleNextStep} className="btn-primary">
              {currentStepIndex === recipe.steps.length - 1 ? 'Finish Cooking!' : 'Next Step'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timer & Assistant Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div className="md:col-span-5 heirloom-card p-5 space-y-3">
            <h3 className="text-xs font-mono text-[var(--text-tertiary)] uppercase flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-amber-400" /> Kitchen Cooking Timer
            </h3>
            
            <div className="flex flex-col items-center p-4 bg-[#0e0d0b] rounded-lg border border-[var(--border-subtle)] space-y-3">
              <div className="text-3xl font-mono font-bold text-amber-400 tracking-wider">
                {formatTime(timerSeconds)}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setTimerActive(!timerActive)} className="btn-primary py-1.5 px-3 text-xs">
                  {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {timerActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={() => { setTimerSeconds(initialTimer); setTimerActive(false); }} className="btn-secondary py-1.5 px-2.5 text-xs">
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              <div className="flex gap-1.5 text-xs font-mono">
                <button onClick={() => startTimer(1)} className="px-2 py-0.5 rounded bg-white/5 text-zinc-300">1m</button>
                <button onClick={() => startTimer(5)} className="px-2 py-0.5 rounded bg-white/5 text-zinc-300">5m</button>
                <button onClick={() => startTimer(15)} className="px-2 py-0.5 rounded bg-white/5 text-zinc-300">15m</button>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 heirloom-card p-5 space-y-3">
            <h3 className="text-xs font-mono text-[var(--text-tertiary)] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Ask Grandpa's AI Assistant
            </h3>

            <form onSubmit={handleAskGrandpa} className="flex gap-2">
              <input
                type="text"
                value={askQuery}
                onChange={(e) => setAskQuery(e.target.value)}
                placeholder="Ask e.g. 'What can I substitute for wine?'"
                className="flex-1 bg-[#0e0d0b] border border-[var(--border-subtle)] rounded-md px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--border-hover)] font-sans"
              />
              <button type="submit" className="btn-primary text-xs py-1.5 px-3">Ask</button>
            </form>

            <div className="space-y-2 max-h-36 overflow-y-auto">
              {aiAnswers.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[#0e0d0b] border border-white/5 text-xs space-y-0.5">
                  <p className="text-[var(--text-tertiary)] font-mono">Q: "{item.query}"</p>
                  <p className="text-amber-300 font-serif">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
