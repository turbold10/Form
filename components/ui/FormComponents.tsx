import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, icon, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
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
      {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700">{label}</label>}
      <input
        className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
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
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`
        relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all duration-200
        ${selected 
          ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' 
          : 'border-slate-200 bg-white hover:border-primary-300 hover:bg-slate-50'}
      `}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className={`p-2 rounded-md ${selected ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-500'}`}>{icon}</div>}
          <div className="flex flex-col text-left">
            <span className={`text-sm font-semibold ${selected ? 'text-primary-900' : 'text-slate-900'}`}>{title}</span>
            {description && <span className={`text-xs mt-1 ${selected ? 'text-primary-700' : 'text-slate-500'}`}>{description}</span>}
          </div>
        </div>
        <div className={`
          flex h-5 w-5 items-center justify-center rounded-full border
          ${selected 
            ? 'border-primary-600 bg-primary-600 text-white' 
            : 'border-slate-300 bg-transparent'}
        `}>
          {selected && <Check size={12} strokeWidth={3} />}
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
      {label && <label className="text-sm font-medium leading-none text-slate-700">{label}</label>}
      <textarea
        className={`flex min-h-[120px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className}`}
        {...props}
      />
    </div>
  );
};
