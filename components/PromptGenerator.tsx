
import React, { useState } from 'react';
import { Camera, Type as TextIcon, Grid, Loader2, Compass } from 'lucide-react';
import ModuleHeader from './ModuleHeader';
import ImageUploader from './ImageUploader';
import ResultCard from './ResultCard';
import { 
  ARCH_STYLES, IMAGE_TYPES, BUILDING_TYPES, 
  CAMERA_ANGLES, LIGHTING_OPTIONS, ENVIRONMENTS 
} from '../constants';
import { generateArchitecturalPrompt } from '../services/geminiService';
import { HistoryItem, ModuleType } from '../types';

interface PromptGeneratorProps {
  onSaveToHistory: (item: HistoryItem) => void;
}

const PromptGenerator: React.FC<PromptGeneratorProps> = ({ onSaveToHistory }) => {
  const [mode, setMode] = useState<'image' | 'text' | 'category'>('text');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [image, setImage] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  
  const [selections, setSelections] = useState({
    style: ARCH_STYLES[0],
    imageType: IMAGE_TYPES[0],
    buildingType: BUILDING_TYPES[0],
    camera: CAMERA_ANGLES[0],
    lighting: LIGHTING_OPTIONS[0],
    environment: ENVIRONMENTS[0]
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      let output;
      if (mode === 'image' && image) {
        const base64Data = image.split(',')[1];
        output = await generateArchitecturalPrompt({ image: base64Data, mimeType: 'image/jpeg' }, false);
      } else if (mode === 'text') {
        output = await generateArchitecturalPrompt(textInput, true);
      } else {
        const promptString = `A professional ${selections.imageType} of a ${selections.style} ${selections.buildingType}, featuring ${selections.camera} view with ${selections.lighting} in a ${selections.environment} context.`;
        output = {
          ...selections,
          fullPrompt: promptString
        };
      }
      setResult(output);
    } catch (error) {
      console.error(error);
      alert('Inference Pipeline Interrupted');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <ModuleHeader 
        title="PROMPT SYNTHESIZER" 
        description="Conversion of conceptual briefs into highly-detailed technical directives for visual compute nodes." 
      />

      <div className="flex flex-wrap gap-1 mb-8 lg:mb-12 border border-[#1F2833] bg-[#0B0C10] p-1 w-fit shadow-sm">
        {[
          { id: 'text', icon: TextIcon, label: 'TEXT' },
          { id: 'image', icon: Camera, label: 'VISION' },
          { id: 'category', icon: Grid, label: 'STRUCT' }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as any)}
            className={`flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 text-[9px] lg:text-[10px] font-black tracking-[0.2em] transition-all ${
              mode === m.id ? 'bg-[#66FCF1] text-black' : 'text-[#45A29E] hover:text-[#66FCF1]'
            }`}
          >
            <m.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        <div className="lg:col-span-1 space-y-8 lg:space-y-10">
          {mode === 'image' && (
            <ImageUploader label="SOURCE VISUAL DATA" image={image} setImage={setImage} />
          )}

          {mode === 'text' && (
            <div className="space-y-3 lg:space-y-4">
              <label className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-[0.3em]">INPUT BRIEF</label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="DEFINE ARCHITECTURAL VISION..."
                className="w-full h-40 lg:h-56 p-5 lg:p-6 text-xs lg:text-[13px] bg-[#0B0C10] border border-[#1F2833] focus:outline-none focus:border-[#66FCF1] text-white placeholder:text-[#1F2833] font-medium tracking-tight"
              />
            </div>
          )}

          {mode === 'category' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {[
                { label: 'STYLE', key: 'style', options: ARCH_STYLES },
                { label: 'IMAGE TYPE', key: 'imageType', options: IMAGE_TYPES },
                { label: 'SPACE TYPE', key: 'buildingType', options: BUILDING_TYPES },
                { label: 'CAMERA', key: 'camera', options: CAMERA_ANGLES },
                { label: 'LIGHTING', key: 'lighting', options: LIGHTING_OPTIONS },
                { label: 'ENVIRONMENT', key: 'environment', options: ENVIRONMENTS }
              ].map((group) => (
                <div key={group.key} className="space-y-1.5 lg:space-y-2">
                  <label className="text-[8px] lg:text-[9px] font-black text-[#45A29E] uppercase tracking-widest">{group.label}</label>
                  <select
                    value={(selections as any)[group.key]}
                    onChange={(e) => setSelections({ ...selections, [group.key]: e.target.value })}
                    className="w-full p-3 lg:p-4 text-[10px] lg:text-[11px] bg-[#0B0C10] border border-[#1F2833] focus:border-[#66FCF1] text-[#C5C6C7] appearance-none font-black tracking-widest"
                  >
                    {group.options.map(opt => <option key={opt} value={opt} className="bg-[#0B0C10] text-white">{opt.toUpperCase()}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 lg:space-y-4">
            <label className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-[0.3em]">EXCLUSION PARAMETERS</label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="ELEMENTS TO OMIT..."
              className="w-full p-4 lg:p-5 text-[10px] lg:text-[11px] bg-[#0B0C10] border border-[#1F2833] focus:border-[#66FCF1] text-white placeholder:text-[#1F2833] font-bold uppercase tracking-widest"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || (mode === 'image' && !image) || (mode === 'text' && !textInput)}
            className="w-full py-5 lg:py-6 bg-[#66FCF1] text-black font-black text-[10px] lg:text-[11px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-[#45A29E] transition-all disabled:opacity-20 uppercase shadow-lg shadow-[#66FCF1]/10"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'COMPILE DIRECTIVE'}
          </button>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-8 lg:space-y-10">
              <ResultCard 
                title="COMPILED DIRECTIVE" 
                content={result.fullPrompt}
                onSave={() => onSaveToHistory({
                  id: Math.random().toString(36).substr(2, 9),
                  type: ModuleType.PROMPT_GEN,
                  title: `${result.style} ${result.buildingType}`,
                  content: result,
                  timestamp: Date.now(),
                  tags: [result.style]
                })}
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#1F2833] border border-[#1F2833]">
                {Object.entries(result).map(([key, value]) => (
                  key !== 'fullPrompt' && (
                    <div key={key} className="bg-[#0B0C10] p-6 lg:p-8 group border border-transparent hover:border-[#66FCF1]/30 transition-all">
                      <p className="text-[8px] lg:text-[9px] font-black text-[#45A29E] uppercase tracking-[0.2em] mb-2">{key}</p>
                      <p className="text-[10px] lg:text-[12px] font-black text-white tracking-tight uppercase leading-tight group-hover:text-[#66FCF1] transition-all">{value as string}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] lg:min-h-[500px] border border-[#1F2833] bg-[#0B0C10] flex flex-col items-center justify-center text-[#45A29E]/20 p-10 lg:p-16 text-center">
              <Compass className="w-12 h-12 lg:w-20 lg:h-20 mb-6 lg:mb-10 opacity-10" />
              <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.5em] text-[#45A29E]">AWAITING SYSTEM PARAMETERS</p>
              <p className="text-[9px] mt-4 max-w-xs text-[#1F2833] font-black uppercase tracking-widest leading-relaxed">Synthesis node idle. input data required for architectural compilation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
