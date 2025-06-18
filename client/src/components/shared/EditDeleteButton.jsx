import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

const EditDeleteButton = ({ handleEdit, handleDelete }) => {
  return (
    <div className="absolute bottom-0 right-0 flex -translate-x-[10%] -translate-y-[25%] items-center justify-end gap-2">
      <button
        onClick={handleEdit}
        className="dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700  inline-flex items-center rounded-md border border-slate-300 bg-slate-100 px-1.5 py-1.5 text-sm text-slate-700 hover:bg-slate-200"
      >
        <BsPencilSquare className="mr-1" />
        Edit
      </button>
      <button
        onClick={handleDelete} // Define this function in your component
        className="rounded bg-red-600 p-1.5 text-white hover:bg-red-700"
        aria-label="Delete Course"
      >
        <RiDeleteBinLine size={20} />
      </button>
    </div>
  );
};

export default EditDeleteButton;
