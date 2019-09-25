import React, { useEffect, useContext } from "react";
import HomeContext from "contexts/HomeContext";
import { Icon } from "antd";
import ListItem from "./ListItem";

const OfferList = props => {
  const { offers, loading, fetchOffers, updateState } = useContext(HomeContext);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return (
    <div className="list">
      {loading ? (
        <Icon className="loading" type="loading" />
      ) : (
        offers.map((offer, index) => (
          <ListItem
            key={index}
            index={index}
            onTokenClick={tokenInformation => updateState({ tokenInformation })}
            {...offer}
          />
        ))
      )}
    </div>
  );
};

OfferList.propTypes = {};

OfferList.defaultProps = {};

export default OfferList;
