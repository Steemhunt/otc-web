import React from "react";
import { useTranslation } from "react-i18next";
import { scrollTop } from "utils/scroller";

const Footer = props => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  return (
    <div className="footer">
      <div
        className="toggle-language"
        onClick={() => {
          scrollTop();
        }}
      >
        <div
          onClick={() => {
            i18n.changeLanguage("en");
          }}
          className={`hover-link ${language === "en" && "primary"}`}
        >
          English
        </div>
        <div style={{ margin: "0 8px" }}>/</div>
        <div
          onClick={() => {
            i18n.changeLanguage("ko");
          }}
          className={`hover-link ${language === "ko" && "primary"}`}
        >
          한국어
        </div>
      </div>

      <div>Copyright © 2019 HUNT. All rights reserved.</div>
    </div>
  );
};

export default Footer;
