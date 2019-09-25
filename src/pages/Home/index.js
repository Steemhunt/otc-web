import React, { useEffect, useContext } from "react";
import HomeContext from "contexts/HomeContext";
import logo from "assets/images/logo.svg";
import { scrollTop } from "utils/scroller";
import { Icon } from "antd";
import ListItem from "./ListItem";
import EscrowInput from "./EscrowInput";

const Home = props => {
  const { offers, loading, fetchOffers } = useContext(HomeContext);

  useEffect(() => {
    fetchOffers();
    scrollTop();
  }, [fetchOffers]);

  return (
    <div className="home">
      <div className="padded-container content">
        <img className="logo" src={logo} alt="" />
        <div className="title">토큰 장외거래 리스트</div>
        <EscrowInput />

        <div className="list">
          {loading ? (
            <Icon className="loading" type="loading" />
          ) : (
            offers.map((offer, index) => (
              <ListItem key={index} index={index} {...offer} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
