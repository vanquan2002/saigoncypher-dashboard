import {
  CLOUDINARY_UPLOAD_FAIL,
  CLOUDINARY_UPLOAD_REQUEST,
  CLOUDINARY_UPLOAD_SUCCESS,
  CLOUDINARY_UPLOAD_RESET,
} from "./../constants/CloudinaryConstants";

export const cloudinaryUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case CLOUDINARY_UPLOAD_REQUEST:
      return { loading: true };
    case CLOUDINARY_UPLOAD_SUCCESS:
      return { loading: false, linkImage: action.payload };
    case CLOUDINARY_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    case CLOUDINARY_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};
