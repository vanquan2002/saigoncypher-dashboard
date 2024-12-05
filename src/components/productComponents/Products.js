import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import DeleteProductModal from "../modals/DeleteProductModal";
import { AppContext } from "../../AppContext";
import Loading from "../loadingError/Loading";
import Error from "../loadingError/Error";
import { listProduct } from "../../redux/actions/ProductActions";

const Products = ({ setTypeModal }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const { toggleIsDeleteModal } = useContext(AppContext);
  const [numberOpenDeleteModal, setNumberOpenDeleteModal] = useState(null);

  const openDeleteModalHandle = (id) => {
    toggleIsDeleteModal(true);
    setNumberOpenDeleteModal(id);
  };

  useEffect(() => {
    dispatch(listProduct());
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5">
          {products.map((product, i) => (
            <li key={i} className="col-span-1">
              <div className="border border-dashed border-neutral-300">
                <img
                  src={product.thumbImage}
                  alt={product.name}
                  className="w-full aspect-[2/3] object-contain"
                />
              </div>
              <h2 className="mt-2 text-sm leading-4 line-clamp-2">
                {product.name}
              </h2>
              <span className="text-sm font-semibold">
                {formatCurrency(product.price)}
              </span>
              <div className="mt-1 w-full flex gap-2">
                <Link
                  to={`/product/${product._id}/edit`}
                  className="w-full text-sm border border-neutral-300 px-4 py-1 hover:bg-neutral-100 text-center"
                >
                  Sửa
                </Link>
                <button
                  type="button"
                  onClick={() => openDeleteModalHandle(i)}
                  className="w-full text-sm border border-neutral-300 px-4 py-1 hover:bg-neutral-100"
                >
                  Xóa
                </button>
              </div>

              <DeleteProductModal
                isOpen={i === numberOpenDeleteModal}
                product={product}
                setTypeModal={setTypeModal}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
