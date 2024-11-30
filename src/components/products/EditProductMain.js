import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editProduct, updateProduct } from "../../redux/actions/ProductActions";
import Loading from "../loadingError/Loading";
import Error from "../loadingError/Error";
import { useNavigate, useParams } from "react-router-dom";
import { CgChevronLeft } from "react-icons/cg";
import { IoAddSharp } from "react-icons/io5";

const EditProductMain = () => {
  const { id } = useParams();
  const productEdit = useSelector((state) => state.productEdit);
  const { product, loading: loadingProduct, error: errorProduct } = productEdit;

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
        name,
        price,
        description,
        images,
        sizes,
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
            <fieldset className="border border-neutral-300">
              <legend className="text-sm ml-5">Tên sản phẩm</legend>
              <input
                className="w-full outline-none px-4 pt-1 pb-1.5"
                type="text"
                placeholder="Áo thun boxy..."
                value={name || product?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>

            <fieldset className="border border-neutral-300">
              <legend className="text-sm ml-5">Mô tả sản phẩm</legend>
              <textarea
                className="resize-none w-full outline-none px-4 pt-1 pb-1.5"
                placeholder="Được làm từ chất liệu..."
                value={description || product?.description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="4"
              ></textarea>
            </fieldset>

            <fieldset className="border border-neutral-300">
              <legend className="text-sm ml-5">Chính sách hoàn trả</legend>
              <textarea
                className="resize-none w-full outline-none px-4 pt-1 pb-1.5"
                placeholder="Nếu đơn mua hàng..."
                value={returnPolicy || product?.returnPolicy}
                onChange={(e) => setReturnPolicy(e.target.value)}
                cols="30"
                rows="4"
              ></textarea>
            </fieldset>

            <fieldset className="border border-neutral-300">
              <legend className="text-sm ml-5">Hướng dẫn bảo quản</legend>
              <textarea
                className="resize-none w-full outline-none px-4 pt-1 pb-1.5"
                placeholder="Giặt máy ở nhiệt độ..."
                value={storageInstructions || product?.storageInstructions}
                onChange={(e) => setStorageInstructions(e.target.value)}
                cols="30"
                rows="4"
              ></textarea>
            </fieldset>

            <fieldset className="border border-neutral-300">
              <legend className="text-sm ml-5">Giá sản phẩm</legend>
              <input
                className="w-full outline-none px-4 pt-1 pb-1.5"
                type="text"
                placeholder="200,000đ"
                value={price || product?.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </fieldset>

            <fieldset className="border border-neutral-300">
              <legend className="text-sm ml-5">Tải ảnh thu nhỏ</legend>
              <input
                className="w-full outline-none px-4 pt-1 pb-1.5"
                type="file"
                placeholder="Tải ảnh thu nhỏ"
              />
            </fieldset>

            <fieldset className="border border-neutral-300">
              <legend className="text-sm ml-5">Tải ảnh sản phẩm</legend>
              <input
                className="w-full outline-none px-4 pt-1 pb-1.5"
                type="file"
                placeholder="Tải ảnh sản phẩm"
              />
            </fieldset>

            <fieldset className="border border-neutral-300">
              <legend className="text-sm ml-5">Kích cỡ sản phẩm</legend>
              <button
                type="button"
                onClick={addSizehHandle}
                className="text-sm bg-black text-white mt-2 mx-4 px-3 py-1.5 hover:opacity-80 flex items-center"
              >
                Tạo <IoAddSharp className="ml-1" />
              </button>

              <div
                className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 ${
                  sizes.length > 0 ? "m-4" : "m-2"
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

            <fieldset className="border border-neutral-300">
              <legend className="text-sm ml-5">Màu sản phẩm</legend>
              <input
                className="w-full outline-none px-4 pt-1 pb-1.5"
                type="text"
                placeholder="Màu trắng"
                value={color || product?.color}
                onChange={(e) => setColor(e.target.value)}
              />
            </fieldset>

            <fieldset className="border border-neutral-300">
              <legend className="text-sm ml-5">Thông số mẫu ảnh</legend>
              <div className="flex gap-8 px-4 py-2">
                <div className="w-1/3 md:w-1/6 lg:w-[10%] flex items-center gap-3">
                  <span className="text-sm text-nowrap">Cỡ</span>
                  <input
                    className="w-full outline-none px-4 pt-1 pb-1.5 bg-neutral-100"
                    type="text"
                    placeholder="s"
                    value={model.size || product?.model?.size}
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
                    value={model.height || product?.model?.height}
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
    </div>
  );
};

export default EditProductMain;
