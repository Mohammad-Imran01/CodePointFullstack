import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

import {
  addMCQAction,
  deleteMCQAction,
  getMCQsAction,
  setMCQByIdAction,
} from "../../redux/actions/mcq/mcq";

import AddItemButton from "../shared/AddItemButton";
import ItemDeleteModal from "../products/ItemDeleteModal";
import MCQItem from "./MCQItem";
import MCQForm from "./McqForm";
import AuthRequiredPopup from "../shared/AuthRequiredPopup";

// Default MCQ state
const initialMCQ = {
  ques: "",
  options: [""],
  correctOption: -1,
  hint: "",
  answerDetail: "",
};

// Improved format function with option validation
const formatMCQ = (item) => {
  const options = [
    item.option1?.trim?.() || "",
    item.option2?.trim?.() || "",
    item.option3?.trim?.() || "",
    item.option4?.trim?.() || "",
  ].filter(Boolean); // Remove empty strings

  return {
    ques: item.ques?.trim() || "",
    options,
    correctOption: Math.max(0, Number(item.correctOption) - 1),
    hint: item.hint?.trim() || "",
    answerDetail: item.answerDetail?.trim() || "",
  };
};

const MainMCQ = ({ hasAdminAccess, userData }) => {
  const dispatch = useDispatch();
  const { data: mcqs = [] } = useSelector((state) => state.mcq);

  const [editing, setEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [current, setCurrent] = useState(initialMCQ);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dailyMCQs, setDailyMCQs] = useState([]);
  const [showAuthRequiredPopup, setShowAuthRequiredPopup] = useState(false);

  // Load MCQs on mount
  useEffect(() => {
    dispatch(getMCQsAction());
  }, [dispatch]);

  // implement mcq of the day, two shown
  useEffect(() => {
    if (mcqs.length >= 2) {
      const shuffled = [...mcqs].sort(() => 0.5 - Math.random());
      setDailyMCQs(shuffled.slice(0, 2));
    } else {
      setDailyMCQs(() => mcqs);
    }
  }, [mcqs]);

  // Prevent background scroll when editing
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", editing);
    return () => document.body.classList.remove("overflow-hidden");
  }, [editing]);

  const startEdit = (mcq = initialMCQ, isNew = false) => {
    setCurrent(mcq);
    setIsNew(isNew);
    setEditing(true);
  };

  const cancelEdit = useCallback(() => {
    setEditing(false);
    setCurrent(initialMCQ);
  }, []);

  const saveEdit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (isNew) {
          await dispatch(addMCQAction(current));
        } else {
          await dispatch(setMCQByIdAction(current._id, current));
        }
        dispatch(getMCQsAction());
      } catch (error) {
        console.error("Failed to save MCQ:", error);
        alert("Failed to save MCQ: " + error.message);
      }
      cancelEdit();
    },
    [isNew, current, dispatch, cancelEdit]
  );

  const confirmRemove = useCallback(async () => {
    if (!confirmDelete) return;
    try {
      await dispatch(deleteMCQAction(confirmDelete._id));
      dispatch(getMCQsAction());
    } catch (err) {
      console.error("Error removing MCQ:", err);
      alert("Failed to delete MCQ: " + err.message);
    }
    setConfirmDelete(null);
  }, [confirmDelete, dispatch]);

  // File upload handler with validation and feedback
  const handleFileUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      setUploading(true);

      try {
        const text = await file.text();
        const parsed = JSON.parse(text);

        if (!Array.isArray(parsed)) {
          throw new Error("Uploaded file must be an array of MCQs.");
        }

        await Promise.all(
          parsed.map((raw) => dispatch(addMCQAction(formatMCQ(raw))))
        );
        dispatch(getMCQsAction());
      } catch (err) {
        console.error("Upload error:", err);
        alert("File upload failed: " + (err.message || err));
      } finally {
        e.target.value = null;
        setUploading(false);
      }
    },
    [dispatch]
  );

  return (
    <section className="blueBg text-wrap relative w-full">
      <AuthRequiredPopup
        open={showAuthRequiredPopup}
        onClose={() => {
          setShowAuthRequiredPopup(false);
        }}
      />
      <div className="insideCard">
        <div
          className={`mb-8 flex flex-wrap items-center ${
            hasAdminAccess ? "justify-between" : "justify-center"
          } gap-4`}
        >
          <h2
            className={
              hasAdminAccess ? "sectionHeadingAdmin" : "sectionHeading mb-8"
            }
          >
            {hasAdminAccess ? "Manage MCQs" : <p> Solve MCQs of the day</p>}
          </h2>

          {hasAdminAccess && !editing && (
            <div className="flex gap-2">
              {/* Upload button with visual disable */}
              <label
                htmlFor="mcqFileUpload"
                className={`inline-flex items-center justify-between gap-1 rounded-md border-2 border-stone-700 px-2 py-0.5 transition-all duration-100 ${
                  uploading
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-stone-100 hover:shadow-md"
                }`}
                style={uploading ? { pointerEvents: "none" } : {}}
              >
                {uploading ? (
                  <span>Uploading...</span>
                ) : (
                  <>
                    <MdOutlineDriveFolderUpload size={20} />
                    <span>Read file</span>
                  </>
                )}
              </label>
              <input
                id="mcqFileUpload"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />

              {/* Add new MCQ */}
              <AddItemButton
                wrapperClassName="whitespace-nowrap"
                onClick={() => startEdit(initialMCQ, true)}
                disabled={uploading}
              />
            </div>
          )}
        </div>

        {/* MCQ List with safety guard */}
        <div className="flex flex-col gap-6 rounded-xl border-2 bg-stone-200/75 p-4">
          {/* {mcqs.map( */}
          {dailyMCQs.map(
            (item, ind) =>
              Array.isArray(item.options) &&
              item.options.length > 0 && (
                <MCQItem
                  key={item._id}
                  qIndex={ind}
                  item={item}
                  hasAdminAccess={hasAdminAccess}
                  setConfirmDelete={setConfirmDelete}
                  startEdit={startEdit}
                  userData={userData}
                  handleUnsignedEffect={() => setShowAuthRequiredPopup(true)}
                />
              )
          )}
        </div>
      </div>
      {/* Form Modal */}
      {editing && hasAdminAccess && (
        <MCQForm
          isNew={isNew}
          data={current}
          setData={setCurrent}
          onCancel={cancelEdit}
          onSave={saveEdit}
        />
      )}
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <ItemDeleteModal
          title={confirmDelete.ques}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={confirmRemove}
        />
      )}
    </section>
  );
};

export default MainMCQ;
