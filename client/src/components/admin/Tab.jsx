import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/adminActions";
import ButtonLoadingSpinner from "../loader/ButtonLoadingSpinner";
import { BiLogOut } from "react-icons/bi";
import { BsPeople, BsWindowStack } from "react-icons/bs";
import { IoSettingsOutline, IoPrintOutline } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const Tab = ({ tabItems, activeTab, handleTabClick }) => {
  const [verticleNavShown, setVerticleNavShown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850); // Tailwind md breakpoint

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await dispatch(logoutAction());
      navigate("/admin/signin");
    } finally {
      setLoggingOut(false);
    }
  };

  // 🔄 Handle resize
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 850;
      setIsMobile(isNowMobile);
      if (!isNowMobile) {
        setVerticleNavShown(false); // Auto-close on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="sticky left-0 top-0 z-30"
      onBlur={()=>setVerticleNavShown (false)}
    >
      {/* 🍔 Hamburger toggle only on mobile */}
      {isMobile && (
        <button
          onClick={() => setVerticleNavShown((prev) => !prev)}
          className="rounded-full border-0 p-2"
        >
          {verticleNavShown ? <RxCross1 /> : <AiOutlineBars />}
        </button>
      )}

      {/* <ul
        className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500"
        role="tablist"
      > */}
      <ul
        className={`${
          isMobile
            ? `fixed bottom-0 right-0 top-16 w-[18rem] bg-white p-2 shadow-lg transition-all duration-200 ${
                verticleNavShown ? "block" : "hidden"
              }`
            : "-mb-px flex flex-wrap items-center text-center"
        } text-sm font-medium text-gray-500`}
        role="tablist"
      >
        {tabItems.map(({ key, label, icon: Icon }) => (
          <li key={key} className="mr-2 flex items-center">
            {/* <button
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              tabIndex={activeTab === key ? 0 : -1}
              className={`inline-flex cursor-pointer items-center whitespace-nowrap rounded-t-lg border-b-2 px-2 py-2 text-stone-900  transition-colors duration-150 ${
                activeTab === key
                  ? "border-stone-900 font-bold"
                  : "border-transparent hover:font-bold hover:text-stone-800"
              }`}
              onClick={() => handleTabClick(key)}
            > */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              tabIndex={activeTab === key ? 0 : -1}
              className={`inline-flex w-full items-center px-3 py-2 transition-colors duration-150 md:w-auto ${
                !isMobile ? "border-b-2" : ""
              } ${
                activeTab === key
                  ? "border-stone-900 font-bold text-stone-900"
                  : "border-transparent hover:font-bold hover:text-stone-800"
              }`}
              onClick={() => {
                handleTabClick(key);
                setVerticleNavShown(false); // Close on mobile after selection
              }}
            >
              <Icon className="mr-1" />
              {label}
            </button>
          </li>
        ))}

        <li className="w-full md:w-auto">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "logout"}
            tabIndex={activeTab === "logout" ? 0 : -1}
            className={`inline-flex w-full items-center ${
              isMobile
                ? "hover:border-red-800 hover:text-red-600"
                : "border-b-2 hover:border-red-800"
            } border-transparent px-3 py-2 text-red-800`}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <BiLogOut className="mr-2" />
            {loggingOut ? (
              <ButtonLoadingSpinner loadingText="Logging out..." />
            ) : (
              "Logout"
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
