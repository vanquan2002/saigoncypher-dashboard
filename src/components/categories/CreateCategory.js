import React from "react";

const CreateCategory = () => {
  return (
    <form className="border-2 border-indigo-600 m-2 p-2">
      <p>Name</p>
      <input
        className="border-2 border-indigo-600 m-2 p-2"
        type="text"
        placeholder="Type here"
      />
      <p>Image</p>
      <input className="border-2 border-indigo-600 m-2 p-2" type="file" />
      <p>Description</p>
      <input
        className="border-2 border-indigo-600 m-2 p-2"
        type="text"
        placeholder="Type here"
      />
      <button type="submit">Create Category</button>
    </form>
  );
};

export default CreateCategory;
