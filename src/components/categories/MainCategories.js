import React from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";

const MainCategories = () => {
  return (
    <div>
      <div className="flex gap-9">
        <CreateCategory />
        <CategoriesTable />
      </div>
    </div>
  );
};

export default MainCategories;
