import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import swapImg from "assets/images/swap.svg";
import numeral from "numeral";
import { Icon, Button } from "antd";
import moment from "moment";
import { motion } from "framer-motion";

const ListItem = props => {
  const [timer, setTimer] = useState("00:00:00");
  const {
    index,
    escrow_url,
    selling_amount,
    buying_amount,
    selling_coin,
    buying_coin,
    status,
    expires_at
  } = props;

  useEffect(() => {
    let tickTime = null;
    function tick() {
      const timeNow = moment().utc();
      const expirationTime = moment(expires_at);
      const diff = expirationTime.diff(timeNow);

      if (diff < 0) {
        clearInterval(tickTime);
        setTimer("종료");
      } else {
        setTimer(moment.duration(diff, "milliseconds").format("hh:mm:ss"));
      }
    }

    tickTime = setInterval(tick, 1000);
    tick();

    return () => tickTime && clearInterval(tickTime);
  }, []);

  let sellingUSD =
    selling_coin.last_price > 0 &&
    numeral(selling_amount * selling_coin.last_price).format("$0,0.0000");

  let buyingUSD =
    buying_coin.last_price > 0 &&
    numeral(buying_amount * buying_coin.last_price).format("$0,0.0000");

  let diff = null;

  if (sellingUSD && buyingUSD) {
    diff = ((sellingUSD - buyingUSD) / sellingUSD) * 100;
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
      className={`list-item ${status !== "waiting" && "completed"}`}
    >
      <div className="gradient-bar">
        <div className="filled" />
      </div>
      <div className="content">
        <div className="left-container">
          <div className="coin-info-container">
            <img className="from-coin" alt="" src={selling_coin.image}/>
            <div className="amount-container">
              <div className="amount">
                {numeral(selling_amount).format("0,0.00")} {selling_coin.symbol}{" "}
                <Icon type="info-circle" />
              </div>
              <div className="usd">({sellingUSD || "미상장"})</div>
            </div>
          </div>

          <img className="swap-img" src={swapImg} alt="" />

          <div className="coin-info-container right">
            <img className="to-coin" alt="" src={buying_coin.image}/>
            <div className="amount-container">
              <div className="amount">
                {numeral(buying_amount).format("0,0.00")} {buying_coin.symbol}{" "}
                <Icon type="info-circle" />
              </div>
              <div className="usd">({buyingUSD || "미상장"})</div>
            </div>
          </div>
        </div>

        <div className="right-container">
          <div className="stat-container">
            <div>
              <div className="text-grey">만료:</div>
              <div className="text-grey">거래차익:</div>
            </div>
            <div className="values">
              <div className="timer">{timer}</div>
              <div
                className={`difference ${diff > 0 && "plus"} ${diff < 0 &&
                  "minus"}`}
              >
                {diff
                  ? `${diff < 0 ? "-" : "+"}${numeral(diff).format("0,0.00%")}`
                  : "-"}
              </div>
            </div>
          </div>
          {status === "waiting" && (
            <a href={escrow_url} target="_blank" rel="noopener noreferrer">
              <Button>거래하기</Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

ListItem.propTypes = {};

ListItem.defaultProps = {};

export default ListItem;
