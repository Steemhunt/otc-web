import React, { useContext } from "react";
import HomeContext from "contexts/HomeContext";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
const { Search } = Input;

const SearchBar = props => {
  const { t } = useTranslation();
  const { query, updateState } = useContext(HomeContext);
  return (
    <div className="search-bar">
      <Search
        placeholder={t("search_coin")}
        value={query}
        onChange={e => updateState({ query: e.target.value })}
      />
    </div>
  );
};

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default SearchBar;
