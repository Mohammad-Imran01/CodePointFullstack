import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/adminActions";
import ButtonLoadingSpinner from "../loader/ButtonLoadingSpinner";
import { BiLogOut } from "react-icons/bi";
import { BsPeople, BsWindowStack } from "react-icons/bs";
import { IoSettingsOutline, IoPrintOutline } from "react-icons/io5";



const Tab = ({ tabItems, activeTab, handleTabClick }) => {
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

  return (
    <div className="sticky left-0 top-0 z-30 ">
      <ul
        className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500"
        role="tablist"
      >
        {tabItems.map(({ key, label, icon: Icon }) => (
          <li key={key} className="mr-2 flex items-center">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              tabIndex={activeTab === key ? 0 : -1}
              className={`inline-flex cursor-pointer items-center rounded-t-lg border-b-2 px-2 py-2 text-stone-900  transition-colors duration-150 ${
                activeTab === key
                  ? "border-stone-900 font-bold"
                  : "border-transparent hover:font-bold hover:text-stone-800"
              }`}
              onClick={() => handleTabClick(key)}
            >
              <Icon className="mr-1" />
              {label}
            </button>
          </li>
        ))}

        <li className="mr-2 flex items-center">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "logout"}
            tabIndex={activeTab === "logout" ? 0 : -1}
            className={`inline-flex items-center border-b-2 border-transparent px-2 py-2 text-[1.0rem] text-red-800  transition-colors duration-150 hover:border-red-800`}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <BiLogOut className="mr-1" />
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
