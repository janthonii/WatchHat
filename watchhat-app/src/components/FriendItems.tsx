'use client'
import Link from "next/link";
import {useState, useEffect} from 'react';
import FriendItem from "./FriendItem";

interface Friend {
    id: number;
    username: string;
}

interface FriendItemProps {
    initialFriends?: Friend[];
}

export default function FriendItems({ initialFriends = [] }: FriendItemProps) {
    const [friends, setFriends] = useState<Friend[]>(initialFriends);

    useEffect(() => {
        if (initialFriends.length === 0) {
            const fetchFriends = async () => {
                try {const response = await fetch('api/users');
                    if(!response.ok) {
                        throw new Error('Response Not OK');
                    }
                    const data = await response.json();
                    setFriends(data.friends)
                } catch (error) {
                    console.error('Error fetching friends: ', error)
                }
            };
            fetchFriends();
        }
    }, [initialFriends]);

    return (
        <div>
            {friends.map((friend) => (
                            <div key={friend.id} className="flex-shrink-0 px-2">
                                <FriendItem friendItem={friend} />
                            </div>
            ))}
        </div>
    );
}