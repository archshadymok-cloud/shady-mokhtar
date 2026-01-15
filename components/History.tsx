
import React from 'react';
import { History as HistoryIcon, Search, Tag, Trash2, ExternalLink } from 'lucide-react';
import ModuleHeader from './ModuleHeader';
import { HistoryItem, ModuleType } from '../types';

interface HistoryProps {
  history: HistoryItem[];
  onRemove: (id: string) => void;
  onReuse: (item: HistoryItem) => void;
}

const History: React.FC<HistoryProps> = ({ history, onRemove, onReuse }) => {
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <ModuleHeader 
        title="ARCHIVE & LIBRARY" 
        description="Persistent storage of synthesized architectural directives, visual assets, and conceptual narratives." 
      />

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-10 lg:mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#45A29E]" />
          <input 
            type="text" 
            placeholder="FILTER ARCHIVE..."
            className="w-full pl-12 pr-6 py-4 text-[10px] lg:text-[11px] bg-[#0B0C10] border border-[#1F2833] focus:border-[#66FCF1] text-white placeholder:text-[#1F2833] font-black tracking-widest outline-none"
          />
        </div>
        <div className="flex overflow-x-auto gap-1 border border-[#1F2833] bg-[#0B0C10] p-1 scrollbar-hide">
          {['ALL', 'PROMPTS', 'RENDERS', 'CONCEPTS'].map(f => (
            <button key={f} className="whitespace-nowrap px-4 sm:px-6 py-2 text-[8px] lg:text-[9px] font-black tracking-widest text-[#45A29E] hover:text-[#66FCF1] transition-colors">
              {f}
            </button>
          ))}
        </div>
      </div>

      {history.length === 0 ? (
        <div className="min-h-[300px] lg:min-h-[400px] border border-[#1F2833] bg-[#0B0C10] flex flex-col items-center justify-center text-[#45A29E]/10 p-10 lg:p-12 text-center">
          <HistoryIcon className="w-12 h-12 lg:w-16 lg:h-16 mb-6 lg:mb-8 opacity-5" />
          <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-[#45A29E]">ARCHIVE EMPTY</p>
          <p className="text-[9px] mt-4 max-w-sm text-[#1F2833] font-black uppercase tracking-widest leading-relaxed">Generated assets will be indexed here for session persistence.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {history.map((item) => (
            <div key={item.id} className="group bg-[#0B0C10] border border-[#1F2833] overflow-hidden hover:border-[#66FCF1]/50 transition-all shadow-lg">
              {item.imageUrl && (
                <div className="aspect-[16/9] w-full bg-[#1F2833] relative overflow-hidden border-b border-[#1F2833]">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-[#0B0C10]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => onReuse(item)} className="px-5 py-2.5 bg-[#66FCF1] text-black text-[9px] font-black tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5" /> RESTORE
                    </button>
                  </div>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[7px] font-black uppercase tracking-[0.2em] px-2 py-1 border border-[#1F2833] text-[#45A29E]">
                    {item.type.replace('-', ' ')}
                  </span>
                  <span className="text-[8px] text-[#45A29E] font-black">{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <h4 className="text-[10px] lg:text-[11px] font-black text-white mb-6 tracking-tight line-clamp-1 uppercase">{item.title}</h4>
                <div className="flex items-center justify-between pt-4 border-t border-[#1F2833]">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3 h-3 text-[#1F2833]" />
                    <span className="text-[8px] text-[#45A29E] font-black uppercase">{item.tags[0]}</span>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-[#45A29E] hover:text-red-900 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
