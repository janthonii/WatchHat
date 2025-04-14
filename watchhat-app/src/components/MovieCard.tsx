interface movieCardProps {
    children: React.ReactNode;
    className?: string;
}

const MovieCard = ({children, className = ""}: movieCardProps) => {
    return (
        <div className={`shadow-md hover:shadow-[#E64833] rounded-lg m-4 p-2  bg-[#874F41] h-fit w-60 ${className}`}>
        {children}
    </div>
    );
};

export default MovieCard;