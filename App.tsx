import React from 'react';
import { StepWizard } from './components/StepWizard';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar Placeholder */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              T
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">Talent<span className="text-primary-600">Connect</span></span>
          </div>
          <div className="hidden md:flex text-sm text-slate-500 gap-6">
            <span className="cursor-pointer hover:text-slate-900">How it Works</span>
            <span className="cursor-pointer hover:text-slate-900">Success Stories</span>
            <span className="cursor-pointer hover:text-slate-900">For Companies</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto grid place-items-center">
          <StepWizard />
        </div>
        
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} TalentConnect. Connecting bootcamps with industry leaders.</p>
        </div>
      </main>
    </div>
  );
}

export default App;