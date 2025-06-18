import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLogo from "../../components/shared/AppLogo";

const Nav = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignUpClick = (ev) => {
    ev.preventDefault();
    navigate("/signup");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (window.innerWidth >= 640) {
      setMenuOpen(false);
    }
  }, []);

  return (
    <div className="dark:text-white relative flex w-full max-w-[1280px] items-center justify-between text-xl text-slate-900">
      <AppLogo />
      {/* Desktop Menu */}
      <ul className="hidden gap-12 max-lg:gap-6 max-md:gap-3 sm:flex">
        {["Home", "Company", "Marketplace", "Contact"].map((item) => (
          <li key={item}>
            <a
              href="/"
              onClick={(e) => e.preventDefault()}
              className="duration-75 ease-in-out hover:text-slate-300 active:translate-y-[1px]"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="btn-light" onClick={handleSignUpClick}>
          Log out
        </button>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="flex h-11 w-11 items-center justify-center sm:hidden"
        >
          <div className="relative flex h-[20px] w-[20px] origin-center flex-col justify-between overflow-hidden transition-all duration-300">
            <div
              className={`dark:bg-white h-[2px] w-7 origin-left transform-gpu rounded-sm bg-slate-800 transition-all duration-300 will-change-transform ${
                menuOpen ? "rotate-[42deg]" : ""
              }`}
            ></div>
            <div
              className={`dark:bg-white h-[2px] w-1/2 transform-gpu rounded-sm bg-slate-800 transition-all duration-300 will-change-transform ${
                menuOpen ? "-translate-x-10 opacity-0" : ""
              }`}
            ></div>
            <div
              className={`dark:bg-white h-[2px] w-7 origin-left transform-gpu rounded-sm bg-slate-800 transition-all duration-300 will-change-transform ${
                menuOpen ? "-rotate-[42deg]" : ""
              }`}
            ></div>
          </div>
        </button>
      </div>
      {/* Mobile Menu */}
      {
        <ul
          className={`dark:bg-slate-800 shadow-md/20 fixed  bottom-0 right-0 top-16 z-50 flex flex-col items-center gap-3 overflow-hidden bg-white py-3 shadow-md transition-all duration-300 sm:hidden ${
            menuOpen ? "w-1/2 opacity-100" : "w-0 opacity-0"
          }`}
        >
          {["Home", "Company", "Marketplace", "Contact"].map((item) => (
            <li
              key={item}
              className="dark:hover:bg-blue-600 w-full py-2 pl-5 text-left transition-colors hover:bg-blue-500"
            >
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                }}
                className="dark:text-slate-100 text-lg font-medium text-slate-800 hover:text-white"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default Nav;
