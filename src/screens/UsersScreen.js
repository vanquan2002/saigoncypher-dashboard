import React from "react";
import Sidebar from "./../components/Sidebar";
import MainUser from "./../components/users/MainUser";

const UsersScreen = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <MainUser />
      </div>
    </div>
  );
};

export default UsersScreen;
