import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, icon, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-11 px-6";
  
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 shadow-lg active:scale-[0.98]",
    outline: "border border-zinc-200 bg-transparent hover:border-black hover:bg-zinc-50 text-zinc-900",
    ghost: "hover:bg-zinc-100 text-zinc-600 hover:text-black"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</label>}
      <input
        className={`flex h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm hover:border-zinc-300 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

// --- Selection Card (Radio/Checkbox Style) ---
interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  type?: 'radio' | 'checkbox';
}

export const SelectionCard: React.FC<SelectionCardProps> = ({ selected, onClick, title, description, icon, type = 'radio' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative flex cursor-pointer rounded-xl border p-5 focus:outline-none transition-colors duration-300
        ${selected 
          ? 'border-black bg-zinc-50 ring-1 ring-black shadow-md' 
          : 'border-zinc-200 bg-white shadow-sm hover:border-zinc-300 hover:shadow-xl'}
      `}
    >
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {icon && (
            <div className={`p-2.5 rounded-lg ${selected ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-500'} transition-colors duration-300`}>
              {icon}
            </div>
          )}
          <div className="flex flex-col text-left">
            <span className={`text-base font-bold ${selected ? 'text-black' : 'text-zinc-700'}`}>{title}</span>
            {description && <span className={`text-sm mt-1 leading-snug ${selected ? 'text-zinc-600' : 'text-zinc-400'}`}>{description}</span>}
          </div>
        </div>
        
        {/* Indicator Circle/Box */}
        <div className={`
          flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300
          ${selected 
            ? 'border-black bg-black text-white scale-110' 
            : 'border-zinc-300 bg-transparent'}
        `}>
          {selected && <Check size={14} strokeWidth={3} />}
        </div>
      </div>
    </motion.div>
  );
};

// --- Text Area ---
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</label>}
      <textarea
        className={`flex min-h-[140px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm hover:border-zinc-300 ${className}`}
        {...props}
      />
    </div>
  );
};