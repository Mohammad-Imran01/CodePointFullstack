import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../components/CourseCard";
import AddItemButton from "../../components/shared/AddItemButton";
import ItemUpdateForm from "../../components/products/ItemUpdateForm";
import ItemDeleteModal from "../../components/products/ItemDeleteModal";

import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../../redux/actions/productActions";

const initialCourse = {
  title: "",
  description: "",
  duration: "",
  level: "",
  price: "",
};

const Courses = ({ hasAdminAccess }) => {
  const [editing, setEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [current, setCurrent] = useState(initialCourse);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const dispatch = useDispatch();
  const { data: courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = editing ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editing]);

  const startEdit = (course = initialCourse, isNew = false) => {
    setCurrent(course);
    setIsNew(isNew);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setCurrent(initialCourse);
  };

  const saveEdit = async (ev) => {
    ev.preventDefault();
    try {
      isNew
        ? await dispatch(addCourse(current))
        : await dispatch(updateCourse(current._id, current));
      dispatch(fetchCourses());
    } catch {}
    cancelEdit();
  };

  const confirmRemove = async () => {
    if (!confirmDelete) return;
    try {
      await dispatch(deleteCourse(confirmDelete._id));
      dispatch(fetchCourses());
    } catch (err) {
      console.log("Error to remove a course");
    }
    setConfirmDelete(null);
  };

  return (
    <section className="blueBg relative w-full shrink-0">
      <div className="insideCard">
        {hasAdminAccess ? (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="sectionHeadingAdmin">Manage Courses</h2>
            {!editing && (
              <AddItemButton
                wrapperClassName="whitespace-nowrap"
                onClick={() => startEdit(initialCourse, true)}
              />
            )}
          </div>
        ) : (
          <h2 className="sectionHeading mb-8">Our Courses</h2>
        )}

        <div className="max-h-[calc(2*12rem+2rem)] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                {...course}
                hasAdminAccess={hasAdminAccess}
                isEditingMode={editing}
                courseEditHandle={() => startEdit(course)}
                handleDeleteCourse={() => {
                  setConfirmDelete(course);
                  setCurrent(course);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {editing && hasAdminAccess && (
        <ItemUpdateForm
          isNew={isNew}
          data={current}
          setData={setCurrent}
          onCancel={cancelEdit}
          onSave={saveEdit}
          courseForm={true}
        />
      )}

      {confirmDelete && (
        <ItemDeleteModal
          title={current.title}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={confirmRemove}
        />
      )}
    </section>
  );
};

export default Courses;
