import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  fullWidth = false, 
  ...props 
}) => {
  const baseStyles = "py-4 px-6 rounded-2xl font-bold text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-violet-600 text-white shadow-lg hover:bg-violet-700 shadow-violet-200",
    secondary: "bg-violet-100 text-violet-700 hover:bg-violet-200",
    outline: "border-2 border-violet-200 text-violet-600 hover:border-violet-600 hover:bg-violet-50",
    ghost: "bg-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100"
  };

  return (
    <button
      className={twMerge(
        baseStyles,
        variants[variant],
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;