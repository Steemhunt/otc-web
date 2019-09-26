import React, { useContext } from "react";
import HomeContext from "contexts/HomeContext";
import { Button, Modal, Icon } from "antd";
import numeral from "numeral";
import _ from "lodash";
import { Trans, useTranslation } from "react-i18next";

const ModalBody = props => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const { data } = props;
  if (!data) return null;
  let {
    symbol,
    price_change_24h,
    last_price,
    name,
    description,
    total_supply,
    coingecko_id,
    urls
  } = data;

  let urlKeys = [],
    urlData = [];

  const priceChangePercentage =
    price_change_24h / (last_price - price_change_24h);

  Object.entries(urls).forEach(data => {
    const [key, url] = data;
    if (key && url) {
      urlKeys.push(key);
      urlData.push(url);
    }
  });

  let noData =
    _.values(urls).filter(i => i !== null).length === 0 &&
    _.values(description).filter(i => i !== null).length === 0;
  let unlisted = numeral(last_price).value() === 0;

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
          {unlisted ? (
            t("unlisted")
          ) : (
            <>
              ${last_price} <span className="usd">USD </span>
            </>
          )}
        </div>
        <div
          className={`price-change ${priceChangePercentage > 0 &&
            "plus"} ${priceChangePercentage < 0 && "minus"} `}
        >
          {!Number.isNaN(priceChangePercentage) &&
            priceChangePercentage !== 0 && (
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

      <hr />

      {description[language] && (
        <div className="description">{description[language]}</div>
      )}

      {urlKeys.length > 0 && (
        <div className="urls-container">
          <div className="keys">
            {urlKeys.map((key, index) => (
              <div key={index}>{t(key) || _.camelCase(key)}</div>
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
          <Trans i18nKey="no_data">
            데이터가 존재하지않습니다. 만약 데이터 추가를 원하시면 밑 이메일 주소로 요청해주시기 바랍니다.
          </Trans>
          {" "}
           <a
              href="mailto:admin@hunt.town"
              target="_blank"
              rel="noopener noreferrer"
            >
              admin@hunt.town
            </a>
            .
        </div>
      )}

      {coingecko_id && (
        <a
          href={`https://www.coingecko.com/en/coins/${coingecko_id}/trading_exchanges`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button type="primary" className="exchange-btn">
            {t("exchange_btn")}
          </Button>
        </a>
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
      closeIcon={<Icon type="close"/>}
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
