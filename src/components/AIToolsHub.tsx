import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ChevronDown, Cpu, Image as ImageIcon, Layers, Zap, X, CreditCard, 
  Key, Plus, Trash2, Copy, Eye, EyeOff, RefreshCw, MessageSquareText, 
  Settings2, Download, Maximize2, Sparkle, History, Check
} from 'lucide-react';
import { generateAi } from '@/lib/backend';

const textModels = [
  { id: 'llama3', name: 'Llama 3.3 70B Instruct', cost: '15 credits/req' },
  { id: 'qwen', name: 'QWEN 2.5 72B', cost: '10 credits/req' },
  { id: 'deepseek', name: 'DeepSeek Coder', cost: '12 credits/req' },
];

const imageModels = [
  { id: 'flux-schnell', name: 'Flux.1 [Schnell] FP8', cost: '40 credits/img' },
  { id: 'flux-dev', name: 'Flux.1 [dev] FP8', cost: '80 credits/img' },
];

const aspectRatios = [
  { id: '1:1', label: 'Square' },
  { id: '16:9', label: 'Landscape' },
  { id: '9:16', label: 'Portrait' },
];

const dummyApiKeys = [
  { id: 'ak_1', name: 'Production Key', key: 'sk-proj-****...8f2a', created: '2024-12-01', status: 'active' as const },
];

