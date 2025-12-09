import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData, INITIAL_DATA, JUNIOR_PERSONAS, AVAILABLE_LANGUAGES } from '../types';
import { Button, Input, SelectionCard, TextArea } from './ui/FormComponents';
import { Code2, Users, Lightbulb, Briefcase, Rocket, CheckCircle2, ChevronLeft, ChevronRight, Send, Layout, Server, Layers, Check, ArrowRight } from 'lucide-react';

const steps = [
  { id: 1, title: "Hiring Basics", icon: <Briefcase size={18} /> },
  { id: 2, title: "Technical Focus", icon: <Code2 size={18} /> },
  { id: 3, title: "Soft Skills", icon: <Users size={18} /> },
  { id: 4, title: "The X-Factor", icon: <Lightbulb size={18} /> }
];

export const StepWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Scroll to top on step change
  React.useEffect(() => {
    // Only scroll element if needed, or window
    const contentArea = document.getElementById('wizard-content');
    if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const toggleLanguage = (lang: string) => {
    const current = formData.languages;
    if (current.includes(lang)) {
      updateField('languages', current.filter(l => l !== lang));
    } else {
      updateField('languages', [...current, lang]);
    }
  };

  const togglePersona = (personaId: string) => {
    const current = formData.personas;
    if (current.includes(personaId)) {
      updateField('personas', current.filter(p => p !== personaId));
    } else {
      if (current.length < 3) {
        updateField('personas', [...current, personaId]);
      }
    }
  };

  // Validation Logic
  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.developerCount && formData.startDate;
      case 2: return formData.roadmapFocus && formData.codebaseType && formData.languages.length > 0;
      case 3: return formData.personas.length >= 2 && formData.successfulTrait;
      case 4: return true; 
      default: return true;
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-12 text-center border border-zinc-100"
      >
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-4xl font-serif font-bold text-black mb-4">Request Received</h2>
        <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
          Thank you for trusting us. Our team is now reviewing your requirements for 
          <span className="font-semibold text-black"> {formData.developerCount}</span> developer(s). 
          Expect a curated list of candidates by <span className="font-semibold text-black">{formData.startDate}</span>.
        </p>
        <Button onClick={() => window.location.reload()} className="mx-auto">Start New Request</Button>
      </motion.div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-zinc-200">
      
      {/* Sidebar - Dark & Classy */}
      <div className="w-full md:w-80 bg-zinc-950 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-900 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-white mb-2">Talent Request</h2>
            <p className="text-sm text-zinc-400">Step-by-step requirements gathering.</p>
          </div>
          
          <div className="space-y-8">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="relative flex items-center gap-4 group">
                  <div 
                    className={`
                      relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 z-10
                      ${isActive 
                        ? 'border-white bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                        : isCompleted 
                          ? 'border-zinc-700 bg-zinc-900 text-white' 
                          : 'border-zinc-800 bg-transparent text-zinc-600'}
                    `}
                  >
                     <AnimatePresence mode="wait" initial={false}>
                        {isCompleted ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                             <Check size={16} strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="icon"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                             {step.icon}
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
                  
                  {/* Connector Line */}
                  {index !== steps.length - 1 && (
                    <div className={`absolute left-5 top-10 w-[1px] h-10 -ml-px ${isCompleted ? 'bg-zinc-700' : 'bg-zinc-900'}`} />
                  )}

                  <div className="flex flex-col">
                    <span className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : isCompleted ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {step.title}
                    </span>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <motion.span 
                             animate={{ opacity: [0.5, 1, 0.5] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                             className="block text-[10px] uppercase tracking-widest text-zinc-400 mt-1 font-semibold"
                          >
                            In Progress
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-8">
           <div className="flex items-center gap-3 text-zinc-500 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>24 Candidates available now</span>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-white">
        <div id="wizard-content" className="flex-1 p-8 md:p-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full max-w-3xl mx-auto"
            >
              {/* --- STEP 1: HIRING BASICS --- */}
              {currentStep === 1 && (
                <div className="space-y-10">
                  <div className="border-b border-zinc-100 pb-6">
                    <h3 className="text-3xl font-serif font-bold text-zinc-900 mb-3">Hiring Basics</h3>
                    <p className="text-zinc-500 text-lg font-light">Let's define the volume and timeline for your team.</p>
                  </div>

                  <div className="space-y-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">How many Developers?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {["1 Developer", "2–3 Developers", "4+ Developers"].map((opt) => (
                        <SelectionCard 
                          key={opt}
                          title={opt}
                          selected={formData.developerCount === opt}
                          onClick={() => updateField('developerCount', opt)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="max-w-sm">
                    <Input 
                      type="date" 
                      label="EXPECTED START DATE" 
                      value={formData.startDate}
                      onChange={(e) => updateField('startDate', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* --- STEP 2: TECHNICAL FOCUS --- */}
              {currentStep === 2 && (
                <div className="space-y-10">
                  <div className="border-b border-zinc-100 pb-6">
                    <h3 className="text-3xl font-serif font-bold text-zinc-900 mb-3">Technical Focus</h3>
                    <p className="text-zinc-500 text-lg font-light">Specify the stack and environment nuances.</p>
                  </div>

                  <div className="space-y-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Critical Roadmap Area</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <SelectionCard 
                        title="Frontend"
                        description="React, UI, CSS"
                        icon={<Layout size={20} />}
                        selected={formData.roadmapFocus === 'Frontend'}
                        onClick={() => updateField('roadmapFocus', 'Frontend')}
                      />
                      <SelectionCard 
                        title="Backend"
                        description="Node, MongoDB, APIs"
                        icon={<Server size={20} />}
                        selected={formData.roadmapFocus === 'Backend'}
                        onClick={() => updateField('roadmapFocus', 'Backend')}
                      />
                      <SelectionCard 
                        title="Balanced"
                        description="Fullstack & Integration"
                        icon={<Layers size={20} />}
                        selected={formData.roadmapFocus === 'Balanced'}
                        onClick={() => updateField('roadmapFocus', 'Balanced')}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Codebase Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <SelectionCard 
                        title="Greenfield"
                        description="New products, blank canvas."
                        icon={<Rocket size={20} />}
                        selected={formData.codebaseType === 'Greenfield'}
                        onClick={() => updateField('codebaseType', 'Greenfield')}
                      />
                      <SelectionCard 
                        title="Legacy"
                        description="Existing codebase, refactoring."
                        icon={<Code2 size={20} />}
                        selected={formData.codebaseType === 'Legacy'}
                        onClick={() => updateField('codebaseType', 'Legacy')}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Required Languages / Tech</label>
                    <div className="flex flex-wrap gap-3">
                      {AVAILABLE_LANGUAGES.map(lang => {
                        const isSelected = formData.languages.includes(lang);
                        return (
                          <button
                            key={lang}
                            onClick={() => toggleLanguage(lang)}
                            className={`
                              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                              ${isSelected 
                                ? 'bg-black text-white border-black shadow-lg' 
                                : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'}
                            `}
                          >
                            {lang}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 3: SOFT SKILLS --- */}
              {currentStep === 3 && (
                <div className="space-y-10">
                  <div className="border-b border-zinc-100 pb-6">
                    <h3 className="text-3xl font-serif font-bold text-zinc-900 mb-3">Soft Skills & Style</h3>
                    <p className="text-zinc-500 text-lg font-light">Culture fit is the foundation of long-term success.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Which "Junior Persona" fits best?</label>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Select 2-3</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {JUNIOR_PERSONAS.map(p => (
                        <SelectionCard 
                          key={p.id}
                          title={p.title}
                          description={p.description}
                          selected={formData.personas.includes(p.id)}
                          onClick={() => togglePersona(p.id)}
                          type="checkbox"
                        />
                      ))}
                    </div>
                  </div>

                  <Input 
                    label="WHAT TRAIT MADE YOUR LAST SUCCESSFUL HIRE STAND OUT?"
                    placeholder="e.g. Curiosity, resilience, communication..."
                    value={formData.successfulTrait}
                    onChange={(e) => updateField('successfulTrait', e.target.value)}
                  />
                </div>
              )}

              {/* --- STEP 4: X-FACTOR --- */}
              {currentStep === 4 && (
                <div className="space-y-10">
                  <div className="border-b border-zinc-100 pb-6">
                    <h3 className="text-3xl font-serif font-bold text-zinc-900 mb-3">The "X-Factor"</h3>
                    <p className="text-zinc-500 text-lg font-light">Leveraging diverse backgrounds for better products.</p>
                  </div>

                  <div className="p-8 bg-zinc-50 rounded-xl border border-zinc-200 mb-6">
                    <div className="flex gap-5">
                      <div className="p-3 bg-white rounded-lg shadow-sm h-fit">
                         <Lightbulb className="text-zinc-900" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 text-lg mb-1">Diverse backgrounds matter.</h4>
                        <p className="text-zinc-600 leading-relaxed">
                          Our graduates include former musicians, nurses, and engineers. This diversity often translates to unique problem-solving approaches in code.
                        </p>
                      </div>
                    </div>
                  </div>

                  <TextArea 
                    label="NON-TECHNICAL BACKGROUND PREFERENCE?"
                    placeholder="Example: A former nurse for Health-tech, or a musician for an audio app..."
                    value={formData.nonTechnicalBackground}
                    onChange={(e) => updateField('nonTechnicalBackground', e.target.value)}
                    rows={6}
                  />
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-8 md:p-10 border-t border-zinc-100 bg-white/95 backdrop-blur-sm flex justify-between items-center sticky bottom-0 z-20">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 1 || isSubmitting}
            className={`text-zinc-400 hover:text-black ${currentStep === 1 ? 'invisible' : ''}`}
          >
            <ChevronLeft size={16} className="mr-2" /> Back
          </Button>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-xs font-bold uppercase tracking-widest text-zinc-300">
              Step {currentStep} / {steps.length}
            </div>
            <Button 
              onClick={handleNext} 
              disabled={!isStepValid() || isSubmitting}
              className="min-w-[140px] shadow-xl shadow-zinc-200"
            >
              {isSubmitting ? (
                 <span className="flex items-center">
                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Processing...
                 </span>
              ) : currentStep === steps.length ? (
                <>Submit Request <Send size={16} className="ml-2" /></>
              ) : (
                <>Next Step <ArrowRight size={16} className="ml-2" /></>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};