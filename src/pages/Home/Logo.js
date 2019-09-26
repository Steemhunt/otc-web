import React from "react";
import logo from "assets/images/logo.svg";
import { useTranslation } from "react-i18next";
const Logo = props => {
  const { t } = useTranslation();
  return (
    <a href="/">
      <div className="logo-container">
        <img className="logo" src={logo} alt="" />
        <div className="squirrel" key={t("drg_otc")}>
          {t("drg_otc")}
        </div>
      </div>
    </a>
  );
};

Logo.propTypes = {};

Logo.defaultProps = {};

export default Logo;
