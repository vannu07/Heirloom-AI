---
title: "Heirloom AI: Preserving Grandpa's Voice Recipes with Open-Weight Gemma AI & ElevenLabs"
published: false
tags: devchallenge, weekendchallenge, hf26challenge, hacktoberfest
---

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

## What I Built
I built **Heirloom AI** for my Grandpa Arthur (and families with elderly loved ones). Grandpa Arthur spent a lifetime mastering rustic Italian dishes, slow-simmered marinara, and secret family recipes. As he got older, typing or writing recipes down became difficult, so he began recording rambling voice memos on his phone.

However, voice notes are unstructured, contain rambling family anecdotes, and lack exact measurements ("a pinch of love", "a knob of butter"). **Heirloom AI** uses open-weight **Gemma AI** to process Grandpa's voice audio, resolve vague measurements into standardized quantities, separate emotional stories from technical cooking steps, and store them in an interactive Heirloom Vault.

It also features a **Hands-Free Kitchen Companion** with voice commands ("Next step", "Repeat") and natural voice audio readout so anyone in the kitchen can cook Grandpa's recipes hands-free without getting screens greasy!

## Demo
- **Live Deployed App**: https://heirloom-ai-pi.vercel.app/
- **Key Senior Interactive Features**:
  1. 🎙️ **Voice Memory Studio**: Live microphone audio recorder with dynamic HTML5 Canvas waveform visualizer, persona selectors, and Gemma 4-bit prompt extraction pipeline.
  2. 📖 **The Heirloom Vault**: Scalable recipe gallery with unit converter (Metric vs. US Imperial), serving multiplier (1x, 2x, 3x), Recharts flavor profile radar chart, macro nutrient cards, and printable heirloom recipe card modal generator.
  3. 👨‍🍳 **Hands-Free Kitchen Companion**: Distraction-free full-screen kitchen display with Web Speech & ElevenLabs voice readout, voice command listening, interactive cooking timers, and an "Ask Grandpa's AI" assistant.
  4. 💡 **Open Innovation & Benchmarks**: Technical deep-dive with Recharts benchmark visualizations comparing on-device Gemma 4-bit latency and privacy against closed cloud models.

## Code
Project source code repository:
{% github https://github.com/vannu07/Heirloom-AI %}

- [`src/App.jsx`](https://github.com/vannu07/Heirloom-AI/blob/main/src/App.jsx): Main layout container & state manager with Framer Motion AnimatePresence and Toast system.
- [`src/components/VoiceStudio.jsx`](https://github.com/vannu07/Heirloom-AI/blob/main/src/components/VoiceStudio.jsx): Audio recorder & Gemma 4-bit extraction pipeline.
- [`src/components/RecipeVault.jsx`](https://github.com/vannu07/Heirloom-AI/blob/main/src/components/RecipeVault.jsx): Recipe gallery with serving scaler, unit converter, Recharts flavor radar, and printable cards.
- [`src/components/CookingMode.jsx`](https://github.com/vannu07/Heirloom-AI/blob/main/src/components/CookingMode.jsx): Hands-free voice cooking assistant & timer.
- [`src/components/OpenInnovationTab.jsx`](https://github.com/vannu07/Heirloom-AI/blob/main/src/components/OpenInnovationTab.jsx): Judge technical deep-dive with latency benchmarks.

## How I Built It
- **Open-Source AI Core**: Powered by open-weight **Gemma 2 / Gemma 4-bit local inference** models. The Gemma model takes raw speech-to-text transcripts, parses vague measurements into precise quantities, and structures the output into standardized JSON.
- **Frontend Stack**: Vite, React 19, Tailwind CSS v4, Framer Motion for fluid layout animations, Recharts for data visualizations, Playfair Display & Plus Jakarta Sans typography, Fira Code fonts.
- **Voice Synthesis & Control**: ElevenLabs & Web Speech API for natural step-by-step audio readout and hands-free voice commands.
- **Audio Visualizers**: HTML5 Canvas API with real-time waveform rendering and Web Audio API ambient kitchen simmer sound generator.

## Why Does Open Innovation Matter?
Open innovation was essential for building **Heirloom AI**:
1. **100% Privacy & Data Security**: Voice memos contain intimate family memories, names, and personal stories. Closed cloud APIs harvest prompt data to train commercial models. With open-weight Gemma running locally, zero personal data leaves the device.
2. **Offline Kitchen Resilience**: Kitchens often have poor WiFi reception or thick plaster walls. Local Gemma inference runs seamlessly offline on laptops or kitchen tablets without internet connection.
3. **Zero Operating Cost**: Heirloom recipes should be accessible across generations without recurring API token subscriptions.
4. **Heritage Dialect Fine-Tuning**: Open-weight Gemma allows fine-tuning on regional culinary terms (e.g. Italian "soffritto", Indian "tadka", Southern "potlikker") that proprietary generic models misinterpret.

## Prize Categories
- **Best Use of Gemma** (Featured Category)
- **Best Use of ElevenLabs** (Partner Category)
- **Best Use of Render / DigitalOcean** (Featured Category)
