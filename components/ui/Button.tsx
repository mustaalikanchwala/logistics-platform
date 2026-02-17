import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    type = 'button',
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-in-out';

    const variantStyles = {
        primary: 'bg-[#1D546C] text-white hover:bg-[#164558] hover:shadow-lg hover:scale-105',
        secondary: 'bg-[#1A3D64] text-white hover:bg-[#0C2B4E] hover:shadow-lg hover:scale-105',
        outline: 'border-2 border-[#1D546C] text-[#1D546C] hover:bg-[#1D546C] hover:text-white hover:shadow-lg',
    };

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={combinedClassName}>
            {children}
        </button>
    );
}
