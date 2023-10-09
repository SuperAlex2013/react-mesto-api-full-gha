import React, { useState } from "react";
import logoImage from "../images/logo.svg";
import burgerMenuOpenImage from "../images/burger_menu.svg";
import burgerMenuCloseImage from "../images/burger_close.svg";
import NavBar from "./NavBar";

export default function Header({ loggedIn, userData, signOut }) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const headerClassName = `header page__header ${!loggedIn ? "header__mobile" : ""}`;

  return (
    <header className={headerClassName}>
      <div className="header__wrap">
        <img className="header__logo" src={logoImage} alt="логотип Mesto" />
        {loggedIn && (
          <img
            onClick={toggleMenu}
            className="header__btn"
            src={isMenuVisible ? burgerMenuOpenImage : burgerMenuCloseImage}
            alt="меню"
          />
        )}
      </div>
      <NavBar
        menuVisible={isMenuVisible}
        signOut={signOut}
        loggedIn={loggedIn}
        userData={userData}
      />
    </header>
  );
}
