import { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction } from "../../redux/actions/userActions";
import PostOnProfile from "../post/PostOnProfile";
import OwnProfileCard from "./OwnProfileCard";
import CommonLoading from "../loader/CommonLoading";
import OwnInfoCard from "./OwnInfoCard";
import NoPost from "../../assets/nopost.jpg";

import {
  fetchCreatedCourses,
  fetchTakenCourses,
} from "../../redux/actions/productActions";
import UserCourses from "../products/course/UserCourses";

const UserProfile = ({ userData }) => {
  const coursesTaken = useSelector((state) => state.courses?.takenCourses);
  const coursesCreated = useSelector((state) => state.courses?.createdCourses);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const posts = user?.posts;

  useEffect(() => {
    setLoading(true);
    dispatch(getUserAction(userData._id)).finally(() => setLoading(false));
  }, [dispatch, userData._id]);

  useEffect(() => {
    if (user) {
      dispatch(fetchTakenCourses(user.coursesTakenIds || []));
      dispatch(fetchCreatedCourses(user.coursesCreatedIds || []));
    }
  }, [dispatch, user]);

  const MemoizedPostOnProfile = memo(PostOnProfile);

  return (
    <>
      {loading || !user || !posts ? (
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <CommonLoading />
        </div>
      ) : (
        <div className="mx-auto max-w-5xl px-4 py-8">
          {/* Profile Cards */}
          <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:gap-10">
            <OwnProfileCard user={user} />
            <OwnInfoCard user={user} />
          </div>

          {/* Courses Section */}
          <section className="mb-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* ------------------------------------------------- */}
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="mb-3 border-b border-gray-100 pb-1 text-lg font-semibold text-gray-800">
                  Courses Taken
                </h3>
                <UserCourses userData={userData} filterByCoursesTaken />
              </div>
              <div>
                <h3 className="mb-3 border-b border-gray-100 pb-1 text-lg font-semibold text-gray-800">
                  Courses Created
                </h3>
                <UserCourses userData={userData} filterByCoursesCreated />
                {/* ------------------------------------------------- */}
              </div>
            </div>
          </section>

          {/* Posts Section */}
          <section>
            <h3 className="mb-4 border-b border-gray-200 pb-2 text-center text-xl font-semibold text-gray-700">
              Your Most Recent Posts
            </h3>
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-gray-700">
                <p className="py-5 font-semibold text-gray-500">
                  You haven't posted anything yet
                </p>
                <img
                  className="max-w-xs rounded-xl border border-gray-200 shadow"
                  src={NoPost}
                  alt="no post"
                />
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <MemoizedPostOnProfile key={post._id} post={post} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default UserProfile;
