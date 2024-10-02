import React, { useEffect } from "react";
// import products from "./../../data/products";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "./../../redux/actions/ProductActions";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete, error: errorDelete } = productDelete;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch, successDelete]);

  return (
    <div>
      <div className="flex border-2 border-indigo-600 m-2 p-2 gap-24">
        <p>PRODUCTS</p>
        <p onClick={() => navigate("/addproduct")}>Create</p>
      </div>
      <div className="flex border-2 border-indigo-600 m-2 p-2 gap-24">
        <p>Search...</p>
        <div className="flex gap-5">
          <select>
            <option value="" key="">
              All categories
            </option>
          </select>
          <select>
            <option value="" key="">
              Latest added
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap border-2 border-indigo-600 m-2 p-2">
        {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {products.map((product, i) => (
              <Product key={i} product={product} />
            ))}
          </>
        )}
      </div>
      <div>Preve 1 2 3 Next</div>
    </div>
  );
};

export default Main;
