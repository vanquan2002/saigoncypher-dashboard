import React from "react";
import Sidebar from "../components/Sidebar";
import Contents from "../components/productAddComponents/Contents";

const ProductAddScreen = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <Contents />
      </div>
    </div>
  );
};

export default ProductAddScreen;
