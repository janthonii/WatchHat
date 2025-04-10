import Image from "next/image";
import Link from "next/link";
import ListCard from "./ListCard";

interface ListItemProps {
    listitem: {
        id: number;
        title: string;
        participants: number[]; //Use user id's
        movies: number[]; //Use movie id's
        isShared: Boolean;
    };
}

const ListItem = ({listitem}:ListItemProps) => {
    return (
        <ListCard>
            <div className="flex items-center justify-center text-xl font-bold">
                <h1 style={{color: "#142024"}}>{listitem.title}</h1>
            </div>
        </ListCard>
    )
}

export default ListItem;