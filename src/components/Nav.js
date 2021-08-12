import { authServ } from "Fbase";
import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ isLoggedIn }) => {
  const onLogOutClick = () => {
    authServ.signOut();
    window.location.replace("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/profile">프로필</Link>
        </li>
        <li>
          {isLoggedIn && <button onClick={onLogOutClick}>로그아웃</button>}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
