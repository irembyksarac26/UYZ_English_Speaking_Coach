import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  labelEn: string;
  labelTr: string;
}

export const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  variant = 'primary',
  fullWidth = false,
  labelEn,
  labelTr,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'flex flex-col items-center justify-center rounded-2xl p-3 font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 min-h-[56px] shadow-sm';
  const variants = {
    primary: 'bg-[#0E7490] text-white hover:bg-[#0c627a] active:bg-[#0a5266]',
    secondary: 'bg-[#F59E0B] text-[#1E293B] hover:bg-[#D97706] active:bg-[#b86505]',
    outline: 'bg-white border border-slate-200 text-[#1E293B] hover:bg-slate-50',
    ghost: 'text-[#0E7490] hover:bg-teal-50 shadow-none'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon size={20} />}
        <span className="text-sm font-semibold">{labelEn}</span>
      </div>
      <span className="text-[10px] opacity-80 uppercase tracking-wider font-bold">{labelTr}</span>
    </button>
  );
};
