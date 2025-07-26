import React from "react";

import Courses from "../../src/sections/Courses";
import Instructors from "../../src/sections/Instructors";
import MainMCQ from "../mcq/MainMCQ.tsx";

const ProductManager = () => {
  return (
    <div className="flex h-full flex-col rounded-sm bg-stone-100 p-5">
      {/* Header (non-scrollable) */}
      <div className="mb-5 flex flex-col">
        <h1 className="flex w-full flex-col items-center justify-center text-4xl text-stone-900">
          Product Manager
        </h1>
        <p className="text-center text-stone-700">
          Add, remove, Edit your products
        </p>
      </div>

      {/* Scrollable content */}
      <div className="flex min-h-0 flex-grow flex-col gap-5 overflow-y-auto">
        <Courses hasAdminAccess={true} />
        <Instructors hasAdminAccess={true} />
        <MainMCQ hasAdminAccess={true} />
      </div>
      <div className="py-5"></div>
    </div>
  );
};

export default ProductManager;
