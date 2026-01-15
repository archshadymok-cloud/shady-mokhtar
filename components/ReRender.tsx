
import React, { useState } from 'react';
import { Layers, Loader2 } from 'lucide-react';
import ModuleHeader from './ModuleHeader';
import ImageUploader from './ImageUploader';
import ResultCard from './ResultCard';
import { RENDER_MODES, ARCH_STYLES } from '../constants';
import { generateArchitecturalImage } from '../services/geminiService';
import { HistoryItem, ModuleType } from '../types';

interface ReRenderProps {
  onSaveToHistory: (item: HistoryItem) => void;
}

const ReRender: React.FC<ReRenderProps> = ({ onSaveToHistory }) => {
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [renderMode, setRenderMode] = useState(RENDER_MODES[0]);
  const [style, setStyle] = useState(ARCH_STYLES[0]);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleReRender = async () => {
    if (!baseImage) return;
    setLoading(true);
    try {
      const base64Data = baseImage.split(',')[1];
      const finalPrompt = `A high quality architectural re-render in ${renderMode} mode. Style: ${style}. Details: ${prompt}. Maintain structural geometry.`;
      const imageUrl = await generateArchitecturalImage(finalPrompt, { data: base64Data, mimeType: 'image/jpeg' });
      setResultImage(imageUrl);
    } catch (error) {
      console.error(error);
      alert('Rendering Pipeline Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <ModuleHeader 
        title="RE-RENDER ENGINE" 
        description="Dynamic synthesis of high-fidelity architectural visuals from base geometry, sketches, or low-resolution renders." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-4 space-y-8">
          <ImageUploader label="SOURCE VISUAL" image={baseImage} setImage={setBaseImage} />
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-widest">SYNTHESIS MODE</label>
              <div className="grid grid-cols-2 gap-1 border border-[#1F2833] p-1 bg-[#0B0C10]">
                {RENDER_MODES.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setRenderMode(mode)}
                    className={`px-3 py-3 text-[8px] lg:text-[9px] font-black tracking-widest transition-all ${
                      renderMode === mode 
                        ? 'bg-[#66FCF1] text-black' 
                        : 'text-[#45A29E] hover:text-[#66FCF1]'
                    }`}
                  >
                    {mode.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-widest">TARGET STYLE</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-3 lg:p-4 text-[10px] lg:text-[11px] bg-[#0B0C10] border border-[#1F2833] focus:border-[#66FCF1] text-[#45A29E] appearance-none font-black tracking-widest"
              >
                {ARCH_STYLES.map(s => <option key={s} value={s} className="bg-[#0B0C10] text-white">{s.toUpperCase()}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-widest">MODIFICATION BRIEF</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="ADD RETRO FILTERS, REMOVE PEOPLE, OR DEFINE ATMOSPHERE..."
                className="w-full h-32 p-4 lg:p-5 text-xs bg-[#0B0C10] border border-[#1F2833] focus:border-[#66FCF1] text-white placeholder:text-[#1F2833] font-medium tracking-tight resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleReRender}
            disabled={loading || !baseImage}
            className="w-full py-5 bg-[#66FCF1] text-black font-black text-[10px] lg:text-[11px] tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#45A29E] transition-all disabled:opacity-20 shadow-lg shadow-[#66FCF1]/10"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'INITIALIZE SYNTHESIS'}
          </button>
        </div>

        <div className="lg:col-span-8">
          {resultImage ? (
            <ResultCard 
              title="SYNTHESIZED VISUAL ASSET" 
              content={`PIPELINE: ${renderMode} | STYLE: ${style} | ${prompt || 'DEFAULT'}`}
              imageUrl={resultImage}
              onSave={() => onSaveToHistory({
                id: Math.random().toString(36).substr(2, 9),
                type: ModuleType.RE_RENDER,
                title: `${style} RE-RENDER`,
                content: { mode: renderMode, style, prompt },
                imageUrl: resultImage || undefined,
                timestamp: Date.now(),
                tags: ['SYNTHESIS', style]
              })}
            />
          ) : (
            <div className="h-full min-h-[300px] lg:min-h-[600px] border border-[#1F2833] bg-[#0B0C10] flex flex-col items-center justify-center text-[#45A29E]/10 p-10 lg:p-16 text-center">
              <Layers className="w-12 h-12 lg:w-16 lg:h-16 mb-6 lg:mb-8 opacity-5" />
              <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-[#45A29E]">AWAITING VISUAL SOURCE</p>
              <p className="text-[9px] mt-4 max-w-sm text-[#1F2833] font-black uppercase tracking-widest leading-relaxed">Synthesizer will preserve original geometry while updating materiality and atmosphere based on your brief.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReRender;
