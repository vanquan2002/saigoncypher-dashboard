import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import MainHome from "./../components/home/MainHome";

const HomeScreen = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <Header />
        <MainHome />
      </div>
    </div>
  );
};

export default HomeScreen;
