import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const toggleIsDeleteModal = (bol) => setIsDeleteModal(bol);

  return (
    <AppContext.Provider
      value={{
        isDeleteModal,
        toggleIsDeleteModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
