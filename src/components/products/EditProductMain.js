import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editProduct, updateProduct } from "../../redux/actions/ProductActions";
import Loading from "../loadingError/Loading";
import Error from "../loadingError/Error";
import { useNavigate, useParams } from "react-router-dom";
import { CgChevronLeft } from "react-icons/cg";
import { RiAddLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiImageAddFill } from "react-icons/ri";
import { AppContext } from "../../AppContext";
import UpAvatarModal from "../modals/UpAvatarModal";
import { CLOUDINARY_UPLOAD_RESET } from "../../redux/constants/CloudinaryConstants";

const EditProductMain = () => {
  const { id } = useParams();
  const productEdit = useSelector((state) => state.productEdit);
  const { product, loading: loadingProduct, error: errorProduct } = productEdit;
  const { toggleIsUpAvatarModal } = useContext(AppContext);
  const cloudinaryUpload = useSelector((state) => state.cloudinaryUpload);
  const { linkImage } = cloudinaryUpload;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [storageInstructions, setStorageInstructions] = useState("");
  const [price, setPrice] = useState("");
  const [thumbImage, setThumbImage] = useState("");
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");
  const [model, setModel] = useState({ size: "", height: "" });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errSelectImage, setErrSelectImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        _id: id,
      })
    );
  };

  const addSizehHandle = () => {
    setSizes([
      ...sizes,
      {
        size: "",
        countInStock: "",
      },
    ]);
  };

  const sizeChangeHandle = (index, field, value) => {
    const updatedList = [...sizes];
    updatedList[index][field] = value;
    setSizes(updatedList);
  };

  const removeSizeHandle = (index) => {
    const updatedList = sizes.filter((_, i) => i !== index);
    setSizes(updatedList);
  };

  const imageChangeHandle = (index, field, value) => {
    const updatedList = [...images];
    updatedList[index][field] = value;
    setImages(updatedList);
  };

  const changeImgHandle = (e) => {
    const file = e.target.files[0];
    const maxSize = 10485760;
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrSelectImage("Vui lòng chọn tệp hình ảnh hợp lệ!");
        return;
      }
      if (file.size > maxSize) {
        setErrSelectImage("Kích thước tệp quá lớn (tối đa 10MB).");
        return;
      }
      setImage(URL.createObjectURL(file));
      setImageUrl(file);
      e.target.value = null;
    }
  };

  useEffect(() => {
    if (image) {
      toggleIsUpAvatarModal(true);
      setErrSelectImage("");
    }
  }, [image]);

  useEffect(() => {
    if (linkImage) {
      toggleIsUpAvatarModal(false);
      setThumbImage(linkImage);
      dispatch({
        type: CLOUDINARY_UPLOAD_RESET,
      });
    }
  }, [linkImage]);

  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setName(product.name);
      setDescription(product.description);
      setReturnPolicy(product.returnPolicy);
      setStorageInstructions(product.storageInstructions);
      setPrice(product.price);
      setThumbImage(product.thumbImage);
      setImages([...product.images]);
      setSizes([...product.sizes]);
      setColor(product.color);
      setModel({ size: product.model.size, height: product.model.height });
    }
  }, [product]);

  useEffect(() => {
    dispatch(editProduct(id));
  }, [id]);

  return (
    <div className="px-3 mt-5 mb-28">
      <button
        type="button"
        className="text-sm border border-neutral-300 px-3 py-1.5 hover:bg-neutral-100 flex items-center"
        onClick={() => navigate("/products")}
      >
        <CgChevronLeft className="mr-1" /> Tất cả sản phẩm
      </button>

      <div className="mt-8 md:px-16">
        {loadingProduct ? (
          <Loading />
        ) : errorProduct ? (
          <Error error={errorProduct} />
        ) : (
          <form onSubmit={submitHandle} className="flex flex-col gap-4">
            <fieldset className="border border-neutral-300 px-4 py-2">
              <legend className="text-sm ml-5">Tên sản phẩm</legend>
              <input
                className="w-full outline-none "
                type="text"
                placeholder="Áo thun boxy..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>

            <fieldset className="border border-neutral-300 px-4 py-2">
              <legend className="text-sm ml-5">Mô tả sản phẩm</legend>
              <textarea
                className="resize-none w-full outline-none"
                placeholder="Được làm từ chất liệu..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="4"
              ></textarea>
            </fieldset>

            <fieldset className="border border-neutral-300 px-4 py-2">
              <legend className="text-sm ml-5">Chính sách hoàn trả</legend>
              <textarea
                className="resize-none w-full outline-none"
                placeholder="Nếu đơn mua hàng..."
                value={returnPolicy}
                onChange={(e) => setReturnPolicy(e.target.value)}
                cols="30"
                rows="4"
              ></textarea>
            </fieldset>

            <fieldset className="border border-neutral-300 px-4 py-2">
              <legend className="text-sm ml-5">Hướng dẫn bảo quản</legend>
              <textarea
                className="resize-none w-full outline-none"
                placeholder="Giặt máy ở nhiệt độ..."
                value={storageInstructions}
                onChange={(e) => setStorageInstructions(e.target.value)}
                cols="30"
                rows="4"
              ></textarea>
            </fieldset>

            <fieldset className="border border-neutral-300 px-4 py-2">
              <legend className="text-sm ml-5">Giá sản phẩm</legend>
              <input
                className="w-full outline-none"
                type="text"
                placeholder="200,000đ"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </fieldset>

            <fieldset className="border border-neutral-300 px-4 py-3">
              <legend className="text-sm ml-5">Tải ảnh thu nhỏ</legend>
              <div className="w-1/2 lg:w-1/4 flex items-end gap-2">
                {thumbImage ? (
                  <img src={thumbImage} alt="" className="w-full" />
                ) : (
                  <div className="aspect-[2/3] w-full">
                    <label
                      htmlFor="file_input"
                      title="Chọn ảnh đại diện"
                      className="w-full h-full border border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                    >
                      <RiImageAddFill className="text-4xl md:text-5xl text-neutral-600" />
                    </label>

                    <input
                      onChange={changeImgHandle}
                      hidden
                      type="file"
                      id="file_input"
                    />
                  </div>
                )}
                {thumbImage && (
                  <button
                    type="button"
                    onClick={() => setThumbImage("")}
                    className="border border-gray-300 hover:bg-slate-100 p-1.5"
                  >
                    <RiDeleteBin6Line className="text-red-500 text-xl md:text-2xl" />
                  </button>
                )}
              </div>
              {errSelectImage && (
                <p className="mt-1.5 text-sm text-red-500">{errSelectImage}</p>
              )}
            </fieldset>

            <fieldset className="border border-neutral-300 px-4 py-3">
              <legend className="text-sm ml-5">Tải ảnh sản phẩm</legend>
              <ul className="flex flex-col gap-2">
                {images.map((item, i) => (
                  <li key={i} className="flex">
                    <img
                      src={item.image}
                      alt={`Ảnh của ${item.description}`}
                      className="w-1/5 lg:w-[10%] object-cover"
                    />
                    <textarea
                      className="resize-none w-full outline-none px-4 pt-1 pb-1.5"
                      placeholder="Được làm từ chất liệu..."
                      value={item.description}
                      onChange={(e) =>
                        imageChangeHandle(i, "description", e.target.value)
                      }
                      cols="30"
                      rows="4"
                    ></textarea>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset className="border border-neutral-300 px-4 py-3">
              <legend className="text-sm ml-5">Kích cỡ sản phẩm</legend>
              <button
                type="button"
                onClick={addSizehHandle}
                className="text-sm bg-black text-white px-3 py-1.5 hover:opacity-80 flex items-center"
              >
                Tạo <RiAddLine className="ml-1 text-lg" />
              </button>

              <div
                className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 ${
                  sizes.length > 0 ? "mt-3" : "mt-0"
                }`}
              >
                {sizes.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 px-3 py-2 border-dashed border border-neutral-300"
                  >
                    <div className="col-span-1 flex justify-between items-center gap-2">
                      <span className="text-sm text-nowrap">Cỡ</span>
                      <input
                        className="w-2/3 lg:w-3/4 outline-none px-4 pt-1 pb-1.5 bg-neutral-100"
                        type="text"
                        placeholder="s"
                        value={item.size}
                        onChange={(e) =>
                          sizeChangeHandle(i, "size", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-span-1 flex justify-between items-center gap-2">
                      <span className="text-sm text-nowrap">SL</span>
                      <input
                        className="w-2/3 lg:w-3/4 outline-none px-4 pt-1 pb-1.5 bg-neutral-100"
                        type="text"
                        placeholder="100"
                        value={item.countInStock}
                        onChange={(e) =>
                          sizeChangeHandle(i, "countInStock", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => removeSizeHandle(i)}
                        className="text-[13px] text-red-500"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="border border-neutral-300 px-4 py-2">
              <legend className="text-sm ml-5">Màu sản phẩm</legend>
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Màu trắng"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </fieldset>

            <fieldset className="border border-neutral-300 px-4 py-3">
              <legend className="text-sm ml-5">Thông số mẫu ảnh</legend>
              <div className="flex gap-8">
                <div className="w-1/3 md:w-1/6 lg:w-[10%] flex items-center gap-3">
                  <span className="text-sm text-nowrap">Cỡ</span>
                  <input
                    className="w-full outline-none px-4 pt-1 pb-1.5 bg-neutral-100"
                    type="text"
                    placeholder="s"
                    value={model.size}
                    onChange={(e) =>
                      setModel({ ...model, size: e.target.value })
                    }
                  />
                </div>

                <div className="w-1/2 md:w-1/5 lg:w-1/6 flex items-center gap-3">
                  <span className="text-sm text-nowrap">SL</span>
                  <input
                    className="w-full outline-none px-4 pt-1 pb-1.5 bg-neutral-100"
                    type="text"
                    placeholder="1m70"
                    value={model.height}
                    onChange={(e) =>
                      setModel({ ...model, height: e.target.value })
                    }
                  />
                </div>
              </div>
            </fieldset>
          </form>
        )}
      </div>

      <UpAvatarModal image={image} imageUrl={imageUrl} />
    </div>
  );
};

export default EditProductMain;
