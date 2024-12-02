import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isSmallModal, setIsSmallModal] = useState("");
  const [isUpImageThumbModal, setIsUpImageThumbModal] = useState(false);
  const [isUpImageModal, setIsUpImageModal] = useState(false);

  const toggleIsDeleteModal = (bol) => setIsDeleteModal(bol);
  const toggleIsSmallModal = (text) => setIsSmallModal(text);
  const toggleIsUpImageThumbModal = (bol) => setIsUpImageThumbModal(bol);
  const toggleIsUpImageModal = (bol) => setIsUpImageModal(bol);

  useEffect(() => {
    if (isSmallModal) {
      let timeoutId;
      timeoutId = setTimeout(() => {
        toggleIsSmallModal("");
      }, 4000);
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [isSmallModal]);

  return (
    <AppContext.Provider
      value={{
        isDeleteModal,
        toggleIsDeleteModal,
        isSmallModal,
        toggleIsSmallModal,
        isUpImageThumbModal,
        toggleIsUpImageThumbModal,
        isUpImageModal,
        toggleIsUpImageModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
