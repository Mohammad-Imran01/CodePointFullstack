import React from "react";

const ThemeButton = () => {
  return (
    <div
      onClick={() => {
        document.documentElement.classList.toggle("dark");
        console.log(
          "theme toggled isDark: ",
          document.documentElement.classList.contains("dark")
        );
      }}
      className="flexCenter fixed bottom-2 right-2 z-10 h-10 w-10 cursor-pointer rounded-full border-2 border-white bg-slate-800 text-slate-50 duration-100 active:scale-95 md:bottom-10 md:right-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
        />
      </svg>
    </div>
  );
};

export default ThemeButton;
