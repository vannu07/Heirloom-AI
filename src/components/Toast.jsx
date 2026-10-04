import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1d171a]/95 backdrop-blur-xl border border-[var(--accent-gold)]/40 shadow-2xl text-xs font-semibold text-[var(--text-primary)]"
    >
      <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[var(--accent-gold)]">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
      <span>{message}</span>
      <button onClick={onClose} className="text-zinc-500 hover:text-white ml-2">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
