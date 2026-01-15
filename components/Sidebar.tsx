
import React from 'react';
import { 
  Compass, 
  Layers, 
  Lightbulb, 
  Box, 
  History,
  Layout,
  Home
} from 'lucide-react';
import { ModuleType } from '../types';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const navItems = [
    { id: ModuleType.HOME, icon: Home, label: 'SYSTEM HOME' },
    { id: ModuleType.PROMPT_GEN, icon: Compass, label: 'PROMPT GENERATOR' },
    { id: ModuleType.RE_RENDER, icon: Layers, label: 'RE-RENDER ENGINE' },
    { id: ModuleType.IDEAS_GEN, icon: Lightbulb, label: 'IDEAS & CONCEPT' },
    { id: ModuleType.PLAN_TO_3D, icon: Box, label: '2D PLANS TO 3D' },
    { id: ModuleType.HISTORY, icon: History, label: 'HISTORY LIBRARY' },
  ];

  return (
    <div className="w-64 bg-[#0B0C10] border-r border-[#1F2833] flex flex-col h-full shrink-0 z-20">
      <div className="p-10 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Layout className="w-5 h-5 text-[#66FCF1]" />
          <h1 className="text-lg font-black tracking-tighter uppercase text-white">SH DESIGNS</h1>
        </div>
        <p className="text-[8px] text-[#45A29E] font-black tracking-[0.4em] uppercase">Architecture v2.5</p>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] font-black tracking-widest transition-all ${
              activeModule === item.id
                ? 'bg-[#1F2833] text-[#66FCF1] border-r-4 border-[#66FCF1]'
                : 'text-[#45A29E] hover:text-[#66FCF1] hover:bg-[#1F2833]/50'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-8 border-t border-[#1F2833]">
        <div className="bg-[#1F2833] p-6 border border-[#45A29E]/20">
          <p className="text-[9px] font-black text-white mb-1 uppercase tracking-widest">DESIGN HUB</p>
          <p className="text-[9px] text-[#45A29E] mb-5 font-bold uppercase tracking-tight">Cloud Instance: BERT</p>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <div key={i} className={`h-1 flex-1 ${i < 4 ? 'bg-[#66FCF1]' : 'bg-[#0B0C10]'}`}></div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
