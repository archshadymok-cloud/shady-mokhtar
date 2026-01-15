
import React, { useState } from 'react';
import { Lightbulb, Camera, Type as TextIcon, Loader2, Cpu } from 'lucide-react';
import ModuleHeader from './ModuleHeader';
import ImageUploader from './ImageUploader';
import { generateConcept } from '../services/geminiService';
import { HistoryItem, ModuleType } from '../types';

interface ConceptGeneratorProps {
  onSaveToHistory: (item: HistoryItem) => void;
}

const ConceptGenerator: React.FC<ConceptGeneratorProps> = ({ onSaveToHistory }) => {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      let output;
      if (mode === 'image' && image) {
        const base64Data = image.split(',')[1];
        output = await generateConcept({ image: base64Data, mimeType: 'image/jpeg' }, false);
      } else {
        output = await generateConcept(input, true);
      }
      setResult(output);
    } catch (error) {
      console.error(error);
      alert('Cognitive Synthesis Fault');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <ModuleHeader 
        title="CONCEPTUAL ENGINE" 
        description="Deep theoretical synthesis and design narrative production utilizing maximized cognitive thinking budgets." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4 space-y-8 lg:space-y-10">
          <div className="flex border border-[#1F2833] p-1 bg-[#0B0C10]">
            <button
              onClick={() => setMode('text')}
              className={`flex-1 flex items-center justify-center gap-3 lg:gap-4 py-3 lg:py-4 text-[9px] lg:text-[10px] font-black tracking-widest transition-all ${
                mode === 'text' ? 'bg-[#66FCF1] text-black' : 'text-[#45A29E] hover:text-[#66FCF1]'
              }`}
            >
              <TextIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> BRIEF
            </button>
            <button
              onClick={() => setMode('image')}
              className={`flex-1 flex items-center justify-center gap-3 lg:gap-4 py-3 lg:py-4 text-[9px] lg:text-[10px] font-black tracking-widest transition-all ${
                mode === 'image' ? 'bg-[#66FCF1] text-black' : 'text-[#45A29E] hover:text-[#66FCF1]'
              }`}
            >
              <Camera className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> VISION
            </button>
          </div>

          {mode === 'text' ? (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="DEFINE THEORETICAL PARAMETERS..."
              className="w-full h-64 lg:h-96 p-6 lg:p-8 text-xs lg:text-[13px] bg-[#0B0C10] border border-[#1F2833] focus:border-[#66FCF1] text-white placeholder:text-[#1F2833] font-medium leading-relaxed resize-none"
            />
          ) : (
            <ImageUploader label="INSPIRATION DATASET" image={image} setImage={setImage} />
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || (mode === 'text' && !input) || (mode === 'image' && !image)}
            className="w-full py-5 lg:py-6 bg-[#66FCF1] text-black font-black text-[10px] lg:text-[11px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-[#45A29E] transition-all disabled:opacity-20 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" />
                ANALYZING...
              </>
            ) : 'SYNTHESIZE'}
          </button>
        </div>

        <div className="lg:col-span-8">
          {result ? (
            <div className="space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="bg-[#1F2833] border border-[#45A29E]/20 p-8 lg:p-12 shadow-2xl">
                <div className="flex justify-between items-start mb-8 lg:mb-12 border-b border-[#0B0C10] pb-8 lg:pb-10">
                  <div>
                    <span className="text-[8px] lg:text-[9px] font-black text-[#66FCF1] uppercase tracking-[0.4em] block mb-2 lg:mb-3 leading-none">THEORY IDENTIFIER</span>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-[0.8]">{result.name}</h3>
                  </div>
                  <Cpu className="w-8 h-8 lg:w-10 lg:h-10 text-[#66FCF1] opacity-20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                  <div className="space-y-8 lg:space-y-12">
                    <div>
                      <h4 className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-[0.3em] mb-4 lg:mb-6">CORE THESIS</h4>
                      <p className="text-sm lg:text-[16px] font-bold text-white leading-snug tracking-tight uppercase italic border-l-[2px] border-[#66FCF1] pl-5 lg:pl-6">{result.mainIdea}</p>
                    </div>
                    <div>
                      <h4 className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-[0.3em] mb-4 lg:mb-6">SPATIAL NARRATIVE</h4>
                      <p className="text-[12px] lg:text-[13px] text-[#C5C6C7]/60 leading-relaxed font-medium">{result.narrative}</p>
                    </div>
                  </div>

                  <div className="space-y-8 lg:space-y-12">
                    <div>
                      <h4 className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-[0.3em] mb-4 lg:mb-6">FORMAL STRATEGY</h4>
                      <p className="text-[12px] lg:text-[13px] text-white font-bold bg-[#0B0C10] p-6 lg:p-8 border border-[#1F2833] leading-relaxed uppercase tracking-tight">
                        "{result.formApproach}"
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-[0.3em] mb-4 lg:mb-6">MATERIAL PALETTE</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.materials.map((m: string) => (
                          <span key={m} className="px-3 lg:px-4 py-1.5 lg:py-2 bg-[#0B0C10] border border-[#1F2833] text-[8px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-widest hover:text-[#66FCF1] transition-all">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 lg:mt-16 pt-8 lg:pt-10 border-t border-[#0B0C10] flex flex-col sm:flex-row gap-6 justify-between items-center">
                   <div className="flex flex-wrap justify-center sm:justify-start gap-3 lg:gap-4">
                        {result.keywords.map((k: string) => (
                          <span key={k} className="text-[9px] lg:text-[10px] font-black text-[#66FCF1] tracking-[0.2em]">
                            #{k.toUpperCase()}
                          </span>
                        ))}
                    </div>
                    <button 
                      onClick={() => onSaveToHistory({
                        id: Math.random().toString(36).substr(2, 9),
                        type: ModuleType.IDEAS_GEN,
                        title: result.name,
                        content: result,
                        timestamp: Date.now(),
                        tags: result.keywords
                      })}
                      className="w-full sm:w-auto px-6 lg:px-10 py-3 lg:py-4 bg-[#0B0C10] text-[#66FCF1] text-[9px] lg:text-[10px] font-black tracking-[0.3em] hover:bg-[#66FCF1] hover:text-black transition-all border border-[#1F2833]"
                    >
                      ARCHIVE ASSET
                    </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] lg:min-h-[600px] border border-[#1F2833] bg-[#0B0C10] flex flex-col items-center justify-center text-[#45A29E]/10 p-10 lg:p-20 text-center">
              <Cpu className="w-16 h-16 lg:w-24 lg:h-24 mb-6 lg:mb-12 opacity-5 animate-pulse text-[#66FCF1]" />
              <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.6em] text-[#45A29E]">AWAITING LOGIC</p>
              <p className="text-[9px] mt-4 max-w-sm text-[#1F2833] font-black uppercase tracking-widest leading-relaxed">Synthesis of architectural theory requires cognitive processing. Input parameters to initialize.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptGenerator;
