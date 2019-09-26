import React, { useEffect } from "react";
import logo from "assets/images/logo.svg";
import { scrollTop } from "utils/scroller";
import EscrowInput from "./EscrowInput";
import TokenModal from "./TokenModal";
import OfferList from "./OfferList";
import SearchBar from "./SearchBar";
import { useTranslation } from "react-i18next";

const Home = props => {
  const { t } = useTranslation();
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className="home">
      <div className="padded-container content">
        <div className="search-bar-container">
          <div className="logo-container">
            <img className="logo" src={logo} alt="" />
            <div className="squirrel">{t("app_name")}</div>
          </div>
          <SearchBar />
        </div>
        <div className="title">{t("app_description")}</div>
        <EscrowInput />
        <OfferList />
      </div>
      <TokenModal />
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
