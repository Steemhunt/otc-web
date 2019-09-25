import React, { useEffect, useContext } from "react";
import HomeContext from "contexts/HomeContext";
import { Icon } from "antd";
import ListItem from "./ListItem";
import _ from 'lodash';

const OfferList = props => {
  const { query, offers, loading, fetchOffers, updateState } = useContext(
    HomeContext
  );

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return (
    <div className="list">
      {loading ? (
        <Icon className="loading" type="loading" />
      ) : (
        offers
          .filter(item => {
            if (query.length === 0) return true;
            const { buying_coin, selling_coin } = item;

            return (
              _.lowerCase(buying_coin.symbol).includes(_.lowerCase(query)) ||
              _.lowerCase(selling_coin.symbol).includes(_.lowerCase(query))
            );
          })
          .map((offer, index) => (
            <ListItem
              key={index}
              index={index}
              onTokenClick={tokenInformation =>
                updateState({ tokenInformation })
              }
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
