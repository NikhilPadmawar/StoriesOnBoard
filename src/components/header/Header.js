import React from "react";
import classNames from "classnames";
import "./Header.scss";

const Header = () => {
  return (
    <div>
      <header className={classNames("header")}>
        <div className={classNames("logo")}>TW Story Board</div>
        <div className={classNames("profile")}>Profile</div>
      </header>
    </div>
  );
};

export default Header;
