import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CourseCard from "../components/CourseCard";
import CourseUpdateForm from "../../components/products/CourseUpdateForm";
import CourseDeleteModal from "../../components/products/CourseDeleteModal";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../../redux/actions/product";

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
      toast.success(`Course ${isNew ? "added" : "updated"} successfully`);
    } catch {
      toast.error("Operation failed");
    }
    cancelEdit();
  };

  const confirmRemove = async () => {
    if (!confirmDelete) return;
    try {
      await dispatch(deleteCourse(confirmDelete._id));
      dispatch(fetchCourses());
      toast.success("Course deleted");
    } catch {
      toast.error("Failed to delete");
    }
    setConfirmDelete(null);
  };

  return (
    <section className="blueBg relative w-full">
      {!editing && hasAdminAccess && (
        <div className="absolute right-0 top-0 p-4">
          <button
            onClick={() => startEdit(initialCourse, true)}
            className="rounded bg-purple-400 px-4 py-2 text-white hover:bg-purple-500"
          >
            + Add Course
          </button>
        </div>
      )}

      <div className="insideCard">
        {!hasAdminAccess && <h2 className="sectionHeading">Our Courses</h2>}
        <div className="max-h-[calc(2*12rem+2rem)] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                {...course}
                hasAdminAccess={hasAdminAccess}
                isEditingMode={editing}
                courseEditHandle={() => startEdit(course)}
                handleDeleteCourse={() => setConfirmDelete(course)}
              />
            ))}
          </div>
        </div>
      </div>

      {editing && hasAdminAccess && (
        <CourseUpdateForm
          isNew={isNew}
          data={current}
          setData={setCurrent}
          onCancel={cancelEdit}
          onSave={saveEdit}
        />
      )}

      {confirmDelete && (
        <CourseDeleteModal
          course={confirmDelete}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={confirmRemove}
        />
      )}
    </section>
  );
};

export default Courses;
