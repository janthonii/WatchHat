'use client'
import ListItem from "./ListItem";
import {useState, useEffect} from 'react';
import AddList from "./mongoApiFunc/list/AddList";
import RefetchList from "./mongoApiFunc/list/RefetchList";
import { useSession } from "next-auth/react";
import RemoveListUser from "./mongoApiFunc/list/RemoveListUser";
import { useRouter } from 'next/navigation';


async function filterLists({initialLists, username, userLists}) {
    for (let i = 0; i < initialLists.length; i++) {
        let participants = initialLists[i].participants;
        for (var k = 0; k < participants.length; k++) {
            if (participants[k] === username) {
                userLists.push(initialLists[i]);
            }
        }
    }
}

export default function ListItems({initialLists}) {
    const { data: session } = useSession();
    const router = useRouter();
    const username = session?.user?.name;
    let userLists = [];
    filterLists({initialLists, username, userLists});
    const [lists, setLists] = useState(userLists);
    const [newPrivateList, setNewPrivateList] = useState("");
    const [newSharedList, setNewSharedList] = useState("");
    const [sharedWith, setSharedWith] = useState("");

    const handlePrivateSubmit = async () => {
        let part = [username];
        const newList = await AddList(newPrivateList, part, false);
        setNewPrivateList("");
        if (newList !== null) {
            router.push(`/`);
            setTimeout(() => {router.push(`/my-lists`);}, 200);
        }
    };

    const handleSharedSubmit = async () => {
        let part = [username, sharedWith];
        const newList = await AddList(newSharedList, part, true);
        setNewSharedList("");
        setSharedWith("");
        if (newList !== null) {
            router.push(`/`);
            setTimeout(() => {router.push(`/my-lists`);}, 200);
        }
    };

    const handleDeleteList = async (id: string) => {
        await RemoveListUser(id, username);
        let part = username;
        const newList = part;
        if (newList !== null) {
            router.push(`/`);
            setTimeout(() => {router.push(`/my-lists`);}, 200);
        }
    };

    const privateLists = lists.filter(list => !list.shared);
    const sharedLists = lists.filter(list => list.shared);

    return (
        <section className="grid grid-cols-2">
            <div className="flex flex-col items-center justify-normal p-5 min-h-100 max-w-150 ml-50 mr-5 mt-20 bg-[#665C5C] rounded-xl">
                <div className="">
                    <h2 className="text-3xl mb-8 font-bold">Private Lists</h2>
                    {privateLists.map((list, id) => (
                        <div key={id} className="flex justify-center items-center">
                            <ListItem key={id} listitem={list} />
                            <button onClick={() => handleDeleteList(list._id)} className="bg-[#C2AD96] text-[#142024] rounded py-2 px-3 hover:text-red-600 font-bold">X</button>
                        </div>
                    ))}
                </div>
                <div className="mt-20">
                    <input type="text" value={newPrivateList} onChange={(e) => setNewPrivateList(e.target.value)} placeholder="New list name" className="bg-[#FFF8EE] mr-2 rounded text-[#142024] pl-2"/>
                    <button onClick={handlePrivateSubmit} className="pl-1 pr-1 bg-[#90AEAD] text-white rounded hover:bg-[#738b8a]">Add List</button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-normal p-5 min-h-100 max-w-150 mr-50 ml-5 mt-20 bg-[#665C5C] rounded-xl">
                <div className="">
                    <h2 className="text-3xl mb-8 font-bold">Shared Lists</h2>
                    {sharedLists.map((list , id) => (
                        <div key={id} className="flex justify-center items-center">
                            <ListItem key={id} listitem={list} />
                            <button onClick={() => handleDeleteList(list._id)} type="button" className="bg-[#C2AD96] text-[#142024] rounded py-2 px-3 hover:text-red-600 font-bold">X</button>
                        </div>
                    ))}
                </div>
                <div className="mt-10 flex justify-center items-center">
                    <form className="flex flex-col m-3">
                        <input type="text" value={newSharedList} onChange={(e) => setNewSharedList(e.target.value)} placeholder="New list name" required className="bg-[#FFF8EE] m-1 rounded text-[#142024] pl-2"/>
                        <input type="text" value={sharedWith} onChange={(e) => setSharedWith(e.target.value)} placeholder="Friend to Share With" required  className="bg-[#FFF8EE] m-1 rounded text-[#142024] pl-2"/>
                    </form>
                    <button onClick={handleSharedSubmit} type="button" className="pl-1 pr-1 bg-[#90AEAD] text-white rounded hover:bg-[#738b8a] h-6 w-20">Add List</button>
                </div>
            </div>
        </section>
        );
}