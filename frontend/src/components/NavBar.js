import React from "react";
import { Link, useLocation } from "react-router-dom";

function UserMenuItems({ email, signOut }) {
  return (
    <>
      <li>
        <p className="menu__title">{email}</p>
      </li>
      <li>
        <button className="menu__link menu__link_out" onClick={signOut}>
          Выйти
        </button>
      </li>
    </>
  );
}

function GuestMenuItems({ currentPath }) {
  return (
    <>
      {currentPath === "/signin" && (
        <li>
          <Link to="/signup" className="menu__link">
            Регистрация
          </Link>
        </li>
      )}
      {currentPath === "/signup" && (
        <li>
          <Link to="/signin" className="menu__link">
            Войти
          </Link>
        </li>
      )}
    </>
  );
}

export default function NavBar({ loggedIn, userData, signOut, menuVisible }) {
  const { pathname } = useLocation();
  const menuClasses = [
    'menu',
    !loggedIn && 'menu__signin',
    !menuVisible && 'menu__active',
  ].filter(Boolean).join(' ');

  return (
    <nav className={menuClasses}>
      <ul className="menu__items list">
        {loggedIn ? (
          <UserMenuItems email={userData.email} signOut={signOut} />
        ) : (
          <GuestMenuItems currentPath={pathname} />
        )}
      </ul>
    </nav>
  );
}
