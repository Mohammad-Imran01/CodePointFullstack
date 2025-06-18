import { useEffect, useState } from "react";

const ItemUpdateForm = ({
  courseForm,
  instructorForm,
  isNew,
  data,
  setData,
  onCancel,
  onSave,
}) => {
  const [allowSave, setAllowSave] = useState(false);

  // 🔁 Auto-check when data changes
  useEffect(() => {
    checkFieldsAreNotEmpty();
  }, [data]);

  function checkFieldsAreNotEmpty() {
    let isValid = true;

    if (courseForm) {
      const { title, description, duration, price, level } = data;
      isValid =
        title?.trim() &&
        description?.trim() &&
        duration?.trim() &&
        price?.toString().trim();
    }

    if (instructorForm) {
      const { name, expertise, experience, coursesTaught } = data;
      isValid =
        name?.trim() &&
        expertise?.trim() &&
        experience?.trim() &&
        coursesTaught?.toString().trim();
    }

    setAllowSave(!!isValid);
  }

  const commonInput = (name, label, type = "text") => (
    <div key={name}>
      <label className="mb-1 block text-sm font-medium capitalize">
        {label}
      </label>
      <input
        type={type}
        value={data[name] ?? ""}
        onChange={(e) => setData({ ...data, [name]: e.target.value })}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allowSave) onSave(e);
  };

  return (
    <div className="fixed bottom-0 left-1/2 z-50 h-[90%] w-[90%] max-w-lg -translate-x-1/2 overflow-y-auto rounded-t-lg border-t-8 border-stone-400 bg-stone-100 shadow-lg">
      <div className="relative h-full p-6 text-black">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-2xl font-bold text-gray-700 hover:text-red-600"
        >
          &times;
        </button>
        <h2 className="mb-6 mt-2 text-center text-2xl font-bold">
          {isNew ? "Add New Item" : "Edit Item"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {courseForm && (
            <>
              {commonInput("title", "Title")}
              {commonInput("description", "Description")}
              {commonInput("duration", "Duration")}
              {commonInput("price", "Price", "number")}
              <div>
                <label className="mb-1 block text-sm font-medium">Level</label>
                <select
                  value={data.level ?? "Beginner"}
                  onChange={(e) => setData({ ...data, level: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </>
          )}

          {instructorForm && (
            <>
              {commonInput("name", "Name")}
              {commonInput("expertise", "Expertise")}
              {commonInput("experience", "Experience")}
              {commonInput("coursesTaught", "Courses Taught", "number")}
            </>
          )}

          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!allowSave}
              className={`rounded px-4 py-2 text-white ${
                allowSave
                  ? "bg-green-600 hover:bg-green-700"
                  : "cursor-not-allowed bg-gray-400"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemUpdateForm;
