import React, { useEffect } from "react";
import { scrollTop } from "utils/scroller";
import EscrowInput from "./EscrowInput";
import TokenModal from "./TokenModal";
import OfferList from "./OfferList";
import SearchBar from "./SearchBar";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";

const Home = props => {
  const { t } = useTranslation();

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className="home">
      <div className="padded-container content">
        <div className="search-bar-container">
          <Logo />
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
