import React, { useEffect } from "react";
import logo from "assets/images/logo.svg";
import { scrollTop } from "utils/scroller";
import EscrowInput from "./EscrowInput";
import TokenModal from "./TokenModal";
import OfferList from "./OfferList";
import SearchBar from "./SearchBar";

const Home = props => {
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className="home">
      <div className="padded-container content">
        <div className="search-bar-container">
          <div className="logo-container">
            <img className="logo" src={logo} alt="" />
            <div className="squirrel">다람쥐 OTC</div>
          </div>
          <SearchBar />
        </div>
        <div className="title">토큰 장외거래 리스트</div>
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
