import React, { useEffect } from "react";
import { scrollTop } from "utils/scroller";
import EscrowInput from "./EscrowInput";
import TokenModal from "./TokenModal";
import OfferList from "./OfferList";
import SearchBar from "./SearchBar";
import LanguageToggle from "components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { Icon } from "antd";
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
          <LanguageToggle />
          <SearchBar />
        </div>
        <div className="title">{t("app_description")}</div>
        <EscrowInput />
        <div className="links">
          <a href={t("how_to_bitberry_url")} target="_blank" rel="noopener noreferrer">
            {t("how_to_bitberry")} <Icon type="question-circle" />
          </a>
        </div>
        <OfferList />
      </div>
      <TokenModal />
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
