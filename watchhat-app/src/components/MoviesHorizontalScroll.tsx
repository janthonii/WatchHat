'use client'
import React from 'react';

interface MoviesHorizontalScrollProps {
    children: React.ReactNode;
    className?: string;
}

const MoviesHorizontalScroll = ({ 
    children,
    className = ""
}: MoviesHorizontalScrollProps) => {
    return (
        <div className={`relative ${className}`}>
            <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-4 scroll-smooth">
                {children}
            </div>
        </div>
    );
};

export default MoviesHorizontalScroll;