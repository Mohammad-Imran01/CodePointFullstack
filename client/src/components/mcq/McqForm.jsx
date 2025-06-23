import { useEffect, useState } from "react";

const MCQForm = ({ isNew, data, setData, onCancel, onSave }) => {
  const [allowSave, setAllowSave] = useState(false);



  useEffect(() => {
    const valid =
      data.ques.trim() &&
      data.options.every((opt) => opt.trim()) &&
      data.correctOption >= 0 &&
      data.correctOption < data.options.length;
    setAllowSave(valid);
  }, [data]);

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleOptionChange = (index, value) => {
    const updated = [...data.options];
    updated[index] = value;
    setData({ ...data, options: updated });
  };

  const handleCorrectSelect = (index) => {
    setData({ ...data, correctOption: index });
  };

  const addOption = () => {
    setData({ ...data, options: [...data.options, ""] });
  };

  const removeOption = (index) => {
    const updated = data.options.filter((_, i) => i !== index);
    let correctOption = data.correctOption;
    if (correctOption === index) correctOption = -1;
    else if (index < correctOption) correctOption -= 1;
    setData({ ...data, options: updated, correctOption });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allowSave) onSave(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center text-xl font-bold">
          {isNew ? "Add MCQ" : "Edit MCQ"}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Question"
            value={data.ques}
            onChange={(e) => handleChange("ques", e.target.value)}
            className="w-full rounded border px-3 py-2"
          />

          <div className="space-y-2">
            {data.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correct"
                  checked={data.correctOption === i}
                  onChange={() => handleCorrectSelect(i)}
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="flex-1 rounded border px-3 py-2"
                />
                {data.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(i)}
                    className="text-red-500"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Option
            </button>
          </div>

          <textarea
            placeholder="Answer Explanation (optional)"
            value={data.answerDetail}
            onChange={(e) => handleChange("answerDetail", e.target.value)}
            className="w-full rounded border px-3 py-2"
          />

          <textarea
            placeholder="Hint (optional)"
            value={data.hint}
            onChange={(e) => handleChange("hint", e.target.value)}
            className="w-full rounded border px-3 py-2"
          />

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!allowSave}
              className={`rounded px-4 py-2 text-white ${
                allowSave ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
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

export default MCQForm;
