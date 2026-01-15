
import React from 'react';
import { 
  Compass, 
  Layers, 
  Lightbulb, 
  Box, 
  ArrowRight,
  Activity,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { ModuleType, HistoryItem } from '../types';

interface HomeProps {
  setActiveModule: (module: ModuleType) => void;
  recentHistory: HistoryItem[];
}

const Home: React.FC<HomeProps> = ({ setActiveModule, recentHistory }) => {
  const tools = [
    {
      id: ModuleType.PROMPT_GEN,
      title: 'Prompt Generator',
      desc: 'Synthesize high-fidelity architectural directives from raw concepts.',
      icon: Compass,
      model: 'Flash Lite 2.5'
    },
    {
      id: ModuleType.RE_RENDER,
      title: 'Re-Render Engine',
      desc: 'Transform base geometry into professional visual assets.',
      icon: Layers,
      model: 'Flash Image 2.5'
    },
    {
      id: ModuleType.IDEAS_GEN,
      title: 'Conceptual Engine',
      desc: 'Deep theoretical analysis and design narrative generation.',
      icon: Lightbulb,
      model: 'Pro 3 (Thinking)'
    },
    {
      id: ModuleType.PLAN_TO_3D,
      title: 'Plan to 3D',
      desc: 'Extrude 2D spatial lines into immersive volumetric renders.',
      icon: Box,
      model: 'Flash Image 2.5'
    }
  ];

  return (
    <div className="space-y-10 lg:space-y-16 pb-12 animate-in fade-in duration-1000">
      <section className="relative overflow-hidden pt-6 lg:pt-12">
        <div className="relative border-l-[3px] border-[#66FCF1] pl-5 lg:pl-8 py-2">
          <p className="text-[9px] lg:text-[11px] font-black text-[#45A29E] uppercase tracking-[0.5em] mb-4 leading-none">ARCHITECTURAL INTELLIGENCE</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase mb-6 lg:mb-8">
            STUDIO<br/><span className="text-[#66FCF1]">BERT V2.5</span>
          </h1>
          <p className="text-[#C5C6C7] max-w-xl text-xs lg:text-sm leading-relaxed font-medium uppercase tracking-tight">
            Advanced neural environment for architects and spatial designers. 
            Automated visual production and theoretical synthesis via private inference clusters.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1F2833] border border-[#1F2833] shadow-lg">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveModule(tool.id)}
            className="group relative bg-[#0B0C10] p-8 lg:p-12 text-left transition-all hover:bg-[#1F2833] flex flex-col justify-between h-64 sm:h-72 lg:h-80"
          >
            <div>
              <div className="flex justify-between items-start mb-6 lg:mb-8">
                <tool.icon className="w-5 h-5 lg:w-6 lg:h-6 text-[#66FCF1]" />
                <span className="text-[8px] lg:text-[9px] font-black text-[#45A29E] uppercase tracking-widest border border-[#1F2833] px-2 lg:px-3 py-1">{tool.model}</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-white uppercase tracking-tighter mb-3 lg:mb-4 group-hover:text-[#66FCF1] group-hover:translate-x-1 transition-all">{tool.title}</h3>
              <p className="text-[11px] lg:text-[13px] text-[#C5C6C7]/60 leading-relaxed font-medium pr-8 lg:pr-12 line-clamp-2">{tool.desc}</p>
            </div>
            <div className="flex items-center gap-3 text-[9px] lg:text-[10px] font-black text-[#66FCF1] uppercase tracking-[0.2em] mt-6 lg:mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
              Initialize Module <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        <div className="lg:col-span-2 space-y-8 lg:space-y-10">
          <div className="flex items-center justify-between border-b border-[#1F2833] pb-4 lg:pb-5">
            <h2 className="text-[10px] lg:text-[11px] font-black text-white uppercase tracking-[0.4em]">SESSION ARCHIVE</h2>
            <button onClick={() => setActiveModule(ModuleType.HISTORY)} className="text-[9px] lg:text-[10px] font-black text-[#45A29E] uppercase tracking-widest hover:text-[#66FCF1] transition-colors">Open Library</button>
          </div>
          
          {recentHistory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {recentHistory.slice(0, 4).map((item) => (
                <div key={item.id} className="bg-[#1F2833] border border-transparent p-4 lg:p-5 flex gap-4 lg:gap-5 items-center group cursor-pointer hover:border-[#66FCF1] transition-all shadow-sm" onClick={() => setActiveModule(ModuleType.HISTORY)}>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#0B0C10] shrink-0 overflow-hidden border border-[#1F2833]">
                    {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all" /> : <Activity className="w-full h-full p-4 lg:p-6 text-[#45A29E]" />}
                  </div>
                  <div>
                    <p className="text-[8px] lg:text-[9px] font-black text-[#66FCF1] uppercase mb-1 tracking-widest">{item.type.replace('-', ' ')}</p>
                    <p className="text-[10px] lg:text-[12px] font-black text-white line-clamp-1 uppercase tracking-tight">{item.title}</p>
                    <p className="text-[8px] lg:text-[9px] font-bold text-[#45A29E] mt-1">{new Date(item.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 lg:py-20 border border-dashed border-[#1F2833] flex flex-col items-center justify-center text-[#45A29E]/30">
               <Activity className="w-8 h-8 lg:w-10 lg:h-10 mb-4 lg:mb-6 opacity-20" />
               <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em]">Awaiting Output Data</p>
            </div>
          )}
        </div>

        <div className="space-y-8 lg:space-y-10">
          <div className="border-b border-[#1F2833] pb-4 lg:pb-5">
            <h2 className="text-[10px] lg:text-[11px] font-black text-white uppercase tracking-[0.4em]">SYSTEM CORE</h2>
          </div>
          <div className="space-y-4 lg:space-y-6">
            <div className="bg-[#1F2833] p-5 lg:p-6 flex items-center gap-4 lg:gap-5 shadow-sm">
              <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-[#66FCF1]" />
              <div>
                <p className="text-[9px] lg:text-[10px] font-black text-white uppercase mb-1">Compute State</p>
                <p className="text-[8px] lg:text-[9px] text-[#45A29E] font-bold uppercase tracking-tight">Optimization: 100%</p>
              </div>
            </div>
            <div className="bg-[#1F2833] p-5 lg:p-6 flex items-center gap-4 lg:gap-5 shadow-sm">
              <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-[#45A29E]" />
              <div>
                <p className="text-[9px] lg:text-[10px] font-black text-white uppercase mb-1">Encryption</p>
                <p className="text-[8px] lg:text-[9px] text-[#45A29E] font-bold uppercase tracking-tight">Active Nexus Node</p>
              </div>
            </div>
            <div className="p-5 lg:p-6 border border-[#1F2833] bg-[#0B0C10]">
              <p className="text-[8px] lg:text-[9px] font-black text-[#45A29E] uppercase tracking-[0.2em] mb-3 lg:mb-4">RESOURCE ALLOCATION</p>
              <div className="h-1 bg-[#1F2833]">
                <div className="h-full bg-[#66FCF1] w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
