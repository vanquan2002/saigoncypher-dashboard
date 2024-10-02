import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 w-1/6 bg-slate-400 h-screen">
      <p className="absolute m-3 text-3xl font-bold">Admin</p>
      <div className="flex flex-col justify-center h-screen items-center gap-4">
        <p onClick={() => navigate("/")}>Dashboard</p>
        <p onClick={() => navigate("/products")}>Products</p>
        <p onClick={() => navigate("/addproduct")}>Add product</p>
        <p onClick={() => navigate("/category")}>Categories</p>
        <p onClick={() => navigate("/orders")}>Orders</p>
        <p onClick={() => navigate("/users")}>Users</p>
        <p onClick={() => navigate("/")}>Sellers</p>
        <p onClick={() => navigate("/")}>Transactions</p>
      </div>
    </div>
  );
};

export default Sidebar;
