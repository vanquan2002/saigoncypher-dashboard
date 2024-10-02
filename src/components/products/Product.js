import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/ProductActions";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteHandle = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="w-1/4 border-2 border-indigo-600 p-2">
      <img src={product.image} alt="" />
      <p>{product.name}</p>
      <p>${product.price}</p>
      <div className="flex">
        <p
          onClick={() => navigate(`/product/${product._id}/edit`)}
          className="border-2 border-indigo-600 m-2 p-2"
        >
          edit
        </p>
        <p
          onClick={() => deleteHandle(product._id)}
          className="border-2 border-indigo-600 m-2 p-2"
        >
          delete
        </p>
      </div>
    </div>
  );
};

export default Product;
