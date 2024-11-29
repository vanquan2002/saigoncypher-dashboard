import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProduct } from "./../../redux/actions/ProductActions";
import { PRODUCT_CREATE_RESET } from "./../../redux/constants/ProductConstants";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");
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
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, product, error } = productCreate;

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
        name,
        price,
        description,
        countInStock,
        images,
        sizes,
        color
      )
    );
  };

  const setSizeHandle = (text) => {
    const sizeSplit = text.split(",");
    setSizes(sizeSplit);
  };
  const handleUploadSuccess = (imageUrl) => {
    setImages((prevImages) => [...prevImages, imageUrl]);
  };
  // console.log(images);

  useEffect(() => {
    if (product) {
      toast.success("Product Added!", toastObject);
      dispatch({ type: PRODUCT_CREATE_RESET });
      // setName("");
      // setPrice(0);
      // setCountInStock(0);
      // setDescription("");
      // setImages([]);
      // setSizes([]);
      // setColor("");
    }
  }, [product, dispatch]);

  return (
    <div>
      <form className="border-2 border-indigo-600 m-2 p-2">
        <div className="flex gap-36">
          <p className="border-2 border-indigo-600 m-2 p-2">Go to product</p>
          <p>Add product</p>
          <button
            onClick={submitHandle}
            type="submit"
            className="border-2 border-indigo-600 m-2 p-2"
          >
            Publish now
          </button>
        </div>
        {loading && <Loading />}
        {error && <Message variant="alert-danger">{error}</Message>}

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
          onChange={(e) => setSizeHandle(e.target.value)}
        />

        <p>Color:</p>
        <input
          className="border-2 border-indigo-600 m-2 p-2"
          type="text"
          placeholder="Type here"
          required
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <p>Images:</p>
        <CloudinaryUploadWidget onUploadSuccess={handleUploadSuccess} />
      </form>
    </div>
  );
};

export default AddProductMain;
