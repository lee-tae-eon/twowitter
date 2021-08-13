import { authServ } from "Fbase";
import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ isLoggedIn, userObj }) => {
  // const redirectHome = useHistory();
  const onLogOutClick = () => {
    authServ.signOut();
    // redirectHome.push("/");
    window.location.reload();
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}의 프로필</Link>
        </li>
        <li>
          {isLoggedIn && <button onClick={onLogOutClick}>로그아웃</button>}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
