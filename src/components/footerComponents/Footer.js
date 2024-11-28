import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiTShirt2Fill } from "react-icons/ri";
import { RiUserSearchFill } from "react-icons/ri";
import { RiFileList3Fill } from "react-icons/ri";

const Footer = () => {
  const pagesUrl = [
    {
      id: "home",
      name: "Trang chủ",
      url: "",
      icon: AiFillHome,
    },
    {
      id: "products",
      name: "Sản phẩm",
      url: "products",
      icon: RiTShirt2Fill,
    },
    {
      id: "orders",
      name: "Đơn hàng",
      url: "orders",
      icon: RiFileList3Fill,
    },
    {
      id: "users",
      name: "Người dùng",
      url: "users",
      icon: RiUserSearchFill,
    },
  ];
  const [activePage, setActivePage] = useState(null);

  return (
    <div className="fixed left-0 bottom-0 w-full bg-neutral-200">
      <ul className="flex">
        {pagesUrl.map((item, i) => (
          <li
            key={i}
            className={`w-full py-2.5 md:px-5 ${
              activePage ? "bg-white" : "bg-transparent"
            }`}
          >
            <Link
              className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2"
              to={`/${item.url}`}
            >
              <item.icon className="text-lg" />
              <h2 className="text-xs md:text-sm">{item.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
