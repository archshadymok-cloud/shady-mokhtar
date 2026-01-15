
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import PromptGenerator from './components/PromptGenerator';
import ReRender from './components/ReRender';
import ConceptGenerator from './components/ConceptGenerator';
import PlanTo3D from './components/PlanTo3D';
import History from './components/History';
import { ModuleType, HistoryItem } from './types';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.HOME);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sh_designs_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (item: HistoryItem) => {
    const newHistory = [item, ...history];
    setHistory(newHistory);
    localStorage.setItem('sh_designs_history', JSON.stringify(newHistory));
    alert('Saved to Library');
  };

  const removeHistoryItem = (id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem('sh_designs_history', JSON.stringify(newHistory));
  };

  const reuseHistoryItem = (item: HistoryItem) => {
    setActiveModule(item.type);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleModuleChange = (module: ModuleType) => {
    setActiveModule(module);
    setIsSidebarOpen(false);
  };

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.HOME:
        return <Home setActiveModule={handleModuleChange} recentHistory={history} />;
      case ModuleType.PROMPT_GEN:
        return <PromptGenerator onSaveToHistory={saveToHistory} />;
      case ModuleType.RE_RENDER:
        return <ReRender onSaveToHistory={saveToHistory} />;
      case ModuleType.IDEAS_GEN:
        return <ConceptGenerator onSaveToHistory={saveToHistory} />;
      case ModuleType.PLAN_TO_3D:
        return <PlanTo3D onSaveToHistory={saveToHistory} />;
      case ModuleType.HISTORY:
        return <History 
          history={history} 
          onRemove={removeHistoryItem} 
          onReuse={reuseHistoryItem} 
        />;
      default:
        return <Home setActiveModule={handleModuleChange} recentHistory={history} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0C10] text-[#C5C6C7] selection:bg-[#66FCF1] selection:text-black">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive Drawer */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar activeModule={activeModule} setActiveModule={handleModuleChange} />
      </div>
      
      <main className="flex-1 overflow-y-auto pt-6 lg:pt-10 px-4 sm:px-8 lg:px-12 pb-24 scroll-smooth">
        <div className="max-w-7xl mx-auto w-full">
          <header className="flex justify-between items-center mb-10 lg:mb-16">
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Hamburger Menu */}
              <button 
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-[#66FCF1] bg-[#1F2833] border border-[#45A29E]/30"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:block h-[2px] w-8 lg:w-12 bg-[#66FCF1]"></div>
              <div>
                <p className="text-[8px] lg:text-[9px] font-black text-[#45A29E] uppercase tracking-[0.4em] mb-1 leading-none">STATUS: ACTIVE</p>
                <h2 className="text-[10px] lg:text-[11px] font-black text-white tracking-widest uppercase leading-none">{activeModule.replace('-', ' ')}</h2>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
              <div className="text-right hidden md:block">
                 <p className="text-[9px] font-black text-[#45A29E] uppercase tracking-widest leading-none">INFRASTRUCTURE</p>
                 <p className="text-[10px] font-black text-white leading-none mt-1">NEXUS_CORE_CYAN</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#1F2833] border border-[#45A29E]/30 flex items-center justify-center text-[9px] lg:text-[10px] font-black text-[#66FCF1] shadow-sm">
                SH
              </div>
            </div>
          </header>

          <div className="relative">
            {renderModule()}
          </div>
        </div>
      </main>

      {/* Responsive Footer */}
      <footer className="fixed bottom-0 right-0 left-0 lg:left-64 h-14 bg-[#0B0C10]/95 backdrop-blur-md border-t border-[#1F2833] px-6 lg:px-12 flex items-center justify-between text-[8px] lg:text-[10px] text-[#45A29E] font-black tracking-[0.2em] lg:tracking-[0.3em] uppercase z-10">
        <div className="flex gap-4 lg:gap-10">
          <span className="flex items-center gap-2">
            <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-[#66FCF1] rounded-full animate-pulse"></div> 
            NOMINAL
          </span>
          <span className="hidden xs:inline">LATENCY: 0.006S</span>
        </div>
        <div className="flex gap-4 lg:gap-10">
          <span className="hidden sm:inline">BERT_SYSTEM_V2.5</span>
          <span className="text-[#66FCF1]">© 2025 SH DESIGNS</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
