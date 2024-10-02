import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddProductMain from "../components/products/AddProductMain";

const AddProduct = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <Header />
        <AddProductMain />
      </div>
    </div>
  );
};

export default AddProduct;
