import Image from "next/image";
import Link from "next/link";
import FriendCard from "./FriendCard"

interface FriendItemProps {
    friendItem: {
        id: number;
        username: string;
    };
}

const FriendItem = ({ friendItem }: FriendItemProps) => {
    return (
        <FriendCard>
            <div className="flex font-bold text-center">
                
            </div>
        </FriendCard>
    );
}

export default FriendItem;