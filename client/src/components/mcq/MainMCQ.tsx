import React, { useEffect, useState, useCallback, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
// @ts-expect-error: No type declarations for mcq actions, suppressing for now
import * as Func from "../../redux/actions/mcq/mcq";
import AddItemButton from "../shared/AddItemButton";
import ItemDeleteModal from "../products/ItemDeleteModal";
import MCQItem from "./MCQItem";
import MCQForm from "./McqForm";
import AuthRequiredPopup from "../shared/AuthRequiredPopup";
import * as XLSX from "xlsx"; // Make sure to install with: npm install xlsx

const getMCQsAction = Func.getMCQsAction;
const addMCQAction = Func.addMCQAction;
const setMCQByIdAction = Func.setMCQByIdAction;
const deleteMCQAction = Func.deleteMCQAction;


// Default MCQ state
type MCQ = {
  id?: string;
  categories?: string;
  ques: string;
  options: string[];
  correctOption: number;
  hint: string;
  answerDetail: string;
};

const initialMCQ: MCQ = {
  categories: "",
  ques: "",
  options: [""],
  correctOption: -1,
  hint: "",
  answerDetail: "",
};

// Improved format function with option validation
const formatMCQ = (item: any) => {
  const options = [
    item.option1?.trim?.() || "",
    item.option2?.trim?.() || "",
    item.option3?.trim?.() || "",
    item.option4?.trim?.() || "",
    item.option5?.trim?.() || "",
    item.option6?.trim?.() || "",
  ].filter(Boolean); // Remove empty strings

  return {
    categories: item.categories?.trim() || "",
    ques: item.question?.trim() || "",
    options,
    correctOption: Math.max(0, Number(item.correctOption) - 1),
    hint: item.hint?.trim() || "",
    answerDetail: item.explanation?.trim() || "",
  };
};


const MainMCQ = ({ hasAdminAccess, userData }: { hasAdminAccess: boolean, userData: object }) => {
  const dispatch = useDispatch();
  // Add type for state.mcq
  const {data:mcqs} = useSelector((state: any) => state?.mcq?.data)

  const [editing, setEditing] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [current, setCurrent] = useState<MCQ>(initialMCQ);
  const [confirmDelete, setConfirmDelete] = useState<MCQ | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [dailyMCQs, setDailyMCQs] = useState<MCQ[]>([]);
  const [showAuthRequiredPopup, setShowAuthRequiredPopup] = useState(false);

  // Load MCQs on mount
  useEffect(() => {
    dispatch(getMCQsAction());
  }, [dispatch]);

  // implement mcq of the day, two shown
  useEffect(() => {
    if ((mcqs||[]).length >= 2) {
      const shuffled = [...mcqs].sort(() => 0.5 - Math.random());
      setDailyMCQs(shuffled.slice(0, 2) as MCQ[]);
    } else {
      setDailyMCQs(() => mcqs as MCQ[]);
    }
  }, [mcqs]);

  // Prevent background scroll when editing
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", editing);
    return () => document.body.classList.remove("overflow-hidden");
  }, [editing]);

  const startEdit = useCallback((mcq = initialMCQ, isNew = false) => {
    setCurrent(mcq);
    setIsNew(isNew);
    setEditing(true);
  }, [setCurrent, setIsNew, setEditing]);

  const cancelEdit = useCallback(() => {
    setEditing(false);
    setCurrent(initialMCQ);
  }, []);

  const saveEdit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        if (isNew) {
          await dispatch(addMCQAction(current));
        } else {
          await dispatch(setMCQByIdAction(current.id as any, current));
        }
        dispatch(getMCQsAction());
      } catch (error: any) {
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
      await dispatch(deleteMCQAction(confirmDelete.id as any));
      dispatch(getMCQsAction());
    } catch (err: any) {
      console.error("Error removing MCQ:", err);
      alert("Failed to delete MCQ: " + err.message);
    }
    setConfirmDelete(null);
  }, [confirmDelete, dispatch]);

  // File upload handler with validation and feedback
  const handleFileUpload = useCallback(
    async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      setUploading(true);

      try {
        let parsed: any[] = [];
        if (file.name.endsWith(".json")) {
          const text = await file.text();
          parsed = JSON.parse(text);
        } else if (
          file.name.endsWith(".xlsx") ||
          file.name.endsWith(".xls") ||
          file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.type === "application/vnd.ms-excel"
        ) {
          const data = await file.arrayBuffer();
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          parsed = XLSX.utils.sheet_to_json(worksheet) as any[];
          console.log(parsed)
        } else {
          throw new Error("Unsupported file type.");
        }
        if (!Array.isArray(parsed)) {
          throw new Error("Uploaded file must be an array of MCQs.");
        }

        await Promise.all(
          parsed.map((raw) => {
            const formatedMCQ = formatMCQ(raw);
            return dispatch(addMCQAction(formatedMCQ));
          })
        ).then(() => {
          console.log('MCQs uploaded successfully');
        }).catch((err: any) => {
          console.error("Upload error:", err);
          alert("File upload failed: " + (err.message || err));
        }).finally(() => {
          dispatch(getMCQsAction());
        });
        alert("MCQs uploaded successfully");
        // console.log(mcqs);

      } catch (err: any) {
        console.error("Upload error:", err);
        alert("File upload failed: " + (err.message || err));
      } finally {
        e.target.value = null;
        setUploading(false);
      }
    },
    [dispatch]
  );

  // Memoize the daily MCQ elements
const memoizedMCQList = useMemo(() => {
  if (!dailyMCQs) return null;

  return (dailyMCQs?.length ?? 0) > 0 && (dailyMCQs || []).map((item: MCQ, ind: number) => {
    // console.log(item); // optional: remove in production
    return (
      <MCQItem
        key={item.id} // use a stable key if available
        qIndex={ind}

        item = {formatMCQ(item)}
        hasAdminAccess={hasAdminAccess}
        setConfirmDelete={setConfirmDelete}
        startEdit={startEdit}
        userData={userData}
        handleUnsignedEffect={() => setShowAuthRequiredPopup(true)}
      />
    );
  });
}, [dailyMCQs, hasAdminAccess, setConfirmDelete, startEdit, userData]);

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
                accept=".json,.xlsx,.xls"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />

              {/* Add new MCQ */}
              <AddItemButton
                wrapperClassName="whitespace-nowrap"
                onClick={() => startEdit(initialMCQ, true)}
              />
            </div>
          )}
        </div>

        {/* MCQ List with safety guard */}
        <div className="flex flex-col gap-6 rounded-xl border-2 bg-stone-200/75 p-4">
         {memoizedMCQList}
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
          title={confirmDelete?.ques || ""}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={confirmRemove}
        />
      )}
    </section>
  );
};

export default MainMCQ;
