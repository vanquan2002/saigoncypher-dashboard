import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { AppContext } from "../../AppContext";

const SmallModal = ({ result, type }) => {
  const { isSmallModal, toggleIsSmallModal } = useContext(AppContext);

  return (
    <div
      className={`z-20 fixed bottom-16 md:bottom-12 left-3 ${
        result && isSmallModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-3 py-2 ${
          type === "error" ? "bg-red-500" : "bg-black"
        }`}
      >
        <p className="text-white leading-3 text-sm lowercase">{isSmallModal}</p>
        <button
          onClick={() => toggleIsSmallModal("")}
          type="button"
          aria-label="Đóng thông báo đã thêm sản phẩm vào giỏ hàng thành công"
        >
          <MdClose className="text-white text-lg" />
        </button>
      </div>
    </div>
  );
};

export default SmallModal;
