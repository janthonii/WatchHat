import List from "@/models/listsSchema";
import ListItems from "@/components/ListItems";
import connectMongoDB from "../../../config/mongodb";


const MyLists = async () => {
    await connectMongoDB();

    const lists: any[] = await List.find({}).lean();

    return <ListItems initialLists={JSON.parse(JSON.stringify(lists))} />;
};

export default MyLists;