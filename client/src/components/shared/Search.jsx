import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import JoinModal from "../modals/JoinModal";
import { MoonLoader } from "react-spinners";
import { MdClear } from "react-icons/md";

const BASE_URL = process.env.REACT_APP_API_URL;
const REACT_APP_GUEST_KEYWORD =
  process.env.REACT_APP_GUEST_KEYWORD || "GUEST_KEYWORD";

const Search = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [community, setCommunity] = useState(null);
  const [joinedCommunity, setJoinedCommunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const setInitialValue = () => {
    setUsers([]);
    setPosts([]);
    setCourses([]);
    setInstructors([]);
    setCommunity(null);
    setJoinedCommunity(null);
    setLoading(false);
  };

  const searchRequestHeader = () => {
    return {
      Authorization: `Bearer ${accessToken || REACT_APP_GUEST_KEYWORD}`,
      "Content-Type": "application/json",
    };
  };

  const debouncedHandleSearch = useMemo(
    () =>
      debounce((q) => {
        setLoading(true);
        const encodedQuery = encodeURIComponent(q);
        // axios
        //   .get(`${BASE_URL}/search?q=${encodedQuery}`, {
        //     headers: {
        //       Authorization: `Bearer ${accessToken}`,
        //       "Content-Type": "application/json",
        //     },
        //   })
        axios
          .get(`${BASE_URL}/search?q=${encodedQuery}`, {
            headers: searchRequestHeader(),
          })
          .then((res) => {
            const {
              posts,
              users,
              community,
              joinedCommunity,
              courses,
              instructors,
            } = res.data;
            setPosts(posts);
            setUsers(users);
            setCourses(courses);
            setInstructors(instructors);
            setCommunity(community);
            setJoinedCommunity(joinedCommunity);
            setLoading(false);
          })

          .catch(() => {
            setLoading(false);
          });
      }, 800),
    // [accessToken]
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "") {
      setInitialValue();
      return;
    }

    debouncedHandleSearch(value);
  };

  const clearValues = () => {
    setInitialValue();
    setInputValue("");
  };

  useEffect(() => {
    return () => {
      setInitialValue();
    };
  }, []);

  const [joinModalVisibility, setJoinModalVisibility] = useState(false);
  const toggleModal = () => {
    setJoinModalVisibility((prev) => !prev);
  };
  const showSearchResult = () => {
    return (
      inputValue !== "" &&
      (loading ||
        posts.length > 0 ||
        users.length > 0 ||
        courses.length > 0 ||
        instructors.length > 0 ||
        community ||
        joinedCommunity)
    );
  };

  return (
    <div className="relative max-w-lg shrink grow">
      <div className="relative flex items-center justify-center">
        <input
          type="text"
          id="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for people, posts or communities"
          className="focus:shadow-outline-blue h-10 w-full rounded-full border bg-white py-1 pl-3 pr-10 text-sm shadow-sm transition duration-300 focus:border-blue-500 focus:outline-none "
          aria-label="Search"
          autoComplete="off"
        />
        {inputValue !== "" && (
          <button
            className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-gray-400 hover:text-gray-600"
            onClick={clearValues}
          >
            <MdClear />
          </button>
        )}
      </div>

      {/* {inputValue !== "" && ( */}
      {showSearchResult() && (
        <div
          onBlur={() => {
            !community && clearValues();
          }}
          className="absolute left-1/2 z-10 mt-1 max-h-60 w-full min-w-[22rem] -translate-x-1/2  overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg"

          // className="absolute start-0 top-12 w-screen rounded-md border bg-white shadow-md md:start-auto md:w-[660px]"
        >
          {loading && (
            <div className="flex items-center justify-center px-2 py-2">
              <MoonLoader size={20} color={"#008cff"} />
              <span className="ml-2">Searching...</span>
            </div>
          )}
          {posts.length > 0 && (
            <ul className="z-30">
              {posts.map((post) => (
                <li key={post._id} className="border-b px-4 py-2">
                  <div
                    onClick={() => {
                      navigate(`/post/${post._id}`);
                      clearValues();
                    }}
                    className="block cursor-pointer text-sm text-gray-700 hover:text-blue-500"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={post.user.avatar}
                          alt={post.user.name}
                          className="h-8 w-8 rounded-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {post.content}
                        </div>
                        <div className="text-sm text-gray-500">
                          Posted by {post.user.name} in {post.community.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {users.length > 0 && (
            <ul className="z-30">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="overflow-hidden rounded-md border-2 border-transparent px-4 py-2 transition-colors hover:border-blue-400"
                >
                  <div
                    onClick={() => {
                      navigate(`/user/${user._id}`);
                      clearValues();
                    }}
                    className="block cursor-pointer text-sm text-gray-700 hover:text-indigo-500"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {community && (
            <div className="border-b px-4 py-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={community.banner}
                    alt={community.name}
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <div className=" flex items-center justify-between gap-2 px-2">
                  <div className="">
                    <p className="font-medium">{community.name}</p>

                    <p className="line-clamp-2 text-sm">
                      {community.description}
                    </p>
                  </div>

                  {!community.isMember && (
                    <>
                      <JoinModal
                        show={joinModalVisibility}
                        onClose={() => {
                          toggleModal(false);
                          setCommunity(null);
                        }}
                        community={community}
                      />
                      <button
                        className="rounded-md bg-primary px-2 py-1 text-sm text-white"
                        onClick={() => toggleModal(true)}
                      >
                        Join
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {joinedCommunity && (
            <div
              key={joinedCommunity._id}
              onClick={() => {
                navigate(`/community/${joinedCommunity.name}`);
                clearValues();
              }}
              className="block cursor-pointer border-b px-4 py-2 text-sm text-gray-700 hover:text-indigo-500"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={joinedCommunity.banner}
                    alt={joinedCommunity.name}
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-md font-semibold text-primary">
                    {joinedCommunity.name}
                  </p>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {joinedCommunity.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          {courses.length > 0 && (
            <ul className="z-30">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="cursor-pointer border-b px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    navigate(`/courses/${course._id}`);
                    clearValues();
                  }}
                >
                  <div>
                    <p className="font-medium text-gray-900">{course.title}</p>
                    <p className="text-sm text-gray-500">
                      {course.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Level: {course.level}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {instructors.length > 0 && (
            <ul className="z-30">
              {instructors.map((inst) => (
                <li
                  key={inst._id}
                  className="cursor-pointer border-b px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    navigate(`/instructors/${inst._id}`);
                    clearValues();
                  }}
                >
                  <div>
                    <p className="font-medium text-gray-900">{inst.name}</p>
                    <p className="text-sm text-gray-500">
                      Expertise: {inst.expertise}
                    </p>
                    <p className="text-sm text-gray-500">
                      Experience: {inst.experience} yrs
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
