import React, { useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppContext } from "../../AppContext";
import { MdClose } from "react-icons/md";
import debounce from "lodash.debounce";
import { CLOUDINARY_UPLOAD_RESET } from "../../redux/constants/CloudinaryConstants";
import { uploadImage } from "../../redux/actions/CloudinaryActions";

const UpImageModal = ({
  image,
  imageUrl,
  descriptionImage,
  setDescriptionImage,
}) => {
  const dispatch = useDispatch();
  const { isUpImageModal, toggleIsUpImageModal } = useContext(AppContext);
  const cloudinaryUpload = useSelector((state) => state.cloudinaryUpload);
  const { loading, error } = cloudinaryUpload;

  const closeModalUpImgHandle = () => {
    if (!loading) {
      toggleIsUpImageModal(false);
    }
    if (error) {
      dispatch({
        type: CLOUDINARY_UPLOAD_RESET,
      });
    }
  };

  const debouncedUpdateProfile = useMemo(
    () =>
      debounce(() => {
        dispatch(uploadImage(imageUrl));
      }, 200),
    [imageUrl]
  );

  useEffect(() => {
    document.body.style.overflow = isUpImageModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isUpImageModal]);

  return (
    <div
      onClick={() => closeModalUpImgHandle()}
      className={`z-20 ${
        isUpImageModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } duration-300 bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white border border-neutral-300 w-full md:w-2/3 lg:w-2/5 mx-3 md:mx-0 pt-3 pb-5 px-5"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium">Chọn ảnh tải lên.</h4>
          <button
            type="button"
            onClick={() => closeModalUpImgHandle()}
            className={`${loading && "opacity-30 pointer-events-none"}`}
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <div className="mt-4 w-full flex gap-4">
          <div className="w-1/2 border border-dashed border-neutral-300">
            <img src={image} alt="" className="aspect-[2/3] object-contain" />
          </div>

          <fieldset className="w-1/2 border border-neutral-300 px-3 py-2">
            <legend className="text-[13px]">Nhập mô tả ngắn</legend>
            <textarea
              className="w-full h-full resize-none outline-none text-sm"
              placeholder="Ảnh của áo thun..."
              value={descriptionImage}
              onChange={(e) => setDescriptionImage(e.target.value)}
              maxLength={100}
            ></textarea>
          </fieldset>
        </div>

        {error && <span className="text-sm text-red-500">{error}</span>}
        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={() => closeModalUpImgHandle()}
            className={`lowercase w-full text-sm border border-black py-2 hover:bg-neutral-100 ${
              loading && "opacity-30 pointer-events-none"
            }`}
          >
            Hủy bỏ.
          </button>
          <button
            type="button"
            onClick={() => debouncedUpdateProfile()}
            className={`lowercase w-full text-sm bg-black text-white py-2 hover:opacity-80 ${
              loading && "opacity-30 pointer-events-none"
            }`}
          >
            {loading ? "Đang tải lên..." : "Tải lên."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpImageModal;
