import React, { useContext } from "react";
import HomeContext from "contexts/HomeContext";
import { Input } from "antd";
const { Search } = Input;

const SearchBar = props => {
  const { query, updateState } = useContext(HomeContext);
  return (
    <div className="search-bar">
      <Search
        placeholder="코인 검색"
        value={query}
        onChange={e => updateState({ query: e.target.value })}
      />
    </div>
  );
};

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default SearchBar;
