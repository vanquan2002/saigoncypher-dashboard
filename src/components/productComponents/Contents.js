import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import Products from "./Products";
import { AppContext } from "../../AppContext";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../redux/actions/ProductActions";
import { PRODUCT_DELETE_RESET } from "../../redux/constants/ProductConstants";
import SmallModal from "../modals/SmallModal";

const Contents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete, error: errorDelete } = productDelete;
  const [typeModal, setTypeModal] = useState("");
  const { toggleIsDeleteModal, toggleIsSmallModal } = useContext(AppContext);

  useEffect(() => {
    if (successDelete) {
      dispatch(listProduct());
      dispatch({ type: PRODUCT_DELETE_RESET });
      toggleIsDeleteModal(false);
      toggleIsSmallModal("Xóa sản phẩm thành công");
      setTypeModal("success");
    }
  }, [successDelete]);

  useEffect(() => {
    if (errorDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      toggleIsDeleteModal(false);
      toggleIsSmallModal(`Lỗi: ${errorDelete}`);
      setTypeModal("error");
    }
  }, [errorDelete]);

  return (
    <div className="px-3 mt-5 mb-28">
      <button
        type="button"
        className="text-sm border border-neutral-300 px-3 py-1.5 hover:bg-neutral-100 flex items-center"
        onClick={() => navigate("/addproduct")}
      >
        Tạo sản phẩm mới <IoAddSharp className="ml-1" />
      </button>

      <div className="mt-5">
        <Products setTypeModal={setTypeModal} />
      </div>

      <SmallModal
        result={["success", "error"].includes(typeModal)}
        type={typeModal}
      />
    </div>
  );
};

export default Contents;
