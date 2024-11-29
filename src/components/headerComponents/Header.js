import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/UserActions";

const Contents = () => {
  const dispatch = useDispatch();
  const logoutHandle = () => {
    dispatch(logout());
  };

  return (
    <div className="sticky top-0 left-0 w-full flex justify-between items-center px-5 py-3 backdrop-blur-sm bg-white/30">
      <p className="text-center text-sm font-bold uppercase">Trang Quản trị</p>
      <button
        type="button"
        onClick={logoutHandle}
        className="text-sm font-medium text-red-500"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Contents;
