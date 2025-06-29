import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search";
import { memo } from "react";
import { logoutAction } from "../../redux/actions/authActions";
import { IoLogOutOutline } from "react-icons/io5";
import { Transition } from "@headlessui/react";
import { AiOutlineBars } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import ModeratorRightbar from "../../components/moderator/Rightbar";
import {
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineRectangleStack,
  HiOutlineTag,
} from "react-icons/hi2";

import { FaUserPlus } from "react-icons/fa";

import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

import Logo from "../../assets/SocialEcho.png";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";

import { getModProfileAction } from "../../redux/actions/authActions";
import CommonLoading from "../loader/CommonLoading";
import AppLogo from "./AppLogo";

const NavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary"
  >
    <span className="text-xl">{icon}</span>
    <p>{label}</p>
  </Link>
);

const Navbar = ({ userData, toggleLeftbar, showLeftbar }) => {
  const dispatch = useDispatch();
  const [loggingOut, setLoggingOut] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRightBar, setShowRightBar] = useState(false);

  const [hasUser, setHasUser] = useState(!false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(getModProfileAction());
  }, [dispatch]);
  const moderator = useSelector((state) => state.moderation?.modProfile);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = async () => {
    setLoggingOut(true);
    await dispatch(logoutAction());
    setLoggingOut(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="flexCenter sticky top-0 z-20 gap-10 bg-white p-2 py-3 shadow-sm">
      <div className="flex max-w-screen-xl items-center justify-between gap-5 max-md:w-[93%] md:w-[96%]">
        <Link to="/" className=" md:inline-block">
          <AppLogo mainLogo />
        </Link>

        {/* <button className="inline-block md:hidden" onClick={toggleLeftbar}>
        {showLeftbar ? <RxCross1 /> : <AiOutlineBars />}
      </button> */}

        <div className="flex shrink grow items-center justify-center">
          <Search />
        </div>

        <div className="relative flex items-center justify-end">
          {/* <div className="w-3"></div> */}
          <button
            className="flex shrink-0 items-center justify-center rounded-full bg-stone-200 p-2"
            onClick={() => setShowRightBar((curr) => !curr)}
            onBlur={() => setShowRightBar(false)}
          >
            {showRightBar ? <RxCross1 /> : <AiOutlineBars />}
          </button>
          <Transition
            show={showRightBar}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {() => (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-7 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <div
                  className={
                    `rounded-md border bg-white/80 p-5`
                    // ${ moderator ? "h-[85vh]" : "h-24" }`
                  }
                >
                  {userData ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <img
                          src={moderator?.avatar || userData?.avatar || ""}
                          alt="user"
                          className="h-20 w-20 rounded-full object-cover"
                        />

                        <Link to={`/profile`}>
                          <p className="font-bold">
                            {userData?.name || moderator?.name || "User"}
                          </p>
                        </Link>

                        <p className="text-sm text-gray-600">
                          {moderator?.email || userData?.email || ""}
                        </p>
                        <p className="text-xs text-gray-500">
                          Joined:{" "}
                          {userData?.createdAt || moderator?.createdAt || ""}
                        </p>
                      </div>

                      <NavLink
                        to="/home"
                        icon={<HiOutlineHome />}
                        label="Home"
                      />
                      <NavLink
                        to="/profile"
                        icon={<HiOutlineUserCircle />}
                        label="Profile"
                      />
                      <NavLink
                        to="/saved"
                        icon={<HiOutlineTag />}
                        label="Saved"
                      />
                      <div className="flex justify-center">
                        <button
                          type="button"
                          className="block w-full px-4 py-2  text-left text-sm text-red-400 hover:cursor-pointer hover:text-red-600"
                          role="menuitem"
                          onClick={logout}
                          disabled={loggingOut}
                        >
                          {loggingOut ? (
                            <div className="text-center">Logging out...</div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <span>Logout</span>
                              <IoLogOutOutline className="ml-2" />
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <NavLink
                        to="/signin"
                        icon={<FaSignInAlt />}
                        label="Login"
                      />
                      <NavLink
                        to="/signup"
                        icon={<FaUserPlus />}
                        label="Sign Up"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </Transition>
        </div>
        {/* </div> */}
      </div>
    </nav>
  );
};

export default memo(Navbar);
