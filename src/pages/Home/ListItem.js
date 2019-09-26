import React, { useState, useEffect } from "react";
import swapImg from "assets/images/swap.svg";
import numeral from "numeral";
import { Icon, Button } from "antd";
import moment from "moment";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import _ from "lodash";

const ListItem = props => {
  const { t } = useTranslation();
  const [timer, setTimer] = useState("00:00:00");
  const {
    index,
    escrow_url,
    selling_amount,
    buying_amount,
    selling_coin,
    buying_coin,
    status,
    expires_at,
    onTokenClick
  } = props;

  useEffect(() => {
    let tickTime = null;
    function tick() {
      const timeNow = moment().utc();
      const expirationTime = moment(expires_at);
      const diff = expirationTime.diff(timeNow);

      if (diff < 0 || status !== "waiting") {
        clearInterval(tickTime);
        setTimer(-1);
      } else {
        setTimer(
          moment
            .duration(diff, "milliseconds")
            .locale("ko")
            .format("hh:mm:ss")
        );
      }
    }

    tickTime = setInterval(tick, 1000);
    tick();

    return () => tickTime && clearInterval(tickTime);
  }, []); //eslint-disable-line

  let sellingUSD =
    selling_coin.last_price > 0 && selling_amount * selling_coin.last_price;

  let buyingUSD =
    buying_coin.last_price > 0 && buying_amount * buying_coin.last_price;

  let diff = null;
  let diffPercentage = null;

  if (sellingUSD && buyingUSD) {
    diff = sellingUSD - buyingUSD;
    diffPercentage = (sellingUSD - buyingUSD) / sellingUSD;
  }

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ ease: "easeIn", duration: 0.2, delay: 0.1 * index }}
      className={`list-item ${(status !== "waiting" || timer === -1) &&
        "completed"}`}
    >
      <div className={`gradient-bar ${status !== "waiting" && "completed"}`}>
        {/*<div className="filled" />*/}
      </div>
      <div className="content">
        <div className="left-container">
          <div className="coin-info-container">
            <img
              className="from-coin"
              alt=""
              src={`${process.env.PUBLIC_URL}/coins/${_.lowerCase(
                selling_coin.symbol
              )}.png`}
            />
            <div className="amount-container">
              <div className="amount">
                {numeral(selling_amount).format("0,0.00")} {selling_coin.symbol}{" "}
                <Icon
                  type="info-circle"
                  onClick={() => onTokenClick(selling_coin)}
                />
              </div>
              <div className="usd">
                ({sellingUSD ? numeral(sellingUSD).format("$0,0.00") : "비상장"}
                )
              </div>
            </div>
          </div>

          <img className="swap-img" src={swapImg} alt="" />

          <div className="coin-info-container right">
            <img
              className="to-coin"
              alt=""
              src={`${process.env.PUBLIC_URL}/coins/${_.lowerCase(
                buying_coin.symbol
              )}.png`}
            />
            <div className="amount-container">
              <div className="amount">
                {numeral(buying_amount).format("0,0.00")} {buying_coin.symbol}{" "}
                <Icon
                  type="info-circle"
                  onClick={() => onTokenClick(buying_coin)}
                />
              </div>
              <div className="usd">
                (
                {buyingUSD
                  ? numeral(buyingUSD).format("$0,0.00")
                  : t("unlisted")}
                )
              </div>
            </div>
          </div>
        </div>

        <div className="right-container">
          <div className="stat-container">
            <div>
              <div className="text-grey side-header">{t("expires_at")}</div>
              <div className="text-grey side-header">{t("margin")}</div>
            </div>
            <div className="values">
              <div className="timer">
                {timer === -1 ? t("status_ended") : timer}
              </div>
              <div
                className={`difference ${diff > 0 && "plus"} ${diff < 0 &&
                  "minus"}`}
              >
                {diff ? (
                  <>
                    {diff > 0 && "+"}
                    {numeral(diff).format("$0,0.00")}
                    <span>
                      ({diffPercentage > 0 && "+"}
                      {numeral(diffPercentage).format("0,0.00%")})
                    </span>
                  </>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>
          {status === "waiting" && timer !== -1 && (
            <a href={escrow_url} target="_blank" rel="noopener noreferrer">
              <Button>
                <Trans i18nKey="purchase_coin">
                  Purchase {{ coin: selling_coin.symbol }}
                </Trans>
              </Button>
            </a>
          )}
          {status === "completed" && (
            <div className="status-text">{t("status_completed")}</div>
          )}

          {status === "canceled" && (
            <div className="status-text">{t("status_cancelled")}</div>
          )}
          {(status === "expired" || (status === "waiting" && timer === -1)) && (
            <div className="status-text">{t("status_expired")}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

ListItem.propTypes = {};

ListItem.defaultProps = {};

export default ListItem;
