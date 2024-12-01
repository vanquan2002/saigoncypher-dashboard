import axios from "axios";
import {
  CLOUDINARY_UPLOAD_REQUEST,
  CLOUDINARY_UPLOAD_SUCCESS,
  CLOUDINARY_UPLOAD_FAIL,
} from "../constants/CloudinaryConstants";

const preset_key = "hu9yg0hm";
const cloud_name = "dfavmxigs";

export const uploadImage = (url) => async (dispatch) => {
  try {
    dispatch({
      type: CLOUDINARY_UPLOAD_REQUEST,
    });

    const formData = new FormData();
    formData.append("file", url);
    formData.append("upload_preset", preset_key);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );

    dispatch({
      type: CLOUDINARY_UPLOAD_SUCCESS,
      payload: response.data.url,
    });
  } catch (error) {
    dispatch({
      type: CLOUDINARY_UPLOAD_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};
