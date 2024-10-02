import React, { useEffect, useRef } from "react";

export default function CloudinaryUploadWidget({ onUploadSuccess }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dfavmxigs",
        uploadPreset: "o0zgtyln",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.url;
          onUploadSuccess(imageUrl);
        }
      }
    );
  }, []);

  const handleUploadButtonClick = () => {
    widgetRef.current.open();
  };

  return (
    <div>
      <button onClick={handleUploadButtonClick}>Upload</button>
    </div>
  );
}
