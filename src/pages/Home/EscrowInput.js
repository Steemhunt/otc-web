import React, { useState, useContext } from "react";
import HomeContext from "contexts/HomeContext";
import { Input, Select } from "antd";
const { Option } = Select;

const selectBefore = (
  <Select defaultValue="비트베리" style={{ width: 90 }}>
    <Option value="비트베리">비트베리</Option>
  </Select>
);
const EscrowInput = props => {
  const [input, setInput] = useState("");
  const { postOffer } = useContext(HomeContext);
  return (
    <div className="escrow-input">
      <div className="hide-on-mobile input-url">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          addonBefore={selectBefore}
          placeholder="비트베리 ESCROW URL 입력"
          addonAfter={
            <div
              className="add-button"
              onClick={() => {
                if (input.length > 0) postOffer(input, () => setInput(""));
              }}
            >
              거래 추가
            </div>
          }
        />
      </div>

      <div className="show-on-mobile">
        <Select className="mobile-select" defaultValue="비트베리">
          <Option value="비트베리">비트베리</Option>
          <Option disabled value="none">추후에 더 추가될예정입니다.</Option>
        </Select>
        <Input placeholder="비트베리 ESCROW URL 입력" />
      </div>
    </div>
  );
};

EscrowInput.propTypes = {};

EscrowInput.defaultProps = {};

export default EscrowInput;
