const InstructorUpdateForm = ({ isNew, data, setData, onCancel, onSave }) => (
  <div className="fixed bottom-0 left-1/2 z-50 h-[90%] w-[90%] max-w-lg -translate-x-1/2 overflow-y-auto rounded-t-lg border-t-8 border-stone-400 bg-stone-100 shadow-lg">
    <div className="relative h-full p-6 text-black">
      <button
        onClick={onCancel}
        className="absolute right-4 top-4 text-2xl font-bold text-gray-700 hover:text-red-600"
      >
        &times;
      </button>
      <h2 className="mb-6 mt-2 text-center text-2xl font-bold">
        {isNew ? "Add New Instructor" : "Edit Instructor"}
      </h2>

      <form onSubmit={onSave} className="flex flex-col space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Expertise</label>
          <input
            type="text"
            value={data.expertise}
            onChange={(e) => setData({ ...data, expertise: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Experience (years)
          </label>
          <input
            type="number"
            value={data.experience}
            onChange={(e) => setData({ ...data, experience: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Courses Taught
          </label>
          <input
            type="number"
            value={data.coursesTaught}
            onChange={(e) =>
              setData({ ...data, coursesTaught: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

export default InstructorUpdateForm;
