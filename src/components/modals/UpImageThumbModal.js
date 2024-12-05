import React, { useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppContext } from "../../AppContext";
import { MdClose } from "react-icons/md";
import debounce from "lodash.debounce";
import { CLOUDINARY_UPLOAD_RESET } from "../../redux/constants/CloudinaryConstants";
import { uploadImage } from "../../redux/actions/CloudinaryActions";

const UpImageThumbModal = ({ image, imageUrl }) => {
  const dispatch = useDispatch();
  const { isUpImageThumbModal, toggleIsUpImageThumbModal } =
    useContext(AppContext);
  const cloudinaryUpload = useSelector((state) => state.cloudinaryUpload);
  const { loading, error } = cloudinaryUpload;

  const closeModalUpImgHandle = () => {
    if (!loading) {
      toggleIsUpImageThumbModal(false);
    }
    if (error) {
      dispatch({
        type: CLOUDINARY_UPLOAD_RESET,
      });
    }
  };

  const debouncedUpdateImage = useMemo(
    () =>
      debounce(() => {
        dispatch(uploadImage(imageUrl));
      }, 200),
    [imageUrl]
  );

  useEffect(() => {
    document.body.style.overflow = isUpImageThumbModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isUpImageThumbModal]);

  return (
    <div
      onClick={() => closeModalUpImgHandle()}
      className={`z-20 ${
        isUpImageThumbModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } duration-300 bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white border border-neutral-300 w-full md:w-1/2 lg:w-1/4 mx-3 md:mx-0 pt-3 pb-5 px-5"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium">Chọn ảnh tải lên</h4>
          <button
            type="button"
            onClick={() => closeModalUpImgHandle()}
            className={`${loading && "opacity-30 pointer-events-none"}`}
          >
            <MdClose className="text-2xl" />
          </button>
        </div>
        <div className="flex justify-center mt-2 border border-dashed border-neutral-300">
          <img
            src={image}
            alt=""
            className="w-full aspect-[2/3] object-contain"
          />
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
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={() => debouncedUpdateImage()}
            className={`lowercase w-full text-sm bg-black text-white py-2 hover:opacity-80 ${
              loading && "bg-opacity-30 pointer-events-none"
            }`}
          >
            {loading ? "Đang tải lên..." : "Tải lên"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpImageThumbModal;
