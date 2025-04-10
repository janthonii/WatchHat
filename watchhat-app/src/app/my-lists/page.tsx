

const myLists = () => {
    return (
        <section className="flex justify-center items-center min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full p-8">
                <div className="p-6 rounded-2xl shadow-lg center" style={{ backgroundColor: '#665C5C' }}>
                    <h2 className="text-2xl font-bold mb-4">My Lists</h2>
                    <p>[Personal lists content]</p>
                </div>

                <div className="p-6 rounded-2xl shadow-lg" style={{ backgroundColor: '#665C5C' }}>

                    <h2 className="text-2xl font-bold mb-4">Shared Lists</h2>
                    <p>[Shared lists content]</p>
                </div>
            </div>
        </section>
    )
};

export default myLists