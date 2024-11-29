import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  editProduct,
  updateProduct,
} from "./../../redux/actions/ProductActions";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/ProductConstants";

const EditProductMain = ({ productId }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);

  const toastObject = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const dispatch = useDispatch();
  const productEdit = useSelector((state) => state.productEdit);
  const { loading, product, error } = productEdit;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: LoadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        image,
        countInStock,
        images,
        sizes,
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated!", toastObject);
    } else {
      if (!product?.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setImages(product.images);
        setSizes(product.sizes);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  return (
    <div>
      {LoadingUpdate && <Loading />}
      {errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <form
          onSubmit={submitHandle}
          className="border-2 border-indigo-600 m-2 p-2"
        >
          <div className="flex gap-36">
            <p className="border-2 border-indigo-600 m-2 p-2">Go to product</p>
            <p>Update product</p>
            <button
              type="submit"
              className="border-2 border-indigo-600 m-2 p-2"
            >
              Publish now
            </button>
          </div>
          <p>Product title:</p>
          <input
            className="border-2 border-indigo-600 m-2 p-2"
            type="text"
            placeholder="Type here"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Price:</p>
          <input
            className="border-2 border-indigo-600 m-2 p-2"
            type="text"
            placeholder="Type here"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <p>Count In Stock:</p>
          <input
            className="border-2 border-indigo-600 m-2 p-2"
            type="text"
            placeholder="Type here"
            required
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
          <p>Description:</p>
          <input
            className="border-2 border-indigo-600 m-2 p-2"
            type="text"
            placeholder="Type here"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Sizes:</p>
          <input
            className="border-2 border-indigo-600 m-2 p-2"
            type="text"
            placeholder="Type here"
            required
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
          />
          <p>Image:</p>
          <input
            className="border-2 border-indigo-600 m-2 p-2"
            type="text"
            placeholder="Enter Image URL"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <p>Images:</p>
          {images.length > 0 &&
            images.map((img, i) => (
              <input
                key={i}
                className="border-2 border-indigo-600 m-2 p-2"
                type="text"
                placeholder="Enter Image URL"
                required
                value={img}
                onChange={(e) => setImages((prev) => [...prev, e.target.value])}
              />
            ))}
        </form>
      )}
    </div>
  );
};

export default EditProductMain;
