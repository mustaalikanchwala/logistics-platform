import React from 'react';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    light?: boolean;
}

export default function SectionHeading({
    title,
    subtitle,
    centered = false,
    light = false,
}: SectionHeadingProps) {
    const textColor = light ? 'text-white' : 'text-[#0C2B4E]';
    const subtitleColor = light ? 'text-gray-200' : 'text-gray-600';
    const alignment = centered ? 'text-center' : 'text-left';

    return (
        <div className={`mb-12 ${alignment}`}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textColor}`}>
                {title}
            </h2>
            {subtitle && (
                <p className={`text-lg md:text-xl ${subtitleColor} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
