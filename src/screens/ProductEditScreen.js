import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditProductMain from "../components/products/EditProductMain";
import { useParams } from "react-router-dom";

const ProductEditScreen = () => {
  const { id } = useParams();

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <Header />
        <EditProductMain productId={id} />
      </div>
    </div>
  );
};

export default ProductEditScreen;
