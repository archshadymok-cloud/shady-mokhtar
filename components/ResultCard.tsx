
import React from 'react';
import { Copy, Download, Save } from 'lucide-react';

interface ResultCardProps {
  title: string;
  content: string;
  imageUrl?: string;
  onSave?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, content, imageUrl, onSave }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    alert('Asset Data Copied');
  };

  return (
    <div className="bg-[#1F2833] border border-[#45A29E]/20 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-xl">
      {imageUrl && (
        <div className="aspect-[16/9] w-full bg-[#0B0C10] relative group border-b border-[#1F2833]">
          <img src={imageUrl} alt="Result" className="w-full h-full object-cover transition-all" />
          <div className="absolute inset-0 bg-[#0B0C10]/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 lg:gap-8">
            <button className="px-5 lg:px-8 py-3 lg:py-4 bg-[#66FCF1] text-black font-black uppercase text-[8px] lg:text-[10px] tracking-[0.3em] hover:scale-105 transition-transform flex flex-col items-center">
              <Download className="w-4 h-4 lg:w-5 lg:h-5 mb-1.5 lg:mb-2" />
              EXPORT ASSET
            </button>
          </div>
        </div>
      )}
      <div className="p-6 lg:p-10">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <h3 className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-[#45A29E]">{title}</h3>
          <div className="flex items-center gap-4 lg:gap-6">
            <button onClick={copyToClipboard} className="text-[#C5C6C7]/50 hover:text-[#66FCF1] transition-colors" title="Copy">
              <Copy className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </button>
            <button onClick={onSave} className="text-[#C5C6C7]/50 hover:text-[#66FCF1] transition-colors" title="Save to History">
              <Save className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </button>
          </div>
        </div>
        <div className="font-mono text-[10px] lg:text-[11px] leading-relaxed text-[#C5C6C7] bg-[#0B0C10] p-5 lg:p-8 border border-[#1F2833] uppercase tracking-tight overflow-x-auto whitespace-pre-wrap break-words">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
