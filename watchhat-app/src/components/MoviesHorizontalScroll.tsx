'use client'
import React, { useRef, useState, useEffect } from 'react';

interface MoviesHorizontalScrollProps {
    children: React.ReactNode;
    className?: string;
}

const MoviesHorizontalScroll = ({ 
    children,
    className = ""
}: MoviesHorizontalScrollProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScroll, setCanScroll] = useState({ left: false, right: true });

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const update = () => {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setCanScroll({
                left: scrollLeft > 5,
                right: scrollLeft + clientWidth < scrollWidth - 5
            });
        };

        update(); // initial
        container.addEventListener('scroll', update);
        return () => container.removeEventListener('scroll', update);
    }, []);

    const handleArrowClick = (dir: 'left' | 'right') => {
        scrollRef.current?.scrollBy({
            left: dir === 'left' ? -300 : 300,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`relative ${className}`}>
            {canScroll.left && (
                <button
                    onClick={() => handleArrowClick('left')}
                    className="absolute top-1/2 left-[-30px] -translate-y-1/2 z-20 bg-[#142024] p-2 rounded-full shadow-lg hover:bg-[#1c2f36]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E64833]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {canScroll.right && (
                <button
                    onClick={() => handleArrowClick('right')}
                    className="absolute top-1/2 right-[-30px] -translate-y-1/2 z-20 bg-[#142024] p-2 rounded-full shadow-lg hover:bg-[#1c2f36]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E64833]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            <div
                ref={scrollRef}
                className="flex overflow-x-auto pb-4 hide-scrollbar gap-4 scroll-smooth"
            >
                {children}
            </div>
        </div>
    );
};

export default MoviesHorizontalScroll;
