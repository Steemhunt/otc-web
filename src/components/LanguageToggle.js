import React from "react";
import { useTranslation } from "react-i18next";
import { scrollTop } from "utils/scroller";

const LanguageToggle = props => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  return (
    <div
      className="toggle-language"
      onClick={() => {
        scrollTop();
      }}
    >
      <span
        onClick={() => {
          i18n.changeLanguage("en");
        }}
        className={`hover-link ${language === "en" && "primary"}`}
      >
        English
      </span>
      <span style={{ margin: "0 0.5rem" }}>/</span>
      <span
        onClick={() => {
          i18n.changeLanguage("ko");
        }}
        className={`hover-link ${language === "ko" && "primary"}`}
      >
        한국어
      </span>
    </div>
  );
};

export default LanguageToggle;