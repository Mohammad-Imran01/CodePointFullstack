import React from "react";

import Courses from "../../src/sections/Courses";

const ProductManager = () => {
  return (
    <div className="mb-10 mt-3 w-full rounded-md border-2 border-blue-100 bg-white p-5">
      <div className="flex flex-col gap-10 py-5">
        <div className="my2 rounded-md bg-purple-400 pb-8 pt-4">
          <h1 className="flex w-full flex-col items-center justify-center text-4xl text-stone-50">
            Product Manager
          </h1>
          <p className="text-center text-stone-200">
            Add, remove, Edit your products
          </p>
        </div>
        <Courses hasAdminAccess={true} />
      </div>
    </div>
  );
};

export default ProductManager;
