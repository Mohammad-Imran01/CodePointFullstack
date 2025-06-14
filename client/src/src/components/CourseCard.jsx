import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

const CourseCard = ({
  _id,
  title,
  description,
  duration,
  level,
  price,
  hasAdminAccess,
  isEditingMode,
  courseEditHandle,
  handleDeleteCourse,
}) => {
  return (
    <div className="dark:bg-slate-700/30 dark:text-stone-100 shadow-sm/30 relative relative rounded-lg border border-slate-400 bg-white/30 p-6 text-stone-800">
      <div className="">
        {hasAdminAccess && !isEditingMode && (
          <div className="absolute bottom-0 right-0 flex -translate-x-[10%] -translate-y-[25%] items-center justify-end gap-2">
            <button
              onClick={() =>
                courseEditHandle({
                  _id,
                  title,
                  description,
                  duration,
                  level,
                  price,
                })
              }
              className="dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700  inline-flex items-center rounded-md border border-slate-300 bg-slate-100 px-1.5 py-1.5 text-sm text-slate-700 hover:bg-slate-200"
            >
              <BsPencilSquare className="mr-1" />
              {isEditingMode ? "Save" : "Edit"}
            </button>
            <button
              onClick={() =>
                handleDeleteCourse({
                  _id,
                  title,
                  description,
                  duration,
                  level,
                  price,
                  })
              } // Define this function in your component
              className="rounded bg-red-600 p-1.5 text-white hover:bg-red-700"
              aria-label="Delete Course"
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        )}
        <div>
          <h3 className="dark:text-slate-50 text-xl font-semibold text-slate-800">
            {title}
          </h3>
          <p className="dark:text-gray-100 mt-2 text-gray-700">{description}</p>
          <p className="dark:text-gray-200 mt-1 text-gray-500">
            Duration: {duration}
          </p>
          <p className="dark:text-gray-200 mt-1 text-gray-500">
            Level: {level}
          </p>
          <p className="dark:text-gray-50 mt-2 font-bold text-slate-800">
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
