import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../../redux/actions/productActions";
import {
  getUserAction,
  updateUserAction,
} from "../../redux/actions/userActions";
import AuthRequiredPopup from "../shared/AuthRequiredPopup";
import AddItemButton from "../shared/AddItemButton";
import CourseCard from "../../src/components/CourseCard";
import ItemUpdateForm from "../products/ItemUpdateForm";
import ItemDeleteModal from "../products/ItemDeleteModal";

const initialCourse = {
  title: "",
  description: "",
  duration: "",
  level: "",
  price: "",
};

const UserCourses = ({
  userData,
  filterByCoursesTaken,
  filterByCoursesCreated,
  hasAdminAccess=false
}) => {
  const [editing, setEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [current, setCurrent] = useState(initialCourse);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coursesFiltered, setCoursesFiltered] = useState([]);

  const [showAuthRequiredPopup, setShowAuthRequiredPopup] = useState(false);

  const dispatch = useDispatch();
  const { data: allCourses } = useSelector((state) => state.courses);

  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    const filterData = async () => {
      setLoading(true);
      let coursesTemp = [];

      if (filterByCoursesTaken) {
        coursesTemp = allCourses.filter((item, ind) =>
          user?.coursesTakenIds.includes(item._id)
        );
      } else if (filterByCoursesCreated) {
        coursesTemp = allCourses.filter((item, ind) =>
          user.coursesCreatedIds.includes(item._id)
        );
      } else {
        coursesTemp = allCourses;
      }
      setCoursesFiltered(() => coursesTemp);
      setLoading(false);
    };
    filterData().then(() => setLoading(() => false));
  }, [user, allCourses, filterByCoursesTaken, filterByCoursesCreated]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCourses());
    const fetchUser = async () => {
      await dispatch(getUserAction(userData?._id));
    };
    fetchUser().then(() => setLoading(false));
  }, [dispatch, userData?._id]);

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

  const handleUpdateUserCourses = async (courseIdToRemove, courseIdToBuy) => {
    if (!user || !user._id) {
      console.log("User logged out or not found");
      return;
    }
    setLoading(true);

    try {
      let updatedCoursesTakenList = [...(user.coursesTakenIds || [])];

      if (courseIdToBuy && !updatedCoursesTakenList.includes(courseIdToBuy))
        updatedCoursesTakenList.push(courseIdToBuy);
      if (
        courseIdToRemove &&
        updatedCoursesTakenList.includes(courseIdToRemove)
      )
        updatedCoursesTakenList = updatedCoursesTakenList.filter(
          (id) => id !== courseIdToRemove
        );

      const formData = {
        location: user.location,
        interests: user.interests,
        bio: user.bio,
        coursesTaken: updatedCoursesTakenList,
        coursesCreated: user.coursesCreated || [],
      };

      await dispatch(updateUserAction(user._id, formData));
      await dispatch(getUserAction(user._id));
    } catch (err) {
      console.log("Error updating user profile course data", err);
    }
    setLoading(false);
  };

  return (
    <section className="blueBg relative w-full shrink-0">
      <div className="insideCard">
        <AuthRequiredPopup
          open={showAuthRequiredPopup}
          onClose={() => {
            setShowAuthRequiredPopup(false);
          }}
        />

        {}

        {hasAdminAccess ? (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            {!filterByCoursesCreated && !filterByCoursesTaken && (
              <h2 className="sectionHeadingAdmin">Manage Courses</h2>
            )}
            {!editing && (
              <AddItemButton
                wrapperClassName="whitespace-nowrap"
                onClick={() => startEdit(initialCourse, true)}
              />
            )}
          </div>
        ) : (
          <>
            {!filterByCoursesCreated && !filterByCoursesTaken && (
              <h2 className="sectionHeading mb-8">Our Courses</h2>
            )}
          </>
        )}

        <div className="max-h-[calc(2*12rem+2rem)] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {coursesFiltered.length ? (
              coursesFiltered?.map((course) => (
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
                  handleUpdateUserCourses={handleUpdateUserCourses}
                  isCourseTaken={user?.coursesTakenIds?.includes(course._id)}
                  user={user}
                  handleUnsignedEffect={() => setShowAuthRequiredPopup(true)}
                />
              ))
            ) : (
              <>
                {filterByCoursesTaken && (
                  <div className="text-sm italic text-gray-400">
                    No courses taken yet.
                  </div>
                )}
                {filterByCoursesCreated && (
                  <div className="text-sm italic text-gray-400">
                    No courses created yet.
                  </div>
                )}
              </>
            )}
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

export default UserCourses;
