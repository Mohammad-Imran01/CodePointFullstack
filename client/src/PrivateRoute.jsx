import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";

const PrivateRoute = ({ userData }) => {

  const token = localStorage.getItem("profile");
  const accessToken = JSON.parse(token)?.accessToken;
  const isGuest = localStorage.getItem("userGuest") === "true";
  const isAuthenticated = userData && accessToken;

  useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      localStorage.setItem("userGuest", "true");
    }
    if (isAuthenticated) {
      localStorage.removeItem("userGuest");
    }
  }, [isAuthenticated, isGuest]);

  if (isAuthenticated || isGuest) {
    return (
      <div className="scroll-smooth">
        <Navbar userData={userData} />
        <div className="m-0 rounded-none border-0 border-blue-800 p-0">
          <Outlet />
        </div>
      </div>
    );
  }

  return <Navigate to="/signin" />;
};

export default PrivateRoute;

// import { useMemo, useEffect, useState } from "react";
// import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setInitialAuthState } from "./redux/actions/authActions";
// import Navbar from "./components/shared/Navbar";
// // import Leftbar from "./components/shared/Leftbar";
// // import Rightbar from "./components/shared/Rightbar";

// // import ModeratorRightbar from "./components/moderator/Rightbar";

// const noRightbarRoutes = [
//   /\/post\/[^/]+$/,
//   /\/community\/[^/]+$/,
//   /\/community\/[^/]+\/report$/,
//   /\/community\/[^/]+\/reported-post$/,
//   /\/community\/[^/]+\/moderator$/,
// ].map((regex) => new RegExp(regex));

// const PrivateRoute = ({ userData }) => {
//   const isAuthenticated = useMemo(() => {
//     return (userData, accessToken) => {
//       return userData && accessToken;
//     };
//   }, []);

//   // const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("profile");
//   const accessToken = JSON.parse(token)?.accessToken;

//   // const currentUserIsModerator = userData?.role === "moderator";

//   useEffect(() => {
//     if (!isAuthenticated(userData, accessToken)) {
//       dispatch(setInitialAuthState(navigate));
//     }
//   }, [dispatch, navigate, userData, accessToken, isAuthenticated]);

//   // const showRightbar = !noRightbarRoutes.some((regex) =>
//   //   regex.test(location.pathname)
//   // );

//   const [showLeftbar, setShowLeftbar] = useState(false);

//   // const toggleLeftbar = () => {
//   //   setShowLeftbar(!showLeftbar);
//   // };

//   return isAuthenticated(userData, accessToken) ? (
//     <div className="scroll-smooth">
//       <Navbar
//         userData={userData}
//         // toggleLeftbar={toggleLeftbar}
//         // showLeftbar={showLeftbar}
//       />

//       {/* <div className="md:mx-auto md:grid md:w-10/12 md:grid-cols-1 md:gap-6"> */}
//       <div className="m-0 rounded-none p-0 border-0 border-blue-800">
//         {/* <Leftbar showLeftbar={showLeftbar} /> */}

//         <Outlet />

//         {/* {showRightbar ? (
//           currentUserIsModerator ? (
//             <ModeratorRightbar />
//           ) : (
//             <Rightbar />
//           )
//         ) : null} */}
//       </div>
//     </div>
//   ) : (
//     <Navigate to="/signin" />
//   );
// };

// export default PrivateRoute;
