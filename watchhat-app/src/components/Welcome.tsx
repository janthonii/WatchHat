'use client';

const Welcome = () => { 
    
    const handleClick = () => {
        // switch to items view on this event
    };
    return (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-4xl font-bold z-10 space-y-6">
                <div>Welcome to My Page</div>
                <button onClick={handleClick}
                    className="px-6 py-3 text-lg font-semibold bg-white text-black rounded-md hover:bg-gray-300 transition">
                     View our items
                </button>
            </div>
    )};
    export default Welcome;