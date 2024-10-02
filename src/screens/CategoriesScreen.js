import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import MainCategories from "./../components/categories/MainCategories";

const CategoriesScreen = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <Header />
        <MainCategories />
      </div>
    </div>
  );
};

export default CategoriesScreen;
