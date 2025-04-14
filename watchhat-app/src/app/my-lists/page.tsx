'use client'
import ListItem from "@/components/ListItem";
import ListPopup from "@/components/ListPopup";
import React, { useState } from 'react';

const userLists = [
    {
        id: 1,
        title: "Private List 1",
        participants: [],
        movies: [],
        isShared: false
    },
    {
        id: 2,
        title: "Shared List 1",
        participants: [],
        movies: [],
        isShared: true
    },
    {
        id: 3,
        title: "Private List 2",
        participants: [],
        movies: [],
        isShared: false
    }
];

const MyLists = () => {
    const [allLists, setAllLists] = useState(userLists);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState<'left' | 'right'>('right');
    const [isAddingSharedList, setIsAddingSharedList] = useState(false);
    const [newListTitle, setNewListTitle] = useState('');

    const privateLists = allLists.filter(list => !list.isShared);
    const sharedLists = allLists.filter(list => list.isShared);

    const handleAddListClick = (isShared: boolean, side: 'left' | 'right') => {
        setIsAddingSharedList(isShared);
        setPopupPosition(side);
        setIsPopupOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newList = {
            id: Math.max(...allLists.map(l => l.id), 0) + 1,
            title: newListTitle,
            participants: [],
            movies: [],
            isShared: isAddingSharedList
        };

        //update state with new list
        setAllLists([...allLists, newList]);

        // Reset form and close popup
        setNewListTitle('');
        setIsPopupOpen(false);
    };


    return (
        <section className="flex justify-center items-center min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full p-8">
                <div className="p-6 rounded-2xl shadow-md shadow-gray-600 w-full" style={{ backgroundColor: '#665C5C' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">My Lists</h2>
                        <button onClick={() => handleAddListClick(false, 'left')} className="bg-[#90AEAD] hover:bg-[#738b8a] text-white font-bold py-1 px-3 rounded text-sm">+ Add List</button>
                    </div>
                    {privateLists.map(list => (<ListItem key={list.id} listitem={list} />))}
                </div>

                <div className="p-6 rounded-2xl shadow-md shadow-gray-600 w-full" style={{ backgroundColor: '#665C5C' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Shared Lists</h2>
                        <button onClick={() => handleAddListClick(true, 'right')} className="bg-[#90AEAD] hover:bg-[#738b8a] text-white font-bold py-1 px-3 rounded text-sm">+ Add List</button>
                    </div>
                    {sharedLists.map(list => (<ListItem key={list.id} listitem={list} />))}
                </div>
            </div>

            <ListPopup trigger={isPopupOpen} onClose={() => { setIsPopupOpen(false); setNewListTitle(''); }} position={{ left: popupPosition === 'left' ? '1rem' : undefined, right: popupPosition === 'right' ? '1rem' : undefined, top: '50%', transform: 'translateY(-50%)'}}>
                <form onSubmit={handleSubmit} className="p-4">
                    <h3 className="text-xl font-bold mb-4 ">Add New {isAddingSharedList ? 'Shared' : 'Private'} List</h3>
                    <div className="mb-4">
                        <label className="block text-md font-bold mb-2 pt-2">List Name:</label>
                        <input type="text" value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} className="w-full p-2 border rounded" required placeholder="Enter list name"/>
                        {isAddingSharedList && (
                        <div>
                            <label className="block text-md font-bold mb-2 pt-2">Share With:</label>
                            <input type="text" className="w-full p-2 border rounded" required placeholder="Enter Friend's Username"/>
                        </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => {setIsPopupOpen(false); setNewListTitle('');}} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#90AEAD] text-white rounded hover:bg-[#738b8a]">Create List</button>
                    </div>
                </form>
            </ListPopup>
        </section>
    );
};

export default MyLists;