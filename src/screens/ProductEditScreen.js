import React from "react";
import Sidebar from "../components/Sidebar";
import EditProductMain from "../components/products/EditProductMain";
import { useParams } from "react-router-dom";

const ProductEditScreen = () => {
  const { id } = useParams();

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <EditProductMain productId={id} />
      </div>
    </div>
  );
};

export default ProductEditScreen;
