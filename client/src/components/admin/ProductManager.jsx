import React from "react";

import Courses from "../../src/sections/Courses";

const ProductManager = () => {
  return (
    <div className="w-full rounded-md bg-white p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <h1 className="flex w-full flex-col items-center justify-center text-4xl text-stone-900">
            Product Manager
          </h1>
          <p className="text-center text-stone-700">
            Add, remove, Edit your products
          </p>
        </div>
        <Courses hasAdminAccess={true} />
      </div>
    </div>
  );
};

export default ProductManager;
