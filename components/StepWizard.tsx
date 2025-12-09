import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData, INITIAL_DATA, JUNIOR_PERSONAS, AVAILABLE_LANGUAGES } from '../types';
import { Button, Input, SelectionCard, TextArea } from './ui/FormComponents';
import { Code2, Users, Lightbulb, Briefcase, Rocket, Calendar, CheckCircle2, ChevronLeft, ChevronRight, Send, Layout, Server, Layers, Check } from 'lucide-react';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Validation Logic (Basic)
  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.developerCount && formData.startDate;
      case 2: return formData.roadmapFocus && formData.codebaseType && formData.languages.length > 0;
      case 3: return formData.personas.length >= 2 && formData.successfulTrait;
      case 4: return true; // X-Factor optional or at least not strictly blocking for demo
      default: return true;
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-900">Request Received!</h2>
        <p className="text-slate-600 max-w-md">
          Thank you for trusting our bootcamp graduates. Our talent placement team will review your requirements for 
          <span className="font-semibold text-slate-900"> {formData.developerCount}</span> developer(s) and send you curated matches by <span className="font-semibold text-slate-900">{formData.startDate}</span>.
        </p>
        <Button onClick={() => window.location.reload()}>Start New Request</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[600px]">
      
      {/* Sidebar Progress */}
      <div className="w-full md:w-1/3 bg-slate-50 p-8 border-b md:border-b-0 md:border-r border-slate-200">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800">New Talent Request</h2>
          <p className="text-sm text-slate-500 mt-2">Find the perfect junior developer match for your team.</p>
        </div>
        
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="relative flex items-center gap-4">
                <div 
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300 z-10
                    ${isActive ? 'border-primary-600 bg-primary-600 text-white' : 
                      isCompleted ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-slate-300 bg-white text-slate-400'}
                  `}
                >
                  {isCompleted ? <Check size={18} /> : step.icon}
                </div>
                {index !== steps.length - 1 && (
                  <div className={`absolute left-5 top-10 w-0.5 h-10 -ml-px ${isCompleted ? 'bg-primary-600' : 'bg-slate-200'}`} />
                )}
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold ${isActive ? 'text-primary-800' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                  {isActive && <span className="text-xs text-primary-600 font-medium">In Progress</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {/* --- STEP 1: HIRING BASICS --- */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Hiring Basics</h3>
                    <p className="text-slate-500">Let's start with the volume and timeline.</p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 block">How many MERN developers are you looking for?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

                  <div className="max-w-xs">
                    <Input 
                      type="date" 
                      label="Expected Start Date" 
                      value={formData.startDate}
                      onChange={(e) => updateField('startDate', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* --- STEP 2: TECHNICAL FOCUS --- */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Technical Focus</h3>
                    <p className="text-slate-500">Define the tech stack and environment.</p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 block">Critical Roadmap Area</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SelectionCard 
                        title="Frontend"
                        description="React, UI, CSS, Animation"
                        icon={<Layout size={20} />}
                        selected={formData.roadmapFocus === 'Frontend'}
                        onClick={() => updateField('roadmapFocus', 'Frontend')}
                      />
                      <SelectionCard 
                        title="Backend"
                        description="Node, MongoDB, API Design"
                        icon={<Server size={20} />}
                        selected={formData.roadmapFocus === 'Backend'}
                        onClick={() => updateField('roadmapFocus', 'Backend')}
                      />
                      <SelectionCard 
                        title="Balanced"
                        description="Fullstack Capability"
                        icon={<Layers size={20} />}
                        selected={formData.roadmapFocus === 'Balanced'}
                        onClick={() => updateField('roadmapFocus', 'Balanced')}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 block">Codebase Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <SelectionCard 
                        title="Greenfield"
                        description="New products, new features, blank canvas."
                        icon={<Rocket size={20} />}
                        selected={formData.codebaseType === 'Greenfield'}
                        onClick={() => updateField('codebaseType', 'Greenfield')}
                      />
                      <SelectionCard 
                        title="Legacy"
                        description="Existing codebase, maintenance, refactoring."
                        icon={<Code2 size={20} />}
                        selected={formData.codebaseType === 'Legacy'}
                        onClick={() => updateField('codebaseType', 'Legacy')}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 block">Required Languages / Tech</label>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_LANGUAGES.map(lang => {
                        const isSelected = formData.languages.includes(lang);
                        return (
                          <button
                            key={lang}
                            onClick={() => toggleLanguage(lang)}
                            className={`
                              px-3 py-1.5 rounded-full text-sm font-medium transition-colors border
                              ${isSelected 
                                ? 'bg-primary-600 text-white border-primary-600 shadow-sm' 
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                            `}
                          >
                            {lang}
                          </button>
                        );
                      })}
                    </div>
                    {formData.languages.length === 0 && <p className="text-xs text-red-500">Please select at least one.</p>}
                  </div>
                </div>
              )}

              {/* --- STEP 3: SOFT SKILLS --- */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Soft Skills & Work Style</h3>
                    <p className="text-slate-500">Culture fit is just as important as code.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-700 block">Which "Junior Persona" fits best?</label>
                      <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded-full">
                        Select 2 - 3
                      </span>
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
                    {formData.personas.length < 2 && (
                       <p className="text-xs text-amber-600">Please select at least 2 personas.</p>
                    )}
                  </div>

                  <Input 
                    label="What trait made your last successful junior hire stand out?"
                    placeholder="e.g., They weren't afraid to say 'I don't know'..."
                    value={formData.successfulTrait}
                    onChange={(e) => updateField('successfulTrait', e.target.value)}
                  />
                </div>
              )}

              {/* --- STEP 4: X-FACTOR --- */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">The "X-Factor"</h3>
                    <p className="text-slate-500">Sometimes unique backgrounds create the best engineers.</p>
                  </div>

                  <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 mb-6">
                    <div className="flex gap-3">
                      <Lightbulb className="text-indigo-600 shrink-0" size={24} />
                      <div>
                        <h4 className="font-semibold text-indigo-900">Did you know?</h4>
                        <p className="text-sm text-indigo-700 mt-1">
                          Our bootcamp graduates come from diverse fields like nursing, teaching, music, and civil engineering. 
                          These backgrounds often provide unique problem-solving perspectives.
                        </p>
                      </div>
                    </div>
                  </div>

                  <TextArea 
                    label="Is there a non-technical background that would help in your product?"
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
        <div className="p-8 border-t border-slate-100 bg-white flex justify-between items-center sticky bottom-0 z-10">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 1 || isSubmitting}
            className={currentStep === 1 ? 'invisible' : ''}
          >
            <ChevronLeft size={16} className="mr-2" /> Back
          </Button>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-xs font-medium text-slate-400">
              Step {currentStep} of {steps.length}
            </div>
            <Button 
              onClick={handleNext} 
              disabled={!isStepValid() || isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                 <span className="flex items-center">
                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Sending...
                 </span>
              ) : currentStep === steps.length ? (
                <>Submit Request <Send size={16} className="ml-2" /></>
              ) : (
                <>Next Step <ChevronRight size={16} className="ml-2" /></>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};