const AIToolsHub: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'text' | 'image'>('text');
  
  // States
  const [selectedTextModel, setSelectedTextModel] = useState(textModels[0].id);
  const [selectedImageModel, setSelectedImageModel] = useState(imageModels[0].id);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  
  // Modals
  const [showCredits, setShowCredits] = useState(false);
  const [showDevPortal, setShowDevPortal] = useState(false);
  const [apiKeys, setApiKeys] = useState(dummyApiKeys);
  const [showKeyId, setShowKeyId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [generationError, setGenerationError] = useState('');

  const creditsUsed = 8450;
  const creditsTotal = 10000;
  const usagePercent = (creditsUsed / creditsTotal) * 100;
  const isHighUsage = usagePercent > 90;

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const addKey = () => {
    const newKey = { id: `ak_${Date.now()}`, name: `Key ${apiKeys.length + 1}`, key: `sk-new-****...${Math.random().toString(36).slice(-4)}`, created: new Date().toISOString().split('T')[0], status: 'active' as const };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleGenerate = async () => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt || isGenerating) return;
    setGenerationError('');
    setIsGenerating(true);

    try {
      const model = activeMode === 'text' ? selectedTextModel : selectedImageModel;
      const result = await generateAi({
        mode: activeMode,
        prompt: cleanPrompt,
        model,
        systemPrompt: activeMode === 'text' ? systemPrompt : undefined,
        temperature: activeMode === 'text' ? temperature : undefined,
      });
      setGeneratedOutput(result.result);
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide bg-[#0a0a0c]">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto mt-2">
        
        {/* Header & Modes */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-fuchsia-400" />
              AI Utility Hub
            </h1>
            <p className="text-sm text-zinc-500 mt-1">Enterprise-grade synthesis engine for Web3 builders.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => setShowCredits(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-bold text-zinc-300 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all shadow-sm">
              <CreditCard className="w-4 h-4 text-emerald-400" /> 
              <span className="hidden sm:inline">Balance:</span> 1,550 Cr
            </button>
            <button onClick={() => setShowDevPortal(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-bold text-zinc-300 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all shadow-sm">
              <Key className="w-4 h-4 text-indigo-400" /> 
              <span className="hidden sm:inline">Developer</span> API
            </button>
          </div>
        </div>

        {/* Workspace Toggle */}
        <div className="mb-6 flex p-1 bg-zinc-900/80 border border-white/5 rounded-2xl w-full sm:w-max">
          <button 
            onClick={() => setActiveMode('text')}
            className={`flex-1 sm:px-8 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeMode === 'text' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <MessageSquareText className="w-4 h-4" /> Text Studio
          </button>
          <button 
            onClick={() => setActiveMode('image')}
            className={`flex-1 sm:px-8 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeMode === 'image' ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <ImageIcon className="w-4 h-4" /> Image Forge
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column — Configuration Panel */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Engine Settings */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#0f1115] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-zinc-400" />
                  Engine Parameters
                </h3>
              </div>

              <div className="space-y-5">
                {/* Model Selection */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Select Model</label>
                  <div className="relative">
                    <select
                      value={activeMode === 'text' ? selectedTextModel : selectedImageModel}
                      onChange={(e) => activeMode === 'text' ? setSelectedTextModel(e.target.value) : setSelectedImageModel(e.target.value)}
                      className="w-full appearance-none rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm font-bold text-zinc-200 focus:outline-none focus:border-indigo-500/50 pr-8 transition-colors cursor-pointer"
                    >
                      {(activeMode === 'text' ? textModels : imageModels).map((m) => (
                        <option key={m.id} value={m.id} className="bg-zinc-900 text-zinc-200">{m.name} ({m.cost})</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Text Specific: System Prompt & Temp */}
                {activeMode === 'text' && (
                  <>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 flex justify-between">
                        <span>Temperature: {temperature}</span>
                      </label>
                      <input 
                        type="range" min="0" max="1" step="0.1" 
                        value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mt-1 text-[9px] text-zinc-600 font-semibold uppercase">
                        <span>Precise</span><span>Creative</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">System Prompt (Optional)</label>
                      <textarea
                        value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)}
                        placeholder="You are an expert Web3 developer..."
                        rows={2}
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 resize-none transition-colors"
                      />
                    </div>
                  </>
                )}

                {/* Image Specific: Aspect Ratio */}
                {activeMode === 'image' && (
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Aspect Ratio</label>
                    <div className="grid grid-cols-3 gap-2">
                      {aspectRatios.map((r) => (
                        <button
                          key={r.id} onClick={() => setAspectRatio(r.id)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                            aspectRatio === r.id
                              ? 'bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300 shadow-sm'
                              : 'bg-black/40 border-white/10 text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
                          }`}
                        >
                          {r.id} <span className="block text-[9px] font-medium opacity-70 mt-0.5">{r.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Prompt Box */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#0f1115] p-5 shadow-sm">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3 block flex items-center justify-between">
                Synthesis Prompt
                <span className={`px-2 py-0.5 rounded border text-[9px] ${activeMode === 'text' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400'}`}>
                  Est. Cost: {activeMode === 'text' ? '15' : '80'} Cr
                </span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={activeMode === 'text' ? "Ask a question, write code, or draft content..." : "Describe the image in detail. E.g., A cyberpunk city with neon lights..."}
                rows={5}
                className="w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 resize-none transition-colors mb-4 shadow-inner"
              />
              <button 
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeMode === 'text' ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-fuchsia-500 hover:bg-fuchsia-600 text-white'
                }`}
              >
                <Zap className="w-4 h-4" />
                {isGenerating ? 'Generating...' : activeMode === 'text' ? 'Generate Response' : 'Generate Image'}
              </button>
            </div>
            
          </div>

          {/* Right Column — Output Canvas */}
          <div className="lg:col-span-8">
            <div className="h-full min-h-[500px] rounded-2xl border border-white/[0.06] bg-[#0f1115] overflow-hidden flex flex-col shadow-sm">
              
              {/* Canvas Header */}
              <div className="px-5 py-3 border-b border-white/[0.04] bg-black/20 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-500" /> Output Canvas
                </h3>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors" title="History"><History className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors" title="Download/Export"><Download className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors" title="Fullscreen"><Maximize2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] to-transparent">
                {generationError ? (
                  <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {generationError}
                  </div>
                ) : null}
                {generatedOutput ? (
                  <div className="h-full overflow-y-auto rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-200 whitespace-pre-wrap">
                    {generatedOutput}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-4 border ${activeMode === 'text' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400'}`}>
                      {activeMode === 'text' ? <Sparkle className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                    </div>
                    <p className="text-base font-bold text-zinc-200">Engine Ready</p>
                    <p className="text-sm text-zinc-500 mt-2 max-w-sm">
                      {activeMode === 'text' 
                        ? "Enter a prompt and adjust parameters to start synthesizing text with LLMs." 
                        : "Describe your vision to generate high-fidelity images using Flux models."}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
          
        </div>
      </div>

      {/* Credit & API Modals (Kept dark and sleek) */}
      <AnimatePresence>
        {showDevPortal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowDevPortal(false)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-[24px] bg-[#0f1115] border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/[0.05] bg-black/20">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2"><Key className="w-5 h-5 text-indigo-400" /> Developer Keys</h2>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">Manage API Access</p>
                </div>
                <button onClick={() => setShowDevPortal(false)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="p-6 space-y-4">
                {apiKeys.map((ak) => (
                  <div key={ak.id} className="rounded-xl bg-black/40 border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-zinc-200">{ak.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/[0.05]">
                          {showKeyId === ak.id ? 'sk-full-key-hidden-for-demo' : ak.key}
                        </code>
                        <button onClick={() => setShowKeyId(showKeyId === ak.id ? null : ak.id)} className="text-zinc-500 hover:text-zinc-300">
                          {showKeyId === ak.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleCopyKey(ak.key, ak.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-zinc-300 transition-colors border border-white/5">
                        {copiedKey === ak.id ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                      </button>
                      <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                <button onClick={addKey} className="w-full py-3.5 rounded-xl border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/40 text-sm font-bold text-zinc-300 transition-all flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Generate New Key
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AIToolsHub;
