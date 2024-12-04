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
import { RiDeleteBin6Line } from "react-icons/ri";
import { CLOUDINARY_UPLOAD_RESET } from "../../redux/constants/CloudinaryConstants";
import UpImageModal from "../modals/UpImageModal";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/ProductConstants";
import SmallModal from "../modals/SmallModal";
import PreviewImageModal from "../modals/PreviewImageModal";

const Contents = () => {
  const { id } = useParams();
  const productEdit = useSelector((state) => state.productEdit);
  const { product, loading: loadingProduct, error: errorProduct } = productEdit;
  const {
    toggleIsUpImageThumbModal,
    toggleIsUpImageModal,
    isSmallModal,
    toggleIsSmallModal,
    toggleIsPreviewModal,
  } = useContext(AppContext);
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
  const [typeModal, setTypeModal] = useState("");
  const [indexImageChange, setIndexImageChange] = useState(null);
  const [linkImagePreview, setLinkImagePreview] = useState(null);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        description,
        returnPolicy,
        storageInstructions,
        price,
        thumbImage,
        images,
        sizes,
        color,
        model,
      })
    );
    toggleIsSmallModal("");
    setTypeModal("");
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
    if (isSmallModal) toggleIsSmallModal("");
    if (typeModal) setTypeModal("");
    const indexImage = e.target.dataset.index;
    const file = e.target.files[0];
    const inputId = e.target.id;
    const maxSize = 10485760;
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrSelectImage("Vui lòng chọn tệp hình ảnh hợp lệ!");
      e.target.value = null;
      return;
    }
    if (file.size > maxSize) {
      setErrSelectImage("Kích thước tệp quá lớn (tối đa 10MB).");
      e.target.value = null;
      return;
    }
    setImage(URL.createObjectURL(file));
    setImageUrl(file);
    if (inputId === "image_thumb_input") {
      setTypeUpload(1);
    } else if (inputId === "image_input") {
      setTypeUpload(2);
    } else if (inputId.startsWith("image_change")) {
      setTypeUpload(3);
      if (indexImage) {
        setIndexImageChange(indexImage);
      }
    }
    e.target.value = null;
  };
  const openPreviewImageHandle = (linkImage) => {
    setLinkImagePreview(linkImage);
    toggleIsPreviewModal(true);
  };

  useEffect(() => {
    if (image) {
      if (typeUpload === 1 || typeUpload === 3) toggleIsUpImageThumbModal(true);
      if (typeUpload === 2) toggleIsUpImageModal(true);
      if (errSelectImage) setErrSelectImage(null);
    }
  }, [image]);
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
        setDescriptionImage("");
        setImages([
          ...images,
          { image: linkImage, description: descriptionImage },
        ]);
        commonActions();
      }
      if (typeUpload === 3) {
        toggleIsUpImageThumbModal(false);
        setImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[indexImageChange] = {
            ...updatedImages[indexImageChange],
            image: linkImage,
          };
          return updatedImages;
        });
        commonActions();
        setIndexImageChange(null);
      }
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
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toggleIsSmallModal("Cập nhật sản phẩm thành công");
      setTypeModal("success");
    }
  }, [successUpdate]);
  useEffect(() => {
    if (errorUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toggleIsSmallModal(`Lỗi: ${errorUpdate}`);
      setTypeModal("error");
    }
  }, [errorUpdate]);
  useEffect(() => {
    if (errSelectImage) {
      toggleIsSmallModal(errSelectImage);
      setTypeModal("error");
      setErrSelectImage(null);
    }
  }, [errSelectImage]);

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
              <div className="flex items-end gap-3">
                <div className="w-1/2 md:w-1/3 lg:w-1/5 flex justify-center items-center border border-dashed border-neutral-300">
                  <img
                    src={thumbImage}
                    alt=""
                    className="w-full aspect-[2/3] object-contain cursor-pointer"
                    onClick={() => openPreviewImageHandle(thumbImage)}
                  />
                </div>

                <div className="flex flex-col items-start gap-2">
                  <label
                    htmlFor="image_thumb_input"
                    className="px-3 py-1 border border-gray-300 cursor-pointer text-sm text-nowrap hover:bg-neutral-100"
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
            </fieldset>

            <fieldset className="border-t md:border border-neutral-300 md:px-4 py-3">
              <legend className="text-sm ml-5">Tải ảnh sản phẩm</legend>
              <div className="flex justify-start items-center gap-3">
                <label
                  htmlFor="image_input"
                  className="text-sm cursor-pointer bg-black text-white px-3 py-1.5 hover:opacity-80 flex items-center"
                >
                  Tải ảnh mới
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
                <table className="w-full h-full mt-4">
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
                        Xóa
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {images.map((item, i) => (
                      <tr key={i} className="border border-gray-300">
                        <td className="text-center border-r border-gray-300">
                          {i + 1}
                        </td>
                        <td className="w-1/3 md:w-[18%] lg:w-[12%] p-0 border-r border-gray-300 relative">
                          <img
                            src={item.image}
                            alt={`Ảnh của ${item.description}`}
                            className="aspect-[2/3] object-contain cursor-pointer"
                            onClick={() => openPreviewImageHandle(item.image)}
                          />
                          <div className="absolute bottom-0 left-0 backdrop-blur-sm bg-black/30 flex justify-center w-full">
                            <label
                              htmlFor={`image_change_${i}`}
                              className="text-sm text-center cursor-pointer text-white py-1 w-full"
                            >
                              Thay đổi
                            </label>
                            <input
                              onChange={changeImgHandle}
                              hidden
                              type="file"
                              id={`image_change_${i}`}
                              data-index={i}
                            />
                          </div>
                        </td>
                        <td className="border-r border-gray-300 w-full p-3">
                          <textarea
                            className="w-full h-full resize-none text-[15px] outline-none"
                            placeholder="Được làm từ chất liệu..."
                            value={item.description}
                            onChange={(e) =>
                              imageChangeHandle(
                                i,
                                "description",
                                e.target.value
                              )
                            }
                            maxLength={100}
                          ></textarea>
                        </td>
                        <td className="text-center border-r border-gray-300">
                          <button
                            type="button"
                            onClick={() => removeImageHandle(i)}
                          >
                            <RiDeleteBin6Line className="text-red-500" />
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
                        Xóa
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
                          >
                            <RiDeleteBin6Line className="text-red-500" />
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

            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className={`text-sm bg-black text-white px-3 py-1.5 hover:opacity-80 ${
                  LoadingUpdate && "bg-opacity-30 pointer-events-none"
                }`}
              >
                {LoadingUpdate ? "Đang cập nhật..." : "Cập nhật"}
              </button>
            </div>
          </form>
        )}
      </div>

      <SmallModal
        result={["success", "error"].includes(typeModal)}
        type={typeModal}
      />
      <PreviewImageModal linkImagePreview={linkImagePreview} />
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
