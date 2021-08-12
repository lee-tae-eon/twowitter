import React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">홈</Link>
      </li>
      <li>
        <Link to="/profile">프로필</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
