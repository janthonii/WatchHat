interface friendCardProps {
    children: React.ReactNode;
    className?: string;
}

const FriendCard = ({children, className = ""}: friendCardProps) => {
    return (
        <div className={`flex flex-row outline-3 outline-black bg-creamy-white rounded-xl w-[420px] h-[134px] ${className}`}>
            {children}
        </div>
    );
}

export default FriendCard;