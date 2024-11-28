import React from "react";
import Sidebar from "./../components/Sidebar";
import MainProducts from "../components/products/MainProducts";

const ProductScreen = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <MainProducts />
      </div>
    </div>
  );
};

export default ProductScreen;
