
import React, { useState } from 'react';
import { Box, Loader2, MessageSquareText, Info } from 'lucide-react';
import ModuleHeader from './ModuleHeader';
import ImageUploader from './ImageUploader';
import ResultCard from './ResultCard';
import { PLAN_PRESET_DETAILS } from '../constants';
import { generateArchitecturalImage } from '../services/geminiService';
import { HistoryItem, ModuleType } from '../types';

interface PlanTo3DProps {
  onSaveToHistory: (item: HistoryItem) => void;
}

const PlanTo3D: React.FC<PlanTo3DProps> = ({ onSaveToHistory }) => {
  const [planImage, setPlanImage] = useState<string | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState(PLAN_PRESET_DETAILS[0].id);
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const selectedPreset = PLAN_PRESET_DETAILS.find(p => p.id === selectedPresetId) || PLAN_PRESET_DETAILS[0];

  const handleConvert = async () => {
    if (!planImage) return;
    setLoading(true);
    try {
      const base64Data = planImage.split(',')[1];
      const finalPrompt = `A stunning 3D architectural visualization generated from this 2D plan. Style: ${selectedPreset.name}. Refinement: ${customPrompt}. High resolution 3D render.`;
      const imageUrl = await generateArchitecturalImage(finalPrompt, { data: base64Data, mimeType: 'image/jpeg' }, "16:9");
      setResultImage(imageUrl);
    } catch (error) {
      console.error(error);
      alert('Visualization Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <ModuleHeader 
        title="PLAN TO 3D" 
        description="Dimensional extrusion of 2D geometry into immersive 3D massing using precise style intelligence." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-4 space-y-8">
          <ImageUploader label="DRAWING SOURCE" image={planImage} setImage={setPlanImage} />

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-widest">STYLE PRESET</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1 max-h-[300px] lg:max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {PLAN_PRESET_DETAILS.map((p) => (
                  <div key={p.id} className="relative group/tooltip">
                    <button
                      onClick={() => setSelectedPresetId(p.id)}
                      className={`w-full text-left px-4 lg:px-5 py-3 lg:py-4 text-[9px] lg:text-[10px] font-black tracking-widest border transition-all flex items-center justify-between ${
                        selectedPresetId === p.id 
                          ? 'bg-[#66FCF1] text-black border-[#66FCF1]' 
                          : 'bg-[#0B0C10] text-[#45A29E] border-[#1F2833] hover:border-[#66FCF1]'
                      }`}
                    >
                      {p.name.toUpperCase()}
                      <Info className="w-3 h-3 opacity-30" />
                    </button>
                    
                    {/* Tooltip Hidden on Small Screens for Space */}
                    <div className="hidden md:block absolute left-full ml-6 top-0 w-72 p-6 bg-black border border-[#1F2833] shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 pointer-events-none">
                       <p className="text-[8px] font-black text-[#45A29E] uppercase tracking-[0.2em] mb-3">CHARACTERISTICS</p>
                       <p className="text-[10px] text-white leading-relaxed font-bold italic mb-4">"{p.description}"</p>
                       <div className="space-y-4 pt-4 border-t border-[#1F2833]">
                          <div>
                            <p className="text-[7px] font-black text-[#45A29E] uppercase tracking-widest mb-1">MATERIALS</p>
                            <p className="text-[9px] text-white font-bold">{p.materials.join(', ').toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-[7px] font-black text-[#45A29E] uppercase tracking-widest mb-1">MORPHOLOGY</p>
                            <p className="text-[9px] text-white font-bold">{p.forms.toUpperCase()}</p>
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-widest">REFINEMENT DIRECTIVES</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="ADD CUSTOM PARAMETERS..."
                className="w-full h-24 lg:h-32 p-4 lg:p-5 text-xs bg-[#0B0C10] border border-[#1F2833] focus:border-[#66FCF1] text-white placeholder:text-[#1F2833] font-medium tracking-tight resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading || !planImage}
            className="w-full py-5 bg-[#66FCF1] text-black font-black text-[10px] lg:text-[11px] tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#45A29E] transition-all disabled:opacity-20 shadow-lg shadow-[#66FCF1]/10"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'EXECUTE EXTRUSION'}
          </button>
        </div>

        <div className="lg:col-span-8">
          {resultImage ? (
            <ResultCard 
              title="DIMENSIONAL OUTPUT" 
              content={`PRESET: ${selectedPreset.name} | REFINEMENT: ${customPrompt || 'NONE'}`}
              imageUrl={resultImage}
              onSave={() => onSaveToHistory({
                id: Math.random().toString(36).substr(2, 9),
                type: ModuleType.PLAN_TO_3D,
                title: `${selectedPreset.name} EXTRUSION`,
                content: { preset: selectedPreset.name, customPrompt },
                imageUrl: resultImage || undefined,
                timestamp: Date.now(),
                tags: ['3D', selectedPreset.name]
              })}
            />
          ) : (
            <div className="h-full min-h-[300px] lg:min-h-[600px] border border-[#1F2833] bg-[#0B0C10] flex flex-col items-center justify-center text-[#45A29E]/10 p-10 lg:p-16 text-center">
              <Box className="w-12 h-12 lg:w-16 lg:h-16 mb-6 lg:mb-8 opacity-5" />
              <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-[#45A29E]">AWAITING SOURCE</p>
              <p className="text-[9px] mt-4 max-w-sm text-[#1F2833] font-black uppercase tracking-widest leading-relaxed">Spatial analysis engine will translate 2D lines into high-fidelity volumetric renders.</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0B0C10;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1F2833;
        }
      `}</style>
    </div>
  );
};

export default PlanTo3D;
