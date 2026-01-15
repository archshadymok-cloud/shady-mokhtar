
import React from 'react';

interface ModuleHeaderProps {
  title: string;
  description: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-10 lg:mb-16">
      <div className="flex items-baseline gap-4 lg:gap-6 mb-4 lg:mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter leading-none">{title}</h2>
        <div className="h-[2px] flex-1 bg-[#1F2833]"></div>
      </div>
      <p className="text-[#45A29E] max-w-2xl text-[11px] lg:text-[13px] leading-relaxed font-medium uppercase tracking-widest">{description}</p>
    </div>
  );
};

export default ModuleHeader;
