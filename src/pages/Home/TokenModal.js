import React, { useContext } from "react";
import PropTypes from "prop-types";
import HomeContext from "contexts/HomeContext";
import AppContext from "contexts/AppContext";
import { Modal, Icon } from "antd";
import numeral from "numeral";
import _ from "lodash";

const textMap = {
  website: "웹사이트",
  whitepaper_ko: "백서 (한글)",
  whitepaper_en: "백서 (영문)",
  github: "깃헙",
  app_1: "앱1",
  app_2: "앱2",
  telegram: "텔레그램",
  kakaotalk: "카카오톡",
  discord: "디스코드",
  twitter: "트위터",
  steemit: "스팀잇",
  reddit: "레딧"
};

const ModalBody = props => {
  const { language } = useContext(AppContext);
  const { data } = props;
  if (!data) return null;
  let {
    image,
    symbol,
    price_change_24h,
    last_price,
    name,
    description,
    total_supply,
    urls
  } = data;

  let urlKeys = [],
    urlData = [];

  const priceChangePercentage =
    price_change_24h / (last_price - price_change_24h);

  console.log("price", priceChangePercentage);

  Object.entries(urls).forEach(data => {
    const [key, url] = data;
    if (key && url) {
      urlKeys.push(key);
      urlData.push(url);
    }
  });

  let noData = _.isEmpty(urls) && _.isEmpty(description);

  console.log(data);
  return (
    <div className="token-modal-body">
      <div className="modal-title">
        <img
          className="modal-img"
          src={`${process.env.PUBLIC_URL}/coins/${_.lowerCase(symbol)}.png`}
          alt=""
        />
        <div>
          {symbol} {name[language]}
        </div>
      </div>

      <div className="price-change-container">
        <div className="last-price">
          ${last_price} <span className="usd">USD </span>
        </div>
        <div
          className={`price-change ${priceChangePercentage > 0 &&
            "plus"} ${priceChangePercentage < 0 && "minus"} `}
        >
          {!Number.isNaN(priceChangePercentage) && (
            <Icon
              type={priceChangePercentage > 0 ? "caret-up" : "caret-down"}
            />
          )}
          {price_change_24h}
          <span className="price-change-percentage">
            ({numeral(priceChangePercentage).format("0,0.00%")})
          </span>
        </div>
        <div className="total-supply">
          Total Supply: {numeral(total_supply).format("0,0")} {symbol}
        </div>
      </div>

      {description[language] && (
        <div className="description">{description[language]}</div>
      )}

      {urlKeys.length > 0 && (
        <div className="urls-container">
          <div className="keys">
            {urlKeys.map((key, index) => (
              <div key={index}>
                {textMap[key] ? textMap[key] : _.camelCase(key)}
              </div>
            ))}
          </div>
          <div className="ellipsis">
            {urlData.map((url, index) => (
              <div key={index} className="url ellipsis">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {noData && (
        <div className="no-data">
          데이터가 존재하지않습니다. 만약 데이터 추가를 원하시면{" "}
          <a
            href="mailto:admin@hunt.town"
            target="_blank"
            rel="noopener noreferrer"
          >
            admin@hunt.town
          </a>{" "}
          으로 요청해주시기 바랍니다.
        </div>
      )}
    </div>
  );
};

const TokenModal = props => {
  const { tokenInformation, updateState } = useContext(HomeContext);
  return (
    <Modal
      visible={tokenInformation !== null}
      onCancel={() => updateState({ tokenInformation: null })}
      wrapClassName="token-modal"
      footer={null}
      closable={true}
      maskClosable={true}
    >
      <div>
        <ModalBody data={tokenInformation} />
      </div>
    </Modal>
  );
};

TokenModal.propTypes = {};

TokenModal.defaultProps = {};

export default TokenModal;
