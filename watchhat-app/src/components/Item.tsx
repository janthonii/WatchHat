interface ItemProps {
    item: {
        _id: Number;
        title: String;
        description: String;
        url: String;
    };
}
const Item = ({item}: ItemProps) => {
    return(
        <div></div>
    );
}
export default Item;