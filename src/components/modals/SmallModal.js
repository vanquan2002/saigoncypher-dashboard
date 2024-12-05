import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { AppContext } from "../../AppContext";

const SmallModal = ({ result, type }) => {
  const { isSmallModal, toggleIsSmallModal } = useContext(AppContext);

  return (
    <div
      className={`z-20 fixed bottom-16 md:bottom-12 left-0 flex justify-center w-full ${
        result && isSmallModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-[calc(100%-24px)] lg:w-[calc(100%-40px)] flex items-start justify-between gap-3 py-2 px-3 lg:px-5 ${
          type === "error" ? "bg-red-500" : "bg-green-600"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-white leading-4 text-sm lowercase">
            {isSmallModal}
          </p>
        </div>
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
