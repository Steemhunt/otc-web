import React, { useState, useContext } from "react";
import HomeContext from "contexts/HomeContext";
import { Button, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;

const SelectBefore = props => (
  <Select
    className={props.className}
    value={props.t("bitberry")}
    style={{ width: 90 }}
  >
    <Option value={props.t("bitberry")}>{props.t("bitberry")}</Option>
  </Select>
);

const EscrowInput = props => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const { postOffer } = useContext(HomeContext);

  return (
    <div className="escrow-input">
      <div className="hide-on-mobile input-url">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          addonBefore={<SelectBefore t={t} />}
          placeholder={t("enter_escrow_url")}
          addonAfter={
            <div
              className="add-button"
              onClick={() => {
                if (input.length > 0) postOffer(input, () => setInput(""));
              }}
            >
              {t("add_trade")}
            </div>
          }
        />
      </div>

      <div className="show-on-mobile">
        <SelectBefore t={t} />
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t("enter_escrow_url")}
        />
        <div className="button-container">
          <Button
            type="primary"
            onClick={() => {
              if (input.length > 0) postOffer(input, () => setInput(""));
            }}
          >
            {t("add_trade")}
          </Button>
        </div>
      </div>
    </div>
  );
};

EscrowInput.propTypes = {};

EscrowInput.defaultProps = {};

export default EscrowInput;
