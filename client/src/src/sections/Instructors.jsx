import InstructorCard from "../components/InstructorCard";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddItemButton from "../../components/shared/AddItemButton";
import CourseUpdateForm from "../../components/products/ItemUpdateForm";
import ItemDeleteModal from "../../components/products/ItemDeleteModal";

import {
  fetchInstructors,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} from "../../redux/actions/productActions";

const initialInstructor = {
  name: "",
  expertise: "",
  experience: "",
  coursesTaught: "",
};

const Instructors = ({ hasAdminAccess }) => {
  const [editing, setEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [current, setCurrent] = useState(initialInstructor);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const dispatch = useDispatch();
  const { data: instructors } = useSelector((state) => state.instructors);

  useEffect(() => {
    dispatch(fetchInstructors());
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = editing ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editing]);

  const startEdit = (param = initialInstructor, isNew = false) => {
    setCurrent(param);
    setIsNew(isNew);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setCurrent(initialInstructor);
  };

  const saveEdit = async (ev) => {
    ev.preventDefault();
    try {
      isNew
        ? await dispatch(addInstructor(current))
        : await dispatch(updateInstructor(current._id, current));
      dispatch(fetchInstructors());
    } catch {}
    cancelEdit();
  };
  const confirmRemove = async () => {
    if (!confirmDelete) return;
    try {
      await dispatch(deleteInstructor(confirmDelete._id));
      dispatch(fetchInstructors());
    } catch {}
    setConfirmDelete(null);
  };

  return (
    <section className="blueBg text-wrap relative w-full">
      <div className="insideCard">
        {hasAdminAccess ? (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="sectionHeadingAdmin">Manage Instructors</h2>
            {!editing && (
              <AddItemButton
                wrapperClassName="whitespace-nowrap"
                onClick={() => startEdit(initialInstructor, true)}
              />
            )}
          </div>
        ) : (
          <h2 className="sectionHeading mb-8">Our Instructors</h2>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor, index) => (
            <InstructorCard
              key={instructor.name}
              {...instructor}
              hasAdminAccess={hasAdminAccess}
              isEditingMode={editing}
              onEditHandler={() => startEdit(instructor)}
              onDeleteHandler={() => {
                setConfirmDelete(instructor);
                setCurrent(instructor);
              }}
            />
          ))}
        </div>
      </div>
      {editing && hasAdminAccess && (
        <CourseUpdateForm
          isNew={isNew}
          data={current}
          setData={setCurrent}
          onCancel={cancelEdit}
          onSave={saveEdit}
          instructorForm={true}
        />
      )}
      {confirmDelete && (
        <ItemDeleteModal
          title={current.name}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={confirmRemove}
        />
      )}
    </section>
  );
};

export default Instructors;
