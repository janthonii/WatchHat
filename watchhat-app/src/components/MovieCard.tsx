interface movieCardProps {
    children: React.ReactNode;
    className?: string;
}

const MovieCard = ({children, className = ""}: movieCardProps) => {
    return (
        <div className={`shadow-md hover:shadow-[#E64833] rounded-lg p-3 bg-[#874F41] flex flex-col w-[180px] h-[310px] ${className}`}>
        {children}
    </div>
    );
};

export default MovieCard;