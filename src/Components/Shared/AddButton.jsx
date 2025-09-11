import { FiPlus } from "react-icons/fi";

const AddButton = ({ onClick }) => {

    return(
<button
    onClick={onClick}
    className="bg-blue-600 font-semibold hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
>
    <FiPlus className="w-5 h-5" />
    Add New
</button>
    );
};
export default AddButton;