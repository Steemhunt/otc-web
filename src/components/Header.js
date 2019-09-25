import React from "react";
import { Link, withRouter } from "react-router-dom";
import logoGrey from "assets/images/logo-grey.svg";

const Header = props => {
  return (
    <div className={`header`}>
      <Link to="/">
        <img src={logoGrey} alt="" />
      </Link>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default withRouter(Header);
