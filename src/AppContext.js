import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isPageId, setIsPageId] = useState("home");

  const toggleIsPageId = (text) => setIsPageId(text);

  return (
    <AppContext.Provider
      value={{
        isPageId,
        toggleIsPageId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
