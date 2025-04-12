interface listCardProps {
    children: React.ReactNode;
    className?: string;
}

const ListCard = ({children, className = ""}: listCardProps) => {
    return (
        <div className={`shadow-lg hover:shadow-orange-600 hover:shadow-md rounded-lg m-4 p-2 ${className}`} style={{backgroundColor: "#C2AD96"}}>
        {children}
    </div>
    );
};

export default ListCard;