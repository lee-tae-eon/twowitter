import { authServ } from "Fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const redirectHome = useHistory();
  const onLogOutCLick = () => {
    authServ.signOut();
    redirectHome.push("/");
  };
  return (
    <>
      <button onClick={onLogOutCLick}>로그아웃</button>
    </>
  );
};

export default Profile;
