import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import MainProducts from "../components/products/MainProducts";

const ProductScreen = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <Header />
        <MainProducts />
      </div>
    </div>
  );
};

export default ProductScreen;
