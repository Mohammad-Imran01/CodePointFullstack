import React from "react";

const CourseCard = ({ title, description, duration, level, price }) => {
  return (
    <div className="rounded-lg border border-slate-400 bg-white/30 dark:bg-slate-700/30 text-stone-800 dark:text-stone-100 shadow-sm/30 p-6">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-50">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-100 mt-2">{description}</p>
      <p className="text-gray-500 dark:text-gray-200 mt-1">
        Duration: {duration}
      </p>
      <p className="text-gray-500 dark:text-gray-200 mt-1">Level: {level}</p>
      <p className="text-slate-800 dark:text-gray-50 font-bold mt-2">{price}</p>
    </div>
  );
};

export default CourseCard;
