import React, { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { MdClose } from "react-icons/md";

const PreviewImageModal = ({ linkImagePreview }) => {
  const { isPreviewModal, toggleIsPreviewModal } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = isPreviewModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPreviewModal]);

  return (
    <div
      onClick={() => toggleIsPreviewModal(false)}
      className={`z-20 ${
        isPreviewModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } duration-300 bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-neutral-300 w-full md:w-2/3 lg:w-1/3 mx-3 md:mx-0 relative"
      >
        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-2.5 py-1.5 backdrop-blur-sm bg-white/30">
          <h4 className="text-sm font-medium">Ảnh phóng to</h4>
          <button type="button" onClick={() => toggleIsPreviewModal(false)}>
            <MdClose className="text-xl" />
          </button>
        </div>
        <img
          src={linkImagePreview}
          alt=""
          className="w-full aspect-[2/3] object-contain"
        />
      </div>
    </div>
  );
};

export default PreviewImageModal;
