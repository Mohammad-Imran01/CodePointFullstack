import EditDeleteButton from "../../components/shared/EditDeleteButton";

const InstructorCard = ({
  _id,
  name,
  expertise,
  experience,
  coursesTaught,
  hasAdminAccess,
  isEditingMode,
  onEditHandler,
  onDeleteHandler,
}) => {
  const handleEdit = () => {
    onEditHandler({ _id, name, expertise, experience, coursesTaught });
  };

  const handleDelete = () => {
    onDeleteHandler({ _id, name, expertise, experience, coursesTaught });
  };
  return (
    <div className="relative dark:bg-slate-700/30 dark:text-stone-100 shadow-sm/30 rounded-lg border border-slate-400 bg-white/30 p-6 text-stone-800">
      {hasAdminAccess && !isEditingMode && (
        <EditDeleteButton handleDelete={handleDelete} handleEdit={handleEdit} />
      )}
      <h3 className="dark:text-slate-200 text-xl font-semibold text-slate-800">
        {name}
      </h3>
      <p className="dark:text-gray-300 mt-2 text-gray-700">
        Expertise: {expertise}
      </p>
      <p className="dark:text-gray-400 mt-1 text-gray-500">
        Experience: {experience + ' years'}
      </p>
      <p className="dark:text-gray-400 mt-1 text-gray-500">
        Courses Taught: {coursesTaught}
      </p>
    </div>
  );
};

export default InstructorCard;
