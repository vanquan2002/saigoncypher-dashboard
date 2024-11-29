import React from "react";
import { useNavigate } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import Products from "./Products";

const Contents = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-28 px-3">
      <button
        type="button"
        className="text-sm border border-neutral-300 px-3 py-1.5 mt-3 hover:bg-neutral-100 flex items-center"
        onClick={() => navigate("/addproduct")}
      >
        Tạo sản phẩm mới <IoAddSharp className="ml-1" />
      </button>

      <div className="mt-5">
        <Products />
      </div>
    </div>
  );
};

export default Contents;
