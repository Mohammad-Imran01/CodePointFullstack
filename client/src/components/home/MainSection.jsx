import { memo, useMemo, useEffect, useState, useCallback } from "react";
import {
  getPostsAction,
  clearPostsAction,
} from "../../redux/actions/postActions";
import { useSelector, useDispatch } from "react-redux";
import Post from "../post/Post";
import CommonLoading from "../loader/CommonLoading";
import Home from "../../assets/home.jpg";

import Hero from "../../src/sections/Hero";
import About from "../../src/sections/About";
import SuccessStories from "../../src/sections/SuccessStories";
import Courses from "../../src/sections/Courses";
import Instructors from "../../src/sections/Instructors";
import Contact from "../../src/sections/Contact";
import FAQs from "../../src/sections/FAQs";
import Footer from "../../src/sections/Footer";
import MainMCQ from "../mcq/MainMCQ";

const MemoizedPost = memo(Post);
const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`flexCenter w-full px-2 max-sm:pt-3 sm:pt-6 md:px-3 md:py-4 lg:px-8 lg:pt-6 ${className} border-0 odd:border-purple-400 even:border-yellow-500`}
    >
      <div className="flexCenter mx-auto w-full  max-w-7xl sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};
const LoadMoreButton = ({ onClick, isLoading }) => (
  <button
    className="my-3 w-full rounded-md bg-primary p-2 text-sm font-semibold text-white hover:bg-blue-700"
    onClick={onClick}
    disabled={isLoading}
  >
    {isLoading ? "Loading..." : "Load More Posts"}
  </button>
);

const MainSection = ({ userData }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const posts = useSelector((state) => state.posts?.posts);
  const totalPosts = useSelector((state) => state.posts?.totalPosts);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  const LIMIT = 10;

  useEffect(() => {
    if (userData) {
      dispatch(getPostsAction(LIMIT, 0)).finally(() => {
        setIsLoading(false);
      });
    }

    return () => {
      dispatch(clearPostsAction());
    };
  }, [userData, dispatch, LIMIT]);

  const handleLoadMore = useCallback(() => {
    setIsLoadMoreLoading(true);
    dispatch(getPostsAction(LIMIT, posts.length)).finally(() => {
      setIsLoadMoreLoading(false);
    });
  }, [dispatch, LIMIT, posts.length]);

  const memoizedPosts = useMemo(() => {
    return posts.map((post) => <MemoizedPost key={post._id} post={post} />);
  }, [posts]);

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <CommonLoading />
  //     </div>
  //   );
  // }
  return (
    <>
      {/* <div>{memoizedPosts}</div>
      {posts.length > 0 && posts.length < totalPosts && (
        <LoadMoreButton
          onClick={handleLoadMore}
          isLoading={isLoadMoreLoading}
        />
      )} */}
      {/* {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center text-gray-700">
          <p className="py-5 font-semibold">
            No posts to show. Join a community and post something.
          </p>
          <img loading="lazy" src={Home} alt="no post" />
        </div>
      )} */}

      <Container className="!md:p-44 dark:bg-slate-800 bg-blue-50 max-md:!pb-16 md:!py-32">
        <Hero />
      </Container>

      <Container>
        <MainMCQ userData={userData} />
      </Container>

      <Container>
        <About />
      </Container>

      <Container>
        <SuccessStories />
      </Container>

      <Container>
        <Courses userData={userData} />
      </Container>

      <Container>
        <Instructors />
      </Container>

      <Container>
        <Contact />
      </Container>

      <Container>
        <FAQs />
      </Container>

      <Container className="dark:bg-slate-800 mt-5 bg-blue-50">
        <Footer />
      </Container>
    </>
  );
};

export default MainSection;
