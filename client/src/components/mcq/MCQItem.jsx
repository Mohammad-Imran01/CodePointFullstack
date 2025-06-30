import React, { useState } from "react";
import EditDeleteButton from "../shared/EditDeleteButton";

const MCQItem = ({
  hasAdminAccess,
  item,
  qIndex,
  setConfirmDelete,
  startEdit,
  userData,
  handleUnsignedEffect,
}) => {
  const [answerShown, setAnswerShown] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const [optionSelected, setOptionSelected] = useState(null);

  const isCorrect = (index) =>
    optionSelected !== null && index === item.correctOption;
  const isWrong = (index) =>
    optionSelected === index && index !== item.correctOption;

  return (
    <div className="relative mb-4 rounded-lg border border-stone-300 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-stone-800">{item.ques}</h3>
        {hasAdminAccess && (
          <EditDeleteButton
            handleDelete={() => setConfirmDelete(item)}
            handleEdit={() => startEdit(item)}
          />
        )}
      </div>

      {item.options?.map((option, oIndex) => (
        <label
          key={oIndex}
          className={`block ${
            optionSelected === null && "cursor-pointer"
          } rounded-md border-0 p-2 pl-4 transition-colors ${
            isCorrect(oIndex)
              ? "border-green-500 bg-green-100"
              : isWrong(oIndex)
              ? "border-red-500 bg-red-100"
              : `border-stone-200 ${
                  optionSelected === null && "hover:bg-stone-100"
                }`
          }`}
        >
          <input
            type="radio"
            name={`question-${qIndex}`}
            value={option}
            className="mr-2"
            onChange={() => {
              if (!userData) {
                handleUnsignedEffect();
                return;
              }

              if (optionSelected) return;
              setOptionSelected(oIndex);
            }}
            checked={optionSelected === oIndex}
            aria-checked={optionSelected === oIndex}
          />
          {option}
        </label>
      ))}

      {/* Hint and Answer Sections */}
      <div className="mt-3 space-y-2">
        {hintShown && <p className="italic text-yellow-800">{item.hint}</p>}
        {answerShown && (
          <p className="font-medium text-green-800">{item.answerDetail}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        {!hasAdminAccess && (
          <button
            onClick={() => {
              if (!userData) {
                handleUnsignedEffect();
                return;
              }
              setAnswerShown((prev) => !prev);
            }}
            className={`flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-800 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-stone-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-stone-500`}
          >
            {answerShown ? "Hide Answer" : "View Answer"}
          </button>
        )}

        {!hasAdminAccess && !answerShown && (
          <button
            onClick={() => {
              if (!userData) {
                handleUnsignedEffect();
                return;
              }
              setHintShown((prev) => !prev);
            }}
            className={`flex items-center gap-2 rounded-lg border border-yellow-500 bg-yellow-100 px-4 py-2 text-sm font-semibold text-stone-800 transition duration-200 hover:bg-yellow-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            {hintShown ? "Hide Hint" : "Show Hint"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MCQItem;
