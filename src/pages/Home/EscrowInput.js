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

  const onChange = e => {
    let str = e.target.value;
    let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    let match = str.match(regex);
    let finalString = match && match.length > 0 && match[0];
    if (finalString) {
      setInput(finalString);
    } else {
      setInput(str);
    }
  };

  return (
    <form
      className="escrow-input"
      onSubmit={e => {
        e.preventDefault();
        if (input.length > 0) {
          postOffer(input, () => setInput(""));
        }
      }}
    >
      <div className="hide-on-mobile input-url">
        <Input
          value={input}
          onChange={onChange}
          addonBefore={<SelectBefore t={t} />}
          placeholder={t("enter_escrow_url")}
          addonAfter={<div className="add-button">{t("add_trade")}</div>}
        />
      </div>

      <div className="show-on-mobile">
        <SelectBefore t={t} />
        <Input
          value={input}
          onChange={onChange}
          placeholder={t("enter_escrow_url")}
        />
        <div className="button-container">
          <Button type="primary">{t("add_trade")}</Button>
        </div>
      </div>
      <input type="submit" style={{ display: "none" }} />
    </form>
  );
};

EscrowInput.propTypes = {};

EscrowInput.defaultProps = {};

export default EscrowInput;
