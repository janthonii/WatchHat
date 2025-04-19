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
            <div className="flex items-center justify-center text-xl font-bold text-[#142024]">
                <Link href={`/my-lists/list/${listitem.id}`}><h1>{listitem.title}</h1></Link>
            </div>
        </ListCard>
    )
}

export default ListItem;