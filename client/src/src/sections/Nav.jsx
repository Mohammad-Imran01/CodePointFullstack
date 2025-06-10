import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="relative max-w-[1280px] w-full text-slate-900 dark:text-white flex items-center justify-between text-xl">
      <a className="text-3xl textTitle font-normal cursor-pointer">
        Code Point
      </a>
      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-12 max-lg:gap-6 max-md:gap-3">
        {["Home", "Company", "Marketplace", "Contact"].map((item) => (
          <li key={item}>
            <a
              href="#"
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
          Sign Up
        </button>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="sm:hidden flex items-center justify-center w-11 h-11"
        >
          <div className="relative flex flex-col justify-between w-[20px] h-[20px] transition-all duration-300 origin-center overflow-hidden">
            <div
              className={`bg-slate-800 dark:bg-white h-[2px] w-7 rounded-sm transform-gpu will-change-transform transition-all duration-300 origin-left ${
                menuOpen ? "rotate-[42deg]" : ""
              }`}
            ></div>
            <div
              className={`bg-slate-800 dark:bg-white h-[2px] w-1/2 rounded-sm transform-gpu will-change-transform transition-all duration-300 ${
                menuOpen ? "-translate-x-10 opacity-0" : ""
              }`}
            ></div>
            <div
              className={`bg-slate-800 dark:bg-white h-[2px] w-7 rounded-sm transform-gpu will-change-transform transition-all duration-300 origin-left ${
                menuOpen ? "-rotate-[42deg]" : ""
              }`}
            ></div>
          </div>
        </button>
      </div>
      {/* Mobile Menu */}
      {
        <ul
          className={`overflow-hidden dark:bg-slate-800 bg-white  fixed right-0 top-16 bottom-0 shadow-md/20 sm:hidden flex flex-col items-center gap-3 py-3 z-50 shadow-md transition-all duration-300 ${
            menuOpen ? "w-1/2 opacity-100" : "w-0 opacity-0"
          }`}
        >
          {["Home", "Company", "Marketplace", "Contact"].map((item) => (
            <li
              key={item}
              className="w-full text-left pl-5 py-2 transition-colors hover:bg-blue-500 dark:hover:bg-blue-600"
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                }}
                className="text-slate-800 dark:text-slate-100 hover:text-white text-lg font-medium"
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
