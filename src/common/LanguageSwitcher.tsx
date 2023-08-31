import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDirection } from "../context/DirectionContext";

function LanguageSwitcher() {
  const {
    i18n,
    // t,
  } = useTranslation();
  const { changeLanguage } = useDirection();

  const [isOpen, setIsOpen] = useState(false);

  const handleChangeLanguage = (language: string) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  const flagPath = `/src/assets/${i18n.language}.png`;

  return (
    <div className="fixed top-0 right-0 z-50">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center w-full rounded-md  border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 "
          >
            <img
              src={flagPath}
              alt="flag"
              className="w-5 h-5 rounded-full mr-2"
            />
            <span className="mr-1">{i18n.language}</span>{" "}
          </button>
        </div>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                href="#"
                onClick={() => handleChangeLanguage("en")}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  i18n.language === "en" ? "bg-gray-100" : ""
                }`}
                role="menuitem"
              >
                English
              </a>
              <a
                href="#"
                onClick={() => handleChangeLanguage("fr")}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  i18n.language === "fr" ? "bg-gray-100" : ""
                }`}
                role="menuitem"
              >
                Français
              </a>
              <a
                href="#"
                onClick={() => handleChangeLanguage("ar")}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  i18n.language === "ar" ? "bg-gray-100" : ""
                }`}
                role="menuitem"
              >
                العربية
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSwitcher;
