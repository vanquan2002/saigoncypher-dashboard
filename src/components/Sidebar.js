import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/UserActions";

const Sidebar = () => {
  const pagesUrl = [
    {
      id: "home",
      name: "Trang chủ",
      url: "",
    },
    {
      id: "products",
      name: "Sản phẩm",
      url: "products",
    },
    {
      id: "orders",
      name: "Đơn hàng",
      url: "orders",
    },
    {
      id: "users",
      name: "Người dùng",
      url: "users",
    },
  ];
  const { isPageId, toggleIsPageId } = useContext(AppContext);
  const dispatch = useDispatch();
  const logoutHandle = () => {
    dispatch(logout());
  };

  return (
    <section className="sticky top-0 left-0 bg-neutral-200 h-screen">
      <p className="text-center pt-5 text-sm font-bold uppercase">
        Trang Quản trị
      </p>
      <ul className="flex flex-col items-start">
        {pagesUrl.map((item, i) => (
          <li
            key={i}
            className={`w-full py-2 px-5 ${
              isPageId === item.id ? "bg-white" : "bg-transparent"
            }`}
          >
            <Link onClick={() => toggleIsPageId(item.id)} to={`/${item.url}`}>
              <h2>{item.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={logoutHandle}
        className="mx-5 mb-32 text-red-500"
      >
        Đăng xuất
      </button>
    </section>
  );
};

export default Sidebar;
