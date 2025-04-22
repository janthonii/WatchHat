import Image from "next/image";
import Link from "next/link";
import ListCard from "./ListCard";

interface ListItemProps {
    listitem: {
        name: string;
        participants: string[]; //Use user id's
        movies: number[]; //Use movie id's
        shared: Boolean;
    };
}

const ListItem = ({listitem}:ListItemProps) => {
    return (
        <ListCard>
            <div className="flex items-center justify-center min-w-60 truncate text-xl font-bold text-[#142024]">
                <Link href={`/my-lists/list/${listitem.name}`}><h1>{listitem.name}</h1></Link>
            </div>
        </ListCard>
    )
}

export default ListItem;