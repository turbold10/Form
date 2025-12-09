import React from 'react';
import { StepWizard } from './components/StepWizard';
import { Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Minimalist Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-zinc-200 py-5 px-6 md:px-12 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight text-black">Talent<span className="font-normal italic">Request</span></span>
          </div>
          <div className="hidden md:flex text-sm font-medium text-zinc-500 gap-8">
            <span className="cursor-pointer hover:text-black transition-colors">Process</span>
            <span className="cursor-pointer hover:text-black transition-colors">Graduates</span>
            <span className="cursor-pointer hover:text-black transition-colors">Pricing</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-12">
        <div className="w-full max-w-6xl mx-auto grid place-items-center">
          <StepWizard />
        </div>
        
        <div className="mt-12 text-center text-zinc-400 text-xs tracking-wider uppercase">
          <p>© {new Date().getFullYear()} TalentRequest. Premium Engineering Talent.</p>
        </div>
      </main>
    </div>
  );
}

export default App;