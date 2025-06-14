const CourseUpdateForm = ({ isNew, data, setData, onCancel, onSave }) => (
  <div className="fixed bottom-0 left-1/2 z-50 h-[90%] w-[90%] max-w-lg -translate-x-1/2 overflow-y-auto rounded-t-lg border-t-8 border-stone-400 bg-stone-100 shadow-lg">
    <div className="relative h-full p-6 text-black">
      <button
        onClick={onCancel}
        className="absolute right-4 top-4 text-2xl font-bold text-gray-700 hover:text-red-600"
      >
        &times;
      </button>
      <h2 className="mb-6 mt-2 text-center text-2xl font-bold">
        {isNew ? "Add New Course" : "Edit Course"}
      </h2>

      <form onSubmit={onSave} className="flex flex-col space-y-4">
        {["title", "description", "duration", "price"].map((field) => (
          <div key={field}>
            <label className="mb-1 block text-sm font-medium capitalize">
              {field}
            </label>
            <input
              type={field === "price" ? "number" : "text"}
              value={data[field]}
              onChange={(e) => setData({ ...data, [field]: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="mb-1 block text-sm font-medium">Level</label>
          <select
            value={data.level}
            onChange={(e) => setData({ ...data, level: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

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
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default CourseUpdateForm;
