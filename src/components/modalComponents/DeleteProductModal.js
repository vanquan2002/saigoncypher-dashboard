import React, { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { deleteProduct } from "../../redux/actions/ProductActions";
import { useDispatch } from "react-redux";

const DeleteProductModal = ({ isOpen, product }) => {
  const dispatch = useDispatch();
  const { isDeleteModal, toggleIsDeleteModal } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = isDeleteModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDeleteModal]);

  return (
    <div
      onClick={() => toggleIsDeleteModal(false)}
      className={`z-20 ${
        isDeleteModal && isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } duration-300 bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-neutral-300 w-full md:w-2/3 lg:w-1/3 mx-3 md:mx-0 p-4"
      >
        <h4 className="leading-3 uppercase font-semibold">
          Xác nhận xóa sản phẩm
        </h4>
        <p className="mt-4 text-sm">
          Bạn có chắc chắn muốn xóa:
          <span className="ml-1 font-medium">{product.name}</span> ?
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => toggleIsDeleteModal(false)}
            className="text-sm border border-neutral-300 px-6 py-1.5 hover:bg-neutral-100"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => dispatch(deleteProduct(product._id))}
            className="text-sm border border-neutral-300 px-6 py-1.5 hover:bg-neutral-100 text-red-500"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
