import ListItem from "@/components/ListItem";

const allLists = [
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
    const privateLists = allLists.filter(list => !list.isShared);
    const sharedLists = allLists.filter(list => list.isShared);

    return (
        <section className="flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full p-8">
            <div className="p-6 rounded-2xl shadow-md shadow-gray-600" style={{ backgroundColor: '#665C5C' }}>
            <h2 className="text-2xl font-bold mb-4">My Lists</h2>
            {privateLists.map(list => (<ListItem key={list.id} listitem={list}></ListItem>))}
            </div>

            <div className="p-6 rounded-2xl shadow-md shadow-gray-600" style={{ backgroundColor: '#665C5C' }}>
            <h2 className="text-2xl font-bold mb-4">Shared Lists</h2>
            {sharedLists.map(list => (<ListItem key={list.id} listitem={list}></ListItem>))}
            </div>
        </div>
        </section>
    );
};

export default MyLists;