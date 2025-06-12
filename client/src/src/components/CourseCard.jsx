import React from "react";
import { BsPencilSquare } from "react-icons/bs";

const CourseCard = ({
  title,
  description,
  duration,
  level,
  price,
  hasAdminAccess,
}) => {
  const handleEdit = () => {
    // Replace this with your actual edit logic (e.g., open modal or redirect)
    console.log("Edit clicked for course:", title);
  };

  return (
    <div className="dark:bg-slate-700/30 dark:text-stone-100 shadow-sm/30 relative rounded-lg border border-slate-400 bg-white/30 p-6 text-stone-800">
      <h3 className="dark:text-slate-50 text-xl font-semibold text-slate-800">
        {title}
      </h3>
      <p className="dark:text-gray-100 mt-2 text-gray-700">{description}</p>
      <p className="dark:text-gray-200 mt-1 text-gray-500">
        Duration: {duration}
      </p>
      <p className="dark:text-gray-200 mt-1 text-gray-500">Level: {level}</p>
      <p className="dark:text-gray-50 mt-2 font-bold text-slate-800">{price}</p>

      {hasAdminAccess && (
        <button
          onClick={handleEdit}
          className="dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 absolute right-3 top-3 inline-flex items-center rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-sm text-slate-700 hover:bg-slate-200"
        >
          <BsPencilSquare className="mr-1" />
          Edit
        </button>
      )}
    </div>
  );
};

export default CourseCard;
