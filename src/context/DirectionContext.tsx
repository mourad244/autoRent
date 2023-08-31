import React, { createContext, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

type DirectionContextProps = {
  isRTL: boolean;
  changeLanguage: (language: string) => void;
};
type DirectionProviderProps = {
  children: React.ReactNode;
};

const DirectionContext = createContext<DirectionContextProps | undefined>(
  undefined
);

export const useDirection = () => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
};

export const DirectionProvider: React.FC<DirectionProviderProps> = ({
  children,
}) => {
  const [isRTL, setIsRTL] = useState<boolean>(false);
  const {
    i18n,
    // t,
  } = useTranslation();
  useEffect(() => {
    document.body.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  const changeLanguage = (language: string) => {
    setIsRTL(language === "ar");
    i18n.changeLanguage(language);
  };

  return (
    <DirectionContext.Provider value={{ isRTL, changeLanguage }}>
      {children}
    </DirectionContext.Provider>
  );
};
