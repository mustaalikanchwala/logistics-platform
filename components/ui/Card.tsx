import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
    const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';

    return (
        <div
            className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${hoverStyles} ${className}`}
        >
            {children}
        </div>
    );
}
