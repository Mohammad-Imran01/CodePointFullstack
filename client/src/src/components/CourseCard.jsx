import "../../components/shared/EditDeleteButton";
import EditDeleteButton from "../../components/shared/EditDeleteButton";

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
  isCourseTaken,
  handleUpdateUserCourses,
  user,
  handleUnsignedEffect,
}) => {
  const handleEdit = () => {
    courseEditHandle({ _id, title, description, duration, level, price });
  };

  const handleDelete = () => {
    handleDeleteCourse({ _id, title, description, duration, level, price });
  };
  return (
    <div className="dark:bg-slate-700/30 dark:text-stone-100 shadow-sm/30 relative shrink-0 grow rounded-lg border border-slate-400 bg-white/30 p-6 text-stone-800">
      <div className="">
        {hasAdminAccess && !isEditingMode && (
          <EditDeleteButton
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
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
          <div className="flex items-center justify-between pt-2">
            <p className="dark:text-gray-50 font-bold text-slate-800">
              {price ? `₹${price}` : "Not Available"}
            </p>
            {!hasAdminAccess && (
              <button
                className="rounded-md border-2 border-stone-800 px-2 py-1 text-stone-800 transition-all duration-200 hover:border-stone-500 hover:text-stone-700"
                onClick={() => {
                  if (!user || !user._id) {
                    handleUnsignedEffect();
                    return;
                  }
                  isCourseTaken
                    ? handleUpdateUserCourses(_id, null) // remove course
                    : handleUpdateUserCourses(null, _id); // buy course
                }}
              >
                {isCourseTaken ? "Leave Course" : "Buy Course"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
