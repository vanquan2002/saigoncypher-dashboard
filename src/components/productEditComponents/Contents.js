import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editProduct, updateProduct } from "../../redux/actions/ProductActions";
import Loading from "../loadingError/Loading";
import Error from "../loadingError/Error";
import { useNavigate, useParams } from "react-router-dom";
import { CgChevronLeft } from "react-icons/cg";
import { RiAddLine } from "react-icons/ri";
import { AppContext } from "../../AppContext";
import UpImageThumbModal from "../modals/UpImageThumbModal";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { CLOUDINARY_UPLOAD_RESET } from "../../redux/constants/CloudinaryConstants";
import UpImageModal from "../modals/UpImageModal";

const Contents = () => {
  const { id } = useParams();
  const productEdit = useSelector((state) => state.productEdit);
  const { product, loading: loadingProduct, error: errorProduct } = productEdit;
  const { toggleIsUpImageThumbModal, toggleIsUpImageModal } =
    useContext(AppContext);
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
  const [imageUrl, setImageUrl] = useState(null);
  const [errSelectImage, setErrSelectImage] = useState(null);
  const [typeUpload, setTypeUpload] = useState(null);
  const [descriptionImage, setDescriptionImage] = useState("");

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

  const addSizeHandle = () => {
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

  const removeImageHandle = (index) => {
    const updatedList = images.filter((_, i) => i !== index);
    setImages(updatedList);
  };

  const imageChangeHandle = (index, field, value) => {
    const updatedList = [...images];
    updatedList[index][field] = value;
    setImages(updatedList);
  };

  const changeImgHandle = (e) => {
    const file = e.target.files[0];
    const inputId = e.target.id;
    const maxSize = 10485760;
    const typeMap = {
      image_thumb_input: 1,
      image_input: 2,
    };
    if (!file) return;
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
    if (typeMap[inputId]) setTypeUpload(typeMap[inputId]);
  };

  useEffect(() => {
    if (image) {
      if (typeUpload === 1) toggleIsUpImageThumbModal(true);
      if (typeUpload === 2) toggleIsUpImageModal(true);
      if (errSelectImage) {
        setErrSelectImage("");
      }
    }
  }, [image, typeUpload]);

  useEffect(() => {
    if (linkImage) {
      const commonActions = () => {
        dispatch({ type: CLOUDINARY_UPLOAD_RESET });
        setTypeUpload(null);
        setImage(null);
        setImageUrl(null);
      };
      if (typeUpload === 1) {
        toggleIsUpImageThumbModal(false);
        setThumbImage(linkImage);
        commonActions();
      }
      if (typeUpload === 2) {
        toggleIsUpImageModal(false);
        setImages([
          ...images,
          { image: linkImage, description: descriptionImage },
        ]);
        commonActions();
      }
    }
  }, [linkImage, typeUpload]);

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
        className="text-sm hover:underline flex items-center"
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
          <form onSubmit={submitHandle} className="flex flex-col gap-7">
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

            <fieldset className="border-t md:border border-neutral-300 md:px-4 py-3">
              <legend className="text-sm ml-5">Tải ảnh thu nhỏ</legend>
              <div className="w-1/2 lg:w-1/4 flex items-end gap-3">
                <img src={thumbImage} alt="" className="w-full" />
                <div className="flex flex-col items-start gap-2">
                  <label
                    htmlFor="image_thumb_input"
                    className="px-4 py-1.5 border border-gray-300 cursor-pointer text-sm text-nowrap hover:bg-neutral-100"
                  >
                    Thay đổi ảnh
                  </label>
                  <input
                    onChange={changeImgHandle}
                    hidden
                    type="file"
                    id="image_thumb_input"
                  />

                  <span className="text-xs text-nowrap">
                    Yêu cầu ảnh tỷ lệ 2/3
                  </span>
                </div>
              </div>
              {errSelectImage && (
                <p className="mt-1.5 text-sm text-red-500">{errSelectImage}</p>
              )}
            </fieldset>

            <fieldset className="border-t md:border border-neutral-300 md:px-4 py-3">
              <legend className="text-sm ml-5">Tải ảnh sản phẩm</legend>
              <div className="flex justify-start items-center gap-3">
                <label
                  htmlFor="image_input"
                  className="text-sm cursor-pointer bg-black text-white px-3 py-1.5 hover:opacity-80 flex items-center"
                >
                  Tải ảnh
                  <AiOutlineCloudUpload className="ml-1.5 text-lg" />
                </label>
                <input
                  onChange={changeImgHandle}
                  hidden
                  type="file"
                  id="image_input"
                />
                <span className="text-xs text-nowrap">
                  Yêu cầu ảnh tỷ lệ 2/3
                </span>
              </div>

              {images.length > 0 && (
                <table className="w-full mt-4">
                  <thead>
                    <tr>
                      <td className="text-center text-sm p-2 border border-gray-300">
                        STT
                      </td>
                      <td className="text-center text-sm p-2 border border-gray-300">
                        Hình ảnh
                      </td>
                      <td className="text-center text-sm p-2 border border-gray-300">
                        Mô tả ngắn
                      </td>
                      <td className="text-center text-sm p-2 border border-gray-300">
                        Hành động
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {images.map((item, i) => (
                      <tr key={i} className="border border-gray-300">
                        <td className="text-center border-r border-gray-300">
                          {i + 1}
                        </td>
                        <td className="w-1/4 md:w-1/6 lg:w-[10%] p-0 border-r border-gray-300">
                          <img
                            src={item.image}
                            alt={`Ảnh của ${item.description}`}
                            className="w-full object-cover"
                          />
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <textarea
                            className="resize-none text-[15px] w-full outline-none px-2 py-1 bg-neutral-100"
                            placeholder="Được làm từ chất liệu..."
                            value={item.description}
                            onChange={(e) =>
                              imageChangeHandle(
                                i,
                                "description",
                                e.target.value
                              )
                            }
                            rows={4}
                            maxLength={100}
                          ></textarea>
                        </td>
                        <td className="text-center border-r border-gray-300">
                          <button
                            type="button"
                            onClick={() => removeImageHandle(i)}
                            className="text-red-500 text-sm hover:underline"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </fieldset>

            <fieldset className="border-t md:border border-neutral-300 md:px-4 py-3">
              <legend className="text-sm ml-5">Kích cỡ sản phẩm</legend>
              <button
                type="button"
                onClick={addSizeHandle}
                className="text-sm bg-black text-white px-3 py-1.5 hover:opacity-80 flex items-center"
              >
                Tạo cỡ <RiAddLine className="ml-1 text-lg" />
              </button>

              {sizes.length > 0 && (
                <table className="w-full mt-4">
                  <thead>
                    <tr>
                      <td className="text-center text-sm p-2 border border-gray-300">
                        STT
                      </td>
                      <td className="text-center text-sm p-2 border border-gray-300">
                        Cỡ
                      </td>
                      <td className="text-center text-sm p-2 border border-gray-300">
                        Số lượng
                      </td>
                      <td className="text-center text-sm p-2 border border-gray-300">
                        Hành động
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((item, i) => (
                      <tr key={i} className="border border-gray-300">
                        <td className="text-center border-r border-gray-300">
                          {i + 1}
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <input
                            className="w-full outline-none px-2 py-1 bg-neutral-100"
                            type="text"
                            placeholder="s"
                            value={item.size}
                            onChange={(e) =>
                              sizeChangeHandle(i, "size", e.target.value)
                            }
                            maxLength={4}
                          />
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <input
                            className="w-full outline-none px-2 py-1 bg-neutral-100"
                            type="text"
                            placeholder="100"
                            value={item.countInStock}
                            onChange={(e) =>
                              sizeChangeHandle(
                                i,
                                "countInStock",
                                e.target.value
                              )
                            }
                            maxLength={4}
                          />
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            onClick={() => removeSizeHandle(i)}
                            className="text-red-500 text-sm hover:underline"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
                    maxLength={4}
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

      <UpImageThumbModal image={image} imageUrl={imageUrl} />
      <UpImageModal
        image={image}
        imageUrl={imageUrl}
        descriptionImage={descriptionImage}
        setDescriptionImage={setDescriptionImage}
      />
    </div>
  );
};

export default Contents;
