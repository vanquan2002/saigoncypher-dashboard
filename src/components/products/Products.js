import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import DeleteProductModal from "../modalComponents/DeleteProductModal";
import { AppContext } from "../../AppContext";
import Loading from "../loadingError/Loading";
import Error from "../loadingError/Error";
import { listProduct } from "./../../redux/actions/ProductActions";
import { PRODUCT_DELETE_RESET } from "../../redux/constants/ProductConstants";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const { toggleIsDeleteModal } = useContext(AppContext);
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete, error: errorDelete } = productDelete;
  const [numberOpenDeleteModal, setNumberOpenDeleteModal] = useState(null);

  const openDeleteModalHandle = (id) => {
    toggleIsDeleteModal(true);
    setNumberOpenDeleteModal(id);
  };

  useEffect(() => {
    dispatch(listProduct());
  }, []);

  useEffect(() => {
    if (successDelete) {
      dispatch(listProduct());
      dispatch({ type: PRODUCT_DELETE_RESET });
      toggleIsDeleteModal(false);
    }
  }, [successDelete]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {products.map((product, i) => (
            <li key={i} className="col-span-1">
              <img src={product.thumbImage} alt={product.name} />
              <h2 className="mt-1 text-sm leading-4 line-clamp-2">
                {product.name}
              </h2>
              <span className="text-sm font-semibold">
                {formatCurrency(product.price)}
              </span>
              <div className="mt-1 flex justify-center gap-2">
                <Link
                  to={`/product/${product._id}/edit`}
                  className="text-sm border border-neutral-300 px-4 py-0.5 hover:bg-neutral-100"
                >
                  Sửa
                </Link>
                <button
                  type="button"
                  onClick={() => openDeleteModalHandle(i)}
                  className="text-sm border border-neutral-300 px-4 py-0.5 hover:bg-neutral-100"
                >
                  Xóa
                </button>
              </div>

              <DeleteProductModal
                isOpen={i === numberOpenDeleteModal}
                product={product}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